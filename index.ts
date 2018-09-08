import { Server } from "./src/server/Server";

Error.stackTraceLimit = Infinity;
require("source-map-support").install();
new Server().start();
