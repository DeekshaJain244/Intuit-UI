/*
 * Copyright (c) 2022 Megh Computing, Inc.
 *
 * All rights reserved. No warranty, explicit or implied, provided.
 * Unauthorized use, modification, or distribution is strictly prohibited.
 */

export class AbstractEventDispatcher {
  constructor(...eventNames) {
    this.events = new Map();
    for (const eventName of eventNames) {
      if (this.events.has(eventName)) {
        throw new Error(`Event ${eventName} is already registered.`);
      }
      this.events.set(eventName, null);
    }
  }
  /**
   * @inheritDoc
   * @implements EventDispatcher
   */
  on(eventName, listener) {
    let listeners = this.events.get(eventName);
    if (listeners === undefined) {
      throw new Error(`Event ${eventName} not registered.`);
    }
    if (listeners === null) {
      listeners = new Set();
      this.events.set(eventName, listeners);
    } else if (listeners.has(listener)) {
      return false;
    }
    listeners.add(listener);
    return true;
  }
  /**
   * @inheritDoc
   * @implements EventDispatcher
   */
  off(eventName, listener) {
    const listeners = this.events.get(eventName);
    if (listeners === undefined) {
      throw new Error(`Event ${eventName} not registered.`);
    }
    if (listeners === null) {
      return false;
    }
    return listeners.delete(listener);
  }
  dispatch(eventName, ...args) {
    const handlers = this.events.get(eventName);
    if (handlers === undefined) {
      throw new Error(`Event ${eventName} not registered.`);
    }
    if (handlers !== null && handlers.size > 0) {
      handlers.forEach((handler) => handler(...args));
      return true;
    }
    return false;
  }
  dispatchTransformed(eventName, args, transform) {
    const handlers = this.events.get(eventName);
    if (handlers === undefined) {
      throw new Error(`Event ${eventName} not registered.`);
    }
    if (handlers !== null && handlers.size > 0) {
      const snapshot = Array.from(handlers);
      const l = snapshot.length;
      if (l === 1) {
        snapshot[0](...transform(args, true, true));
      } else {
        for (let i = 0; i < l; i++) {
          snapshot[i](...transform(args, i + 1 === l, false));
        }
      }
      return true;
    }
    return false;
  }
}
