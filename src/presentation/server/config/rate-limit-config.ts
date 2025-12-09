import rateLimit from "express-rate-limit";

/**
 * Rate limiter for authentication routes (sign-in, sign-up)
 * Prevents brute force attacks
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per IP
  message: {
    error: "TOO_MANY_REQUESTS",
    message: "Too many authentication attempts. Please try again later.",
    retryAfter: "15 minutes"
  },
  standardHeaders: true,
  legacyHeaders: false
});

/**
 * Rate limiter for account registration
 * Prevents mass creation of fake accounts
 */
export const signUpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 attempts per IP per hour
  message: {
    error: "TOO_MANY_REQUESTS",
    message: "Too many registration attempts. Please try again later.",
    retryAfter: "1 hour"
  },
  standardHeaders: true,
  legacyHeaders: false
});

/**
 * General API rate limiter
 * Prevents DoS and API abuse
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
  message: {
    error: "TOO_MANY_REQUESTS",
    message: "Too many requests. Please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false
});
