/*
 * Copyright (c) 2022 Megh Computing, Inc.
 *
 * All rights reserved. No warranty, explicit or implied, provided.
 * Unauthorized use, modification, or distribution is strictly prohibited.
 */

import { AbstractEventDispatcher } from "@megh-computing/event-dispatcher";

/**
 * Ensure timestamps are always incrementing: Largest timestamps at tail of queue, smallest timestamps at head.
 * @param queues
 * @param element
 */
function enqueue(queues, element) {
  let queue;
  if (queues.length > 0) {
    queue = queues[queues.length - 1];
  } else {
    queue = [];
    queues.push(queue);
  }
  if (queue.length > 0 && element.timestamp < queue[queue.length - 1].timestamp) {
    return false;
  }
  queue.push(element);
  return true;
}
function validateCapacity(capacity) {
  return capacity > 0;
}
/**
 * Synchronizes frames of a video stream and custom per-frame metadata using a shared timestamp key.
 */
export class MetadataSynchronizer extends AbstractEventDispatcher {
  /**
   * Creates a new metadata synchronizer.
   * @param capacity The maximum number of frame or metadata elements to keep in the internal queues.
   * @param frameContext An optional memory management context for frames.
   */
  constructor(capacity, frameContext) {
    if (!validateCapacity(capacity)) {
      throw new Error("Invalid capacity: " + capacity);
    }
    super("match", "frameDropped", "metadataDropped", "warning");
    this.frameQueues = [];
    this.metadataQueues = [];
    this.frameBacklog = 0;
    this.metadataBacklog = 0;
    this.capacity = capacity;
    this.equalityTolerance = 0;
    this.frameContext = frameContext;
  }
  /**
   * Sets the maximum number of frames or metadata to be queued up.
   * @param newCapacity The new capacity value.
   * @return Whether the capacity was successfully updated.
   */
  setCapacity(newCapacity) {
    if (this.capacity !== newCapacity && validateCapacity(newCapacity)) {
      this.capacity = newCapacity;
      this.trimQueues();
      return true;
    }
    return false;
  }
  /**
   * Ensures queues do not exceed their defined capacity.
   */
  trimQueues() {
    if (this.frameQueues.length <= 1) {
      // Frame side should only have 1 queue or fewer
      const [removeMetadataQueues, trimHeadMetadataQueue] = this.calcTrim(this.metadataQueues);
      this.popQueues(removeMetadataQueues);
      this.frameBacklog += removeMetadataQueues;
      const [q, t] = this.calcTrim(this.frameQueues);
      if (q > 0) {
        throw new Error("Should not have any more queues to remove for frames!");
      }
      this.trimHeadFrameQueue(t);
      this.trimHeadMetadataQueue(trimHeadMetadataQueue);
    } else if (this.metadataQueues.length <= 1) {
      // Metadata side should only have 1 queue or fewer
      const [removeFrameQueues, trimHeadFrameQueue] = this.calcTrim(this.frameQueues);
      this.popQueues(removeFrameQueues);
      this.metadataBacklog += removeFrameQueues;
      this.trimHeadFrameQueue(trimHeadFrameQueue);
      const [q, t] = this.calcTrim(this.metadataQueues);
      if (q > 0) {
        throw new Error("Should not have any more queues to remove for metadata!");
      }
      this.trimHeadMetadataQueue(t);
    } else {
      // Both sides have at least 2 queues each (which should never be possible).
      throw new Error("Both sides have 2 or more queues!");
    }
  }
  calcTrim(queues) {
    let frameCount = 0;
    let i = queues.length - 1;
    while (i >= 0) {
      frameCount += queues[i].length;
      if (frameCount >= this.capacity) {
        return [i, frameCount - this.capacity];
      }
      i--;
    }
    return [0, 0];
  }
  popQueues(n) {
    for (let i = 0; i < n; i++) {
      let frameQueue;
      if ((frameQueue = this.frameQueues.shift()) != null) {
        this.dropFrames(frameQueue.length, frameQueue);
      } else {
        const warning = "no frame queue to pop";
        if (!this.dispatch("warning", "trim", warning)) {
          console.warn(warning);
        }
      }
      let metadataQueue;
      if ((metadataQueue = this.metadataQueues.shift()) != null) {
        this.dropMetadatas(metadataQueue.length, metadataQueue);
      } else {
        const warning = "no metadata queue to pop";
        if (!this.dispatch("warning", "trim", warning)) {
          console.warn(warning);
        }
      }
    }
  }
  trimHeadFrameQueue(n) {
    if (n > 0) {
      this.dropHeadFrames(n);
      const warning = "trimmed " + n + " frames from head queue";
      if (!this.dispatch("warning", "trim", warning)) {
        console.warn(warning);
      }
    }
  }
  trimHeadMetadataQueue(n) {
    if (n > 0) {
      this.dropHeadMetadata(n);
      const warning = "trimmed " + n + " metadata from head queue";
      if (!this.dispatch("warning", "trim", warning)) {
        console.warn(warning);
      }
    }
  }
  /**
   * Sets the tolerance between timestamps before they are considered equal.
   * @param equalityTolerance The new tolerance setting.
   */
  setEqualityTolerance(equalityTolerance) {
    this.equalityTolerance = Math.max(0, equalityTolerance);
  }
  /**
   * Gets the oldest appended metadata timestamp.
   */
  getOldestMetadataTimestamp() {
    if (this.metadataQueues.length > 0) {
      const tailMetadataQueue = this.metadataQueues[this.metadataQueues.length - 1];
      if (tailMetadataQueue.length > 0) {
        return tailMetadataQueue[tailMetadataQueue.length - 1].timestamp;
      }
    }
    return null;
  }
  /**
   * Appends a new frame to the synchronizer.
   * @param frame The frame to append.
   * @param timestamp The media timestamp of the frame.
   * @return Whether the frame was appended, or rejected due to invalid timestamp.
   */
  appendFrame(frame, timestamp) {
    if (this.frameBacklog > 0) {
      // Immediately drop frame
      this.dropFrame({ frame, timestamp });
      return true;
    }
    if (
      enqueue(this.frameQueues, {
        timestamp: timestamp,
        frame: frame,
      })
    ) {
      this.process();
      return true;
    }
    return false;
  }
  /**
   * Appends a new metadata object to the synchronizer.
   * @param metadata The metadata object.
   * @param timestamp The media timestamp of the metadata.
   * @return Whether the metadata was appended, or rejected due to invalid timestamp.
   */
  appendMetadata(metadata, timestamp) {
    if (this.metadataBacklog > 0) {
      // Immediately drop metadata
      this.dropMetadata({ metadata, timestamp });
      return true;
    }
    if (
      enqueue(this.metadataQueues, {
        timestamp: timestamp,
        metadata: metadata,
      })
    ) {
      this.process();
      return true;
    }
    console.warn("Failed to append metadata @", timestamp, "oldest:", this.getOldestMetadataTimestamp());
    return false;
  }
  process() {
    if (this.checkMatch()) {
      // If a match was found, it's possible for at least one of the queues to be empty.
      // So, check if the head queues can be removed.
      this.checkHeadQueues();
    } else {
      // Only need to trim if a match wasn't found:
      // If a match WAS found, then it removed at least one element from each queue.
      // So, it's impossible for the queues to now exceed their capacity.
      this.trimQueues();
    }
  }
  /**
   * Analyzes the queues and attempts to find a match.
   * @return Whether a match was found.
   */
  checkMatch() {
    // There must be a queue available for both frames and metadata
    if (this.frameQueues.length <= 0 || this.metadataQueues.length <= 0) {
      return false;
    }
    const frameQueue = this.frameQueues[0];
    const metadataQueue = this.metadataQueues[0];
    // There must be elements on both queues for a match to exist
    if (frameQueue.length <= 0 || metadataQueue.length <= 0) {
      return false;
    }
    // Determine which queue is ahead of the other
    const headFrame = frameQueue[0];
    const tailMetadata = metadataQueue[metadataQueue.length - 1];
    if (headFrame.timestamp > tailMetadata.timestamp) {
      // Frame queue is fully ahead of metadata queue
      // Drop all metadata except for the tail
      for (const droppedMetadata of metadataQueue.splice(0, metadataQueue.length - 1)) {
        this.dropMetadata(droppedMetadata);
      }
      // Tail metadata is now also the head metadata
      return this.testElements(headFrame, tailMetadata);
    }
    const headMetadata = metadataQueue[0];
    const tailFrame = frameQueue[frameQueue.length - 1];
    if (headMetadata.timestamp > tailFrame.timestamp) {
      // Metadata queue is fully ahead of frame queue
      // Drop all frames except for the tail
      for (const droppedFrame of frameQueue.splice(0, frameQueue.length - 1)) {
        this.dropFrame(droppedFrame);
      }
      // Tail frame is now also the head frame
      return this.testElements(tailFrame, headMetadata);
    }
    // There is some overlap between the queues.
    if (!this.testElements(headFrame, headMetadata)) {
      if (headFrame.timestamp > headMetadata.timestamp) {
        // Head frame overlaps
        this.scanQueueForMatch(headFrame, frameQueue, metadataQueue, () => {
          this.dropHeadMetadata(1);
        });
      } else {
        // Head metadata overlaps
        this.scanQueueForMatch(headMetadata, metadataQueue, frameQueue, () => {
          this.dropHeadFrames(1);
        });
      }
    }
    return true;
  }
  scanQueueForMatch(cursor, cursorQueue, queue, dropHeadFunction) {
    while (queue.length > 1) {
      const nextElement = queue[1];
      // Check equality with next metadata
      if (this.testEquality(cursor.timestamp, nextElement.timestamp)) {
        // Must drop head metadata first so the next metadata becomes the head
        dropHeadFunction();
        // Match with next metadata
        this.matchHead();
        return;
      }
      // Ensure between current metadata and next metadata
      if (cursor.timestamp < nextElement.timestamp) {
        // Figure out which element to match by time delta
        const currElement = queue[0];
        const deltaToCurr = Math.abs(cursor.timestamp - currElement.timestamp);
        const deltaToNext = Math.abs(cursor.timestamp - nextElement.timestamp);
        if (deltaToNext < deltaToCurr && !this.hasBetterMatch(nextElement, 1, queue, 1, cursorQueue, deltaToNext)) {
          // Next metadata is closer, so match with it by dropping current head metadata
          dropHeadFunction();
        }
        this.matchHead();
        return;
      }
      // Drop current head metadata
      dropHeadFunction();
    }
    // Should never happen
    throw new Error("No match found.");
  }
  hasBetterMatch(cursor, cursorIndex, cursorQueue, otherIndex, otherQueue, bestDelta) {
    if (otherIndex >= otherQueue.length) {
      return false;
    }
    const otherElement = otherQueue[otherIndex];
    const deltaToOther = Math.abs(cursor.timestamp - otherElement.timestamp);
    if (deltaToOther >= bestDelta) {
      return false;
    }
    // Possibly better match, perform recursive check...
    return !this.hasBetterMatch(otherElement, otherIndex, otherQueue, cursorIndex + 1, cursorQueue, deltaToOther);
  }
  testElements(headFrame, headMetadata) {
    if (this.testEquality(headFrame.timestamp, headMetadata.timestamp)) {
      this.matchHead();
      return true;
    }
    return false;
  }
  testEquality(pts1, pts2) {
    return Math.abs(pts1 - pts2) <= this.equalityTolerance;
  }
  matchHead() {
    if (this.frameQueues.length <= 0) {
      throw new Error("invalid frame queues state");
    }
    if (this.metadataQueues.length <= 0) {
      throw new Error("invalid metadata queues state");
    }
    // Pop head frame
    const headFrame = this.frameQueues[0].shift();
    if (headFrame == null) {
      throw new Error("invalid head frame queue state");
    }
    // Pop head metadata
    const headMetadata = this.metadataQueues[0].shift();
    if (headMetadata == null) {
      throw new Error("invalid head metadata queue state");
    }
    // Match!
    if (this.frameContext != null) {
      const fc = this.frameContext;
      if (
        !this.dispatchTransformed(
          "match",
          [headFrame.frame, headMetadata.metadata, headFrame.timestamp, headMetadata.timestamp],
          (args, last) => {
            return last ? args : [fc.clone(args[0]), args[1], args[2], args[3]];
          }
        )
      ) {
        fc.release(headFrame.frame);
      }
    } else {
      this.dispatch("match", headFrame.frame, headMetadata.metadata, headFrame.timestamp, headMetadata.timestamp);
    }
  }
  dropHeadFrames(n) {
    if (this.frameQueues.length <= 0) {
      throw new Error("invalid frame queues state");
    }
    this.dropFrames(n, this.frameQueues[0]);
  }
  dropFrames(n, from) {
    for (let i = 0; i < n; i++) {
      const frame = from.shift();
      if (frame == null) {
        throw new Error("invalid frame queue state");
      }
      this.dropFrame(frame);
    }
  }
  dropFrame(frame) {
    if (this.frameContext != null) {
      const fc = this.frameContext;
      if (
        !this.dispatchTransformed("frameDropped", [frame.frame, frame.timestamp], (args, last) => {
          return last ? args : [fc.clone(args[0]), args[1]];
        })
      ) {
        fc.release(frame.frame);
      }
    } else {
      this.dispatch("frameDropped", frame.frame, frame.timestamp);
    }
  }
  dropHeadMetadata(n) {
    if (this.metadataQueues.length <= 0) {
      throw new Error("invalid metadata queues state");
    }
    this.dropMetadatas(n, this.metadataQueues[0]);
  }
  dropMetadatas(n, from) {
    for (let i = 0; i < n; i++) {
      const headMetadata = from.shift();
      if (headMetadata == null) {
        throw new Error("invalid metadata queue state");
      }
      this.dropMetadata(headMetadata);
    }
  }
  dropMetadata(metadata) {
    this.dispatch("metadataDropped", metadata.metadata, metadata.timestamp);
  }
  /**
   * Check if head queues can be removed and, if so, remove them.
   */
  checkHeadQueues() {
    // Both sides have to have at least 2 queues
    while (this.frameQueues.length >= 2 && this.metadataQueues.length >= 2) {
      // Drop all elements in head queues
      for (const frame of this.frameQueues[0]) {
        this.dropFrame(frame);
      }
      for (const metadata of this.metadataQueues[0]) {
        this.dropMetadata(metadata);
      }
      // Pop head queues
      this.frameQueues.shift();
      this.metadataQueues.shift();
    }
  }
  /**
   * Appends a reset point for the frames of the synchronizer.
   */
  resetFrame() {
    if (this.frameBacklog > 0) {
      this.frameBacklog--;
    } else {
      this.frameQueues.push([]);
      this.checkHeadQueues();
    }
  }
  /**
   * Appends a reset point for the metadata of the synchronizer.
   */
  resetMetadata() {
    if (this.metadataBacklog > 0) {
      this.metadataBacklog--;
    } else {
      this.metadataQueues.push([]);
      this.checkHeadQueues();
    }
  }
  /**
   * Resets the internal queues of the synchronizer.
   */
  reset() {
    if (this.frameContext != null) {
      for (const frameQueue of this.frameQueues) {
        for (const frame of frameQueue) {
          this.frameContext.release(frame.frame);
        }
      }
    }
    this.frameQueues.length = 0;
    this.metadataQueues.length = 0;
    this.frameBacklog = 0;
    this.metadataBacklog = 0;
  }
}
