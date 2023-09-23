/*
 * Copyright (c) 2022 Megh Computing, Inc.
 *
 * All rights reserved. No warranty, explicit or implied, provided.
 * Unauthorized use, modification, or distribution is strictly prohibited.
 */

import { getVideoCodec, stsd } from "@isomp4/box-moov";
import { MP4Parser } from "@isomp4/parser";
import { AbstractEventDispatcher } from "@megh-computing/event-dispatcher";
import { ImageFramePool } from "@megh-computing/image-frame-pool";
import { time } from "@megh-computing/monotonic-clock";

function createVideoElement() {
  console.debug("createVideoElement");
  const videoElement = document.createElement("video");
  console.debug(videoElement);
  // Muting allows the video element to autoplay without user interaction
  videoElement.defaultMuted = true;
  videoElement.muted = true;
  return videoElement;
}
/**
 * Decodes an incoming video stream in fragmented MP4 format.
 * @see https://www.w3.org/TR/mse-byte-stream-format-isobmff/
 */
export class MP4Decoder extends AbstractEventDispatcher {
  /**
   * Creates a new video decoder for fragmented MP4 streams.
   */
  constructor() {
    super("frame", "error");
    console.debug("called constructor");
    // Initialize constant fields
    this.videoFramePool = new ImageFramePool(60);
    this.buffers = [];
    this.videoElement = createVideoElement();
    this.mediaSource = new MediaSource();
    // Set defaults
    this.fastForwardThreshold = MP4Decoder.DEFAULT_FAST_FORWARD_THRESHOLD;
    this.seekThreshold = MP4Decoder.DEFAULT_SEEK_THRESHOLD;
    this.pruneThreshold = MP4Decoder.DEFAULT_PRUNE_THRESHOLD;
    this.pruneTimeSpan = MP4Decoder.DEFAULT_PRUNE_TIME_SPAN;
    // Connect MediaSource...
    // Older browsers may not support srcObject with MediaSource
    console.debug("after constructor");
    let videoURL;
    try {
      this.videoElement.srcObject = this.mediaSource;
      // console.debug(this.videoElement, 'videoelement')
      videoURL = null;
    } catch (err) {
      if (err.name != "TypeError") {
        throw err;
      }
      videoURL = URL.createObjectURL(this.mediaSource);
      console.debug(videoURL, "catch");
      this.videoElement.src = videoURL;
    }
    this.videoURL = videoURL;
    // Define media source callbacks
    const sourceopen = () => {
      console.debug("source open");
      removeEvents();
      // Check to see if codec has been detected
      if (this.codecs != null && typeof this.codecs === "string") {
        this.createSourceBuffer(this.codecs);
        this.codecs = null;
      }
    };
    const sourceended = () => {
      removeEvents();
      this.dispatch("error", "preend");
    };
    const sourceclose = () => {
      removeEvents();
      this.dispatch("error", "preclose");
    };
    const removeEvents = () => {
      this.mediaSource.removeEventListener("sourceopen", sourceopen);
      this.mediaSource.removeEventListener("sourceended", sourceended);
      this.mediaSource.removeEventListener("sourceclose", sourceclose);
    };
    this.mediaSource.addEventListener("sourceopen", sourceopen);
    this.mediaSource.addEventListener("sourceended", sourceended);
    this.mediaSource.addEventListener("sourceclose", sourceclose);
    // Extract video codecs from fragmented MP4 stream
    const mp4Parser = new MP4Parser();
    mp4Parser.registerBox(stsd, true);
    mp4Parser.boxEnded = (header, box) => {
      console.debug(box, "inside mp4 box if");
      if (box != null && box.type === "stsd") {
        const videoCodec = getVideoCodec(box);
        // TODO add audio codec support?
        if (this.mediaSource.readyState === "open") {
          // Media source is already open, immediately create source buffer
          this.createSourceBuffer(videoCodec);
          this.codecs = null;
        } else {
          // Wait for sourceopen event on media source
          this.codecs = videoCodec;
        }
        // this.dispatch("error", "codecs", "no video codec found");
      }
    };
    this.codecs = mp4Parser;
    // console.debug(this.codecs, 'codecs')
    let seekKey = null;
    let startSeekTime;
    let lastSeekTime = 0;
    this.videoElement.addEventListener("play", () => {
      // This fires initially (due to explicit play call) and whenever the tab regains focus
      console.debug("play");
      seekKey = this.trySeekLive(seekKey, (_) => true);
    });
    this.videoElement.addEventListener("progress", () => {
      // The video might not always autostart at the beginning of the stream
      // This is a fail-safe check to ensure the video starts playing by
      // seeking to live as soon as any data is buffered
      if (!this.videoElement.paused) {
        seekKey = this.trySeekLive(seekKey, (delta) => {
          if (delta > this.seekThreshold + lastSeekTime) {
            return true;
          }
          // Not going to seek to live, however...
          if (delta > this.fastForwardThreshold) {
            this.videoElement.playbackRate = 2.0;
          }
          return false;
        });
      }
    });
    this.videoElement.addEventListener("seeking", () => {
      startSeekTime = time();
    });
    this.videoElement.addEventListener("seeked", () => {
      if (startSeekTime != null) {
        lastSeekTime = (time() - startSeekTime) / 1000;
        startSeekTime = undefined;
        // After a seek operation, we might not be fully live,
        // so adjust the playback rate to catch the rest of the way up
        this.videoElement.playbackRate = 2.0;
      }
    });
    this.videoElement.addEventListener("waiting", () => {
      // This usually indicates that we're bumping up against LIVE,
      // so ensure we're not playing back video too fast...
      this.videoElement.playbackRate = 1.0;
    });
    this.videoElement.addEventListener("error", (err) => {
      if (this.videoURL !== undefined) {
        console.error("video playback error:", err);
      }
    });
    // Attach video callback
    let request;
    if (typeof this.videoElement.requestVideoFrameCallback === "function") {
      const rvfc = this.videoElement.requestVideoFrameCallback.bind(this.videoElement);
      // console.debug(rvfc, 'rvfc')
      const callback = (metadata) => {
        // console.debug('indide callback', metadata)
        // if (width > 0 && height > 0) {
        //   this.onNewFrame(width, height, mediaTime);
        // }
        this.onNewFrame(metadata.width, metadata.height, metadata.mediaTime);
        request();
      };
      request = () => {
        console.debug("request if");
        const metadata = {
          width: this.videoElement.videoWidth,
          height: this.videoElement.videoHeight,
          mediaTime: this.videoElement.currentTime,
        };
        const handle = rvfc(callback(metadata));
        console.debug(handle);
        this.cancel = () => {
          console.debug("indide cancel");
          this.videoElement.cancelVideoFrameCallback(handle);
        };
      };
    } else {
      console.warn("Browser does not support HTMLVideoElement#requestVideoFrameCallback API.");
      console.warn(
        "Using window.requestAnimationFrame fallback; may result in less accurate metadata synchronization."
      );
      let lastMediaTime;
      const callback = () => {
        const width = this.videoElement.videoWidth;
        const height = this.videoElement.videoHeight;
        const mediaTime = this.videoElement.currentTime;
        if (lastMediaTime == null || mediaTime > lastMediaTime) {
          lastMediaTime = mediaTime;
          if (width > 0 && height > 0) {
            this.onNewFrame(width, height, mediaTime);
          }
        }
        request();
      };
      request = () => {
        console.debug("request else");
        const handle = window.requestAnimationFrame(callback);
        this.cancel = () => {
          window.cancelAnimationFrame(handle);
        };
      };
    }
    request();
    // Start playing the video
    this.videoElement.play().then(
      () => {
        console.debug("Video has started playing!");
      },
      (reason) => {
        if (reason instanceof DOMException) {
          switch (reason.name) {
            case "AbortError":
              // This may just be because the user tabbed away.
              // If the user tabs back, the video will still play.
              break;
            default:
              console.error(reason.name, reason);
              break;
          }
        } else {
          console.error(reason);
        }
      }
    );
  }
  /**
   * Attempts to seek the video to live.
   * @param previousKey A previous seeking key.
   * @param condition
   * @return A new seeking key, this should be passed to any future calls to this method.
   */
  trySeekLive(previousKey, condition) {
    const buffered = this.videoElement.buffered;
    if (buffered.length > 0) {
      const last = buffered.length - 1;
      // Use the "start" value of the last range as a key to detect when
      // to override an active seeking operation.
      const currentKey = buffered.start(last);
      if (!this.videoElement.seeking || currentKey !== previousKey) {
        const latestTime = buffered.end(last);
        if (condition(latestTime - this.videoElement.currentTime)) {
          this.videoElement.currentTime = latestTime;
        }
      }
      return currentKey;
    }
    return null;
  }
  /**
   * Sets the threshold (in seconds, from live) before the video starts "fast forwarding" at 2x speed to smoothly reacquire live.
   * The threshold cannot be set lower than {@link MP4Decoder.MIN_FAST_FORWARD_THRESHOLD}.
   * @param fastForwardThreshold The fast forward threshold (in seconds, from live).
   */
  setFastForwardThreshold(fastForwardThreshold) {
    this.fastForwardThreshold = Math.max(MP4Decoder.MIN_FAST_FORWARD_THRESHOLD, fastForwardThreshold);
  }
  /**
   * Sets the threshold (in seconds, from live) before the video seeks (jumps) directly to live.
   * The threshold cannot be set lower than {@link MP4Decoder.MIN_SEEK_THRESHOLD}.
   * @param seekThreshold The seek threshold (in seconds, from live).
   */
  setSeekThreshold(seekThreshold) {
    this.seekThreshold = Math.max(MP4Decoder.MIN_SEEK_THRESHOLD, seekThreshold);
  }
  /**
   * Sets the threshold (in seconds, from live) before the decoder will start discarding old media data.
   * The threshold cannot be set lower than {@link MP4Decoder.MIN_PRUNE_THRESHOLD}.
   *
   * Decreasing this threshold can save memory by discarding media data sooner after it's decoded
   * but may cause issues with cameras that have large GOPs (high P-frame count) configured.
   *
   * @param pruneThreshold The prune threshold (in seconds, from live).
   */
  setPruneThreshold(pruneThreshold) {
    this.pruneThreshold = Math.max(MP4Decoder.MIN_PRUNE_THRESHOLD, pruneThreshold);
  }
  /**
   * Sets the minimum time span of old media data that will be pruned.
   * The time span cannot be set lower than {@link MP4Decoder.MIN_PRUNE_TIME_SPAN}.
   *
   * This is to avoid rapid discarding of small amounts of old media data.
   * Instead, old media data will only be pruned if there is at least this amount of it.
   *
   * @param pruneTimeSpan The minimum time span of old media data that will be pruned.
   */
  setPruneTimeSpan(pruneTimeSpan) {
    this.pruneTimeSpan = Math.max(MP4Decoder.MIN_PRUNE_TIME_SPAN, pruneTimeSpan);
  }
  /**
   * Append new data to the decoder.
   * @param data Input data to the decoder. This does not need to be complete segments.
   */
  append(data) {
    console.debug("append");
    let buf;
    if (data instanceof ArrayBuffer) {
      buf = new Uint8Array(data);
    } else {
      buf = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    }
    if (this.codecs != null && typeof this.codecs !== "string") {
      this.codecs.append(buf);
    } else if (this.buffers.length <= 0) {
      const sourceBuffer = this.videoSourceBuffer;
      if (
        sourceBuffer != null &&
        !sourceBuffer.updating &&
        !this.pruneSourceBuffer(sourceBuffer) &&
        this.appendSourceBuffer(sourceBuffer, buf)
      ) {
        return;
      }
    }
    this.buffers.unshift(buf);
  }
  createSourceBuffer(codecs) {
    // console.debug("createSourceBuffer")
    const videoType = 'video/mp4; codecs="' + codecs + '"';
    if (MediaSource.isTypeSupported(videoType)) {
      const newSourceBuffer = this.mediaSource.addSourceBuffer(videoType);
      const pull = () => {
        if (!newSourceBuffer.updating && !this.pruneSourceBuffer(newSourceBuffer)) {
          const len = this.buffers.length;
          if (len > 0 && this.appendSourceBuffer(newSourceBuffer, this.buffers[len - 1])) {
            this.buffers.pop();
          }
        }
      };
      newSourceBuffer.addEventListener("updateend", pull);
      newSourceBuffer.addEventListener("error", (evt) => {
        console.error("Source buffer error", evt, this.videoElement.error);
      });
      this.videoSourceBuffer = newSourceBuffer;
      // Trigger decoding by appending initial buffer
      if (this.buffers.length > 0) {
        pull();
      }
    } else {
      this.dispatch("error", "codecs");
    }
  }
  appendSourceBuffer(sourceBuffer, data) {
    console.debug("appendSourceBuffer");
    try {
      sourceBuffer.appendBuffer(data);
      return true;
    } catch (e) {
      if (!(e instanceof DOMException) || e.name !== "QuotaExceededError") {
        throw e;
      }
      // QuotaExceededError
      const buffered = sourceBuffer.buffered;
      if (buffered.length <= 0) {
        super.dispatch("error", "deadlock");
        return false;
      }
      // Handle by removing half the buffered time range
      const startTime = buffered.start(0);
      const endTime = buffered.end(buffered.length - 1);
      const halfTime = (endTime + startTime) / 2;
      sourceBuffer.remove(startTime, halfTime);
      return false;
    }
  }
  /**
   * Attempts to remove data from the source buffer if it contains stale data.
   * @return Whether a remove operation was queued on the source buffer.
   */
  pruneSourceBuffer(sourceBuffer) {
    console.debug("pruneSourceBuffer");
    const buffered = sourceBuffer.buffered;
    if (buffered.length > 0) {
      const oldestTime = buffered.start(0);
      const latestTime = buffered.end(buffered.length - 1);
      const latestPrunableTime = latestTime - this.pruneThreshold;
      if (latestPrunableTime - oldestTime >= this.pruneTimeSpan) {
        // Prune
        sourceBuffer.remove(oldestTime, latestPrunableTime);
        return true;
      }
    }
    return false;
  }
  onNewFrame(width, height, time) {
    console.debug("onNewFrame");
    const frame = this.videoFramePool.allocate(width, height, (ctx) => {
      ctx.drawImage(this.videoElement, 0, 0);
    });
    // Pass frame to sink
    this.dispatchTransformed("frame", [frame, time], (args, last) => {
      // Clone reference to frame unless dispatching to the last handler
      return last ? args : [frame.clone(), time];
    });
  }
  /**
   * Clean up resources allocated by this decoder.
   */
  dispose(error) {
    if (this.cancel != null) {
      this.cancel();
      this.cancel = undefined;
    }
    if (this.videoURL !== undefined) {
      if (this.videoURL !== null) {
        this.videoElement.src = "";
        URL.revokeObjectURL(this.videoURL);
      } else {
        this.videoElement.srcObject = null;
      }
      this.videoURL = undefined;
    }
    if (this.mediaSource.readyState === "open") {
      this.mediaSource.endOfStream(error);
    }
  }
}
MP4Decoder.MIN_FAST_FORWARD_THRESHOLD = 0.0;
MP4Decoder.DEFAULT_FAST_FORWARD_THRESHOLD = 0.25;
MP4Decoder.MIN_SEEK_THRESHOLD = 1.0;
MP4Decoder.DEFAULT_SEEK_THRESHOLD = 1.0;
MP4Decoder.MIN_PRUNE_THRESHOLD = 15.0;
MP4Decoder.DEFAULT_PRUNE_THRESHOLD = 120.0;
MP4Decoder.MIN_PRUNE_TIME_SPAN = 5.0;
MP4Decoder.DEFAULT_PRUNE_TIME_SPAN = 30.0;
