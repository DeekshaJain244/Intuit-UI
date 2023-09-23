/*
 * Copyright (c) 2022 Megh Computing, Inc.
 *
 * All rights reserved. No warranty, explicit or implied, provided.
 * Unauthorized use, modification, or distribution is strictly prohibited.
 */

/**
 * Creates a unique 48-bit integer key for the given width and height.
 */
function key(width, height) {
  return ((width & 0xffffff) << 24) + (height & 0xffffff);
}
/**
 * A pool of image frames that allows the underlying canvases to be reused after the frames are released.
 */
export class ImageFramePool {
  /**
   * Creates a new pool of image frames.
   * @param expireTimeout The number of seconds before a canvas is removed from the pool.
   */
  constructor(expireTimeout) {
    this.expireTimeout = expireTimeout;
    this.pool = new Map();
  }
  /**
   * Allocates a new image frame from the pool (either reusing one or creating a new one).
   * @param width The width of the frame.
   * @param height The height of the frame.
   * @param render An optional function to render to the underlying canvas.
   * @return A newly allocated image frame.
   */
  allocate(width, height, render) {
    const k = key(width, height);
    let stack = this.pool.get(k);
    if (stack == null) {
      stack = [];
      this.pool.set(k, stack);
    }
    let newCanvas = stack.pop();
    if (newCanvas == null) {
      newCanvas = document.createElement("canvas");
      newCanvas.width = width;
      newCanvas.height = height;
    }
    if (render != null) {
      const ctx = newCanvas.getContext("2d");
      if (ctx == null) {
        throw new Error("Unable to create 2D context from canvas!");
      }
      render(ctx);
    }
    const pool = stack;
    return new PooledImageFrame(newCanvas, (c) => {
      // Release canvas back into usable pool
      pool.push(c);
    });
  }
}
/**
 * Represents an image frame with the underlying memory allocated from a reusable pool.
 */
class PooledImageFrame {
  constructor(canvas, releaseFunction, ref) {
    this.canvas = canvas;
    this.releaseFunction = releaseFunction;
    if (ref != null) {
      if (ref.count <= 0) {
        throw new Error("Image frame ref count is zero!");
      }
      this.ref = ref;
      ref.count++;
    } else {
      this.ref = {
        count: 1,
      };
    }
  }
  /**
   * @implements ImageFrame
   */
  get width() {
    if (this.canvas == null) {
      throw new Error("Unable to query width from released image frame!");
    }
    return this.canvas.width;
  }
  /**
   * @implements ImageFrame
   */
  get height() {
    if (this.canvas == null) {
      throw new Error("Unable to query height from released image frame!");
    }
    return this.canvas.height;
  }
  /**
   * @implements ImageFrame
   */
  drawTo(ctx) {
    if (this.canvas == null) {
      throw new Error("Unable to draw released image frame!");
    }
    ctx.drawImage(this.canvas, 0, 0);
  }
  /**
   * @implements ImageFrame
   */
  getSourceImageData(x, y, w, h) {
    if (this.canvas == null) {
      throw new Error("Unable to get image data from released image frame!");
    }
    const ctx = this.canvas.getContext("2d");
    if (ctx == null) {
      return null;
    }
    return ctx.getImageData(x, y, w, h);
  }
  /**
   * @implements ImageFrame
   */
  clone() {
    if (this.canvas == null || this.releaseFunction == null) {
      throw new Error("Unable to clone released image frame!");
    }
    return new PooledImageFrame(this.canvas, this.releaseFunction, this.ref);
  }
  /**
   * @implements ImageFrame
   */
  release() {
    if (this.canvas != null && this.releaseFunction != null) {
      this.ref.count--;
      if (this.ref.count <= 0) {
        this.releaseFunction(this.canvas);
      }
      this.canvas = null;
      this.releaseFunction = null;
    }
  }
}
