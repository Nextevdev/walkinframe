import { initCopy } from "./src/copy.js";
import { readEnv } from "./src/env.js";
import { initReel } from "./src/reel.js";
import { initImageSkeleton, initReveal } from "./src/reveal.js";
import { createTelemetry } from "./src/telemetry.js";
import { initTiles } from "./src/tiles.js";

/* Telemetry stays off: the page promises no cookies and no third parties. See src/telemetry.js. */
createTelemetry({ enabled: false, adapters: [] }, window);

const env = readEnv(window);
initImageSkeleton(document);
initReveal(document, env);
initReel(document, env);
initTiles(document, env);
initCopy(document);
