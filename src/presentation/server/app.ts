import express from "express";

import router from "../http/routes";

import { corsConfig } from "./config/cors.config";
import { helmetConfig } from "./config/helmet.config";

/**
 * Express Application Setup
 * Configures middleware and routes
 */
export function createApp() {
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
   * JSON Parser
   */
  app.use(express.json());

  /**
   * Routes
   */
  app.use(router);

  return app;
}
