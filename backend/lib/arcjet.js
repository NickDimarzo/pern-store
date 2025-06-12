import arcjet, { tokenBucket, detectBot, shield } from "@arcjet/node";

import "dotenv/config.js";

// initialize arcjet
export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    // Shield protects your application from common attacks like SQL injections
    shield({ mode: "LIVE" }),
    // detect any bots
    detectBot({
      mode: "LIVE",
      // Block all bots excepts search engines
      allow: ["CATEGORY:SEARCH_ENGINE"],
      // see the full list at https://arcjet.com/bot-list
    }),
    // rate limiting
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});
