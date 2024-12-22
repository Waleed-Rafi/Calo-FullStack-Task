import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  keyGenerator: (req) => {
    return req.headers["x-user-id"]?.toString() || "";
  },
  message: { error: "Too many requests, please try again later." },
});
