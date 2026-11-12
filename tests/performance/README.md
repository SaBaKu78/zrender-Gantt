# Gantt performance baseline

Run the local performance baseline with:

```powershell
npm run perf:baseline
```

The command uses the real application and Chrome, starts the mock server when
needed, generates deterministic task fixtures, runs the actual
`assignOverlapLanes` layout, and writes:

```text
perf-results/latest.json
perf-results/run-<timestamp>.json
```

The default run opens a visible Chrome window so the result reflects interactive
rendering rather than headless rendering. Set `PERF_HEADLESS=1` only for a
compatibility smoke run; do not compare headless timings with headed timings.
Run the baseline alone: do not run TypeScript builds, unit tests, other browsers,
or CPU-heavy tasks in parallel, because contention invalidates timing comparisons.

Useful environment variables:

```text
PERF_VIEWPORT_WIDTH=1600
PERF_VIEWPORT_HEIGHT=900
PERF_DEVICE_SCALE_FACTOR=1
PERF_GROUPS=small,medium,peak
PERF_SCROLL_STEPS=30
PERF_UPDATE_STEPS=8
PERF_WARMUP_STEPS=5
PERF_MAX_SCROLL_P95_MS=<optional budget>
PERF_MAX_SCROLL_FRAME_P95_MS=<optional budget>
PERF_MAX_UPDATE_P95_MS=<optional budget>
PERF_MAX_IDLE_PAINTS=<optional budget>
```

The fixture count is fixed by scenario, not by the current mock task count:

- `small`: 164 resources, 1,000 assigned, 300 unassigned
- `medium`: 164 resources, 5,000 assigned, 1,000 unassigned
- `peak`: 164 resources, 10,000 assigned, 2,000 unassigned

Each fixture creates overlapping task groups per resource so lane assignment is
part of the measured path. The baseline always fails when:

- two overlapping tasks in the same resource receive the same lane;
- a task falls outside the vertical range of its `resourceIndex` row;
- the expected fixture task count is not applied;
- active animations remain after the settle period.

The report also records input coalescing for wheel scrolling, main scrollbar
dragging, and pointer panning:

- number of raw input events;
- expected animation-frame batches;
- emitted `scrollMove` or `pan` events;
- actual dataZoom dispatch count;
- maximum dispatch count in one frame;
- whether drag end committed the final offset.

Under the current event pipeline, the maximum dispatch count per frame should
not exceed one for each interaction source.

Absolute timing budgets are opt-in because they depend on the machine, display
scale and GPU rasterization mode. Compare runs from the same hardware and browser.
Use P50 for the most stable comparison and P95 to track interaction spikes.
