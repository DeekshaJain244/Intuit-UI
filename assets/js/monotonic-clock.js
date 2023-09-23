/*
 * Copyright (c) 2022 Megh Computing, Inc.
 *
 * All rights reserved. No warranty, explicit or implied, provided.
 * Unauthorized use, modification, or distribution is strictly prohibited.
 */

let perf;
if (
  typeof window === "object" &&
  window != null &&
  typeof window.performance === "object" &&
  window.performance != null &&
  typeof window.performance.now === "function"
) {
  // Use browser performance#now
  perf = window.performance;
} else if (typeof process === "object" && process != null && typeof require === "function") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  perf = require("perf_hooks").performance;
} else {
  throw new Error("Unsupported environment!");
}
/**
 * Gets the current time, measured in milliseconds.
 */
export function time() {
  return perf.now();
}
