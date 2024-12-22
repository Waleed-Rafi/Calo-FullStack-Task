import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  keyGenerator: (req) => {
    return req.headers["x-user-id"]?.toString() || "";
  },
  message: "Too many requests, please try again later.",
});
