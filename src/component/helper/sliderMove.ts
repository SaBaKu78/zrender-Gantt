export default function sliderMove(
  delta: number,
  handleEnds: number[],
  extent: number[],
  handleIndex: 'all' | 0 | 1,
  minSpan?: number,
  maxSpan?: number
): number[] {
  delta = delta || 0;

  const extentSpan = extent[1] - extent[0];

  // Notice maxSpan and minSpan can be null/undefined.
  if (minSpan != null) {
    minSpan = restrict(minSpan, [0, extentSpan]);
  }
  if (maxSpan != null) {
    maxSpan = Math.max(maxSpan, minSpan != null ? minSpan : 0);
  }
  if (handleIndex === 'all') {
    let handleSpan = Math.abs(handleEnds[1] - handleEnds[0]);
    handleSpan = restrict(handleSpan, [0, extentSpan]);
    minSpan = maxSpan = restrict(handleSpan, [minSpan, maxSpan]);
    handleIndex = 0;
  }

  handleEnds[0] = restrict(handleEnds[0], extent);
  handleEnds[1] = restrict(handleEnds[1], extent);

  const originalDistSign = getSpanSign(handleEnds, handleIndex);

  handleEnds[handleIndex] += delta;

  // Restrict in extent.
  const extentMinSpan = minSpan || 0;
  const realExtent = extent.slice();
  originalDistSign.sign < 0 ? (realExtent[0] += extentMinSpan) : (realExtent[1] -= extentMinSpan);
  handleEnds[handleIndex] = restrict(handleEnds[handleIndex], realExtent);

  // Expand span.
  let currDistSign;
  currDistSign = getSpanSign(handleEnds, handleIndex);
  if (minSpan != null && (
    currDistSign.sign !== originalDistSign.sign || currDistSign.span < minSpan
  )) {
    // If minSpan exists, 'cross' is forbidden.
    handleEnds[1 - handleIndex] = handleEnds[handleIndex] + originalDistSign.sign * minSpan;
  }

  // Shrink span.
  currDistSign = getSpanSign(handleEnds, handleIndex);
  if (maxSpan != null && currDistSign.span > maxSpan) {
    handleEnds[1 - handleIndex] = handleEnds[handleIndex] + currDistSign.sign * maxSpan;
  }

  return handleEnds;
}

function getSpanSign(handleEnds: number[], handleIndex: 0 | 1) {
  const dist = handleEnds[handleIndex] - handleEnds[1 - handleIndex];
  // If `handleEnds[0] === handleEnds[1]`, always believe that handleEnd[0]
  // is at left of handleEnds[1] for non-cross case.
  return { span: Math.abs(dist), sign: dist > 0 ? -1 : dist < 0 ? 1 : handleIndex ? -1 : 1 };
}

function restrict(value: number, extend: number[]) {
  return Math.min(
    extend[1] != null ? extend[1] : Infinity,
    Math.max(extend[0] != null ? extend[0] : -Infinity, value)
  );
}