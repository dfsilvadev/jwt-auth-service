import express from "express";

import { corsConfig } from "../application/config/cors";
import { helmetConfig } from "../application/config/helmet";

import router from "../application/http/routes";

import { env } from "../application/config/env/env";

const app = express();

/**
 * Security Headers
 */
app.use(helmetConfig());

/**
 * CORS Configuration
 */
app.use(corsConfig());

/**
 * Import configurations
 * Port, Node Environment, and Database URL
 */
const PORT = env.PORT;

/**
 * Config Response
 * JSON
 */
app.use(express.json());

/**
 * Routes
 */
app.use(router);

/**
 * Listen
 */
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🔥 Server started at http://localhost:${PORT}`);
});
