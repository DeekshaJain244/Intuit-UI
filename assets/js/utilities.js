/*
 * Copyright (c) 2022 Megh Computing, Inc.
 *
 * All rights reserved. No warranty, explicit or implied, provided.
 * Unauthorized use, modification, or distribution is strictly prohibited.
 */

export function clipCSS(opts) {
  const { shape, coords, radius, position } = opts;

  if (coords.length < 3 && shape.name === "Custom") return "none";

  switch (shape.name) {
    case "Circle":
      return clipType(shape) + "(" + radius + "% at " + position[0] + "% " + position[1] + "%)";
    default:
      return clipType(shape) + "(" + clipPoints(coords).join(", ") + ")";
  }
}
// [[0, 1], [1,0]]  => [[0%, 1%], [1%, 0%]] =>  [0% 1%], [1% 0%] => ("0% 1%, 1% 0%")
export function clipPoints(coords) {
  return coords.map((i) => {
    return i
      .map((o) => {
        return o + "%";
      })
      .join(" ");
  });
}

export function clipPointsDisplay(coords) {
  return coords.map((i) => {
    let jString = { x: Math.fround(i[0] / 100), y: Math.fround(i[1] / 100) };
    return jString;
  });
}

export function clipType(shape) {
  switch (shape.name) {
    case "Circle":
      return "circle";
    default:
      return "polygon";
  }
}
