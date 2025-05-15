"use strict";

const fs = require("fs");
const https = require("https");

const username = process.env.GITHUB_USERNAME;

const options = {
  hostname: "api.github.com",
  path: `/users/${username}/events/public`,
  headers: {
    "User-Agent": "now-status-script",
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
};

https.get(options, (res) => {
  let body = "";
  res.on("data", (chunk) => (body += chunk));
  res.on("end", () => {
    const events = JSON.parse(body);
    console.log("Parsed response:", events);

    if (!Array.isArray(events)) {
      console.error("GitHub API response is not an array.");
      return;
    }

    const pushEvent = events.find((e) => e.type === "PushEvent");

    if (!pushEvent) {
      console.log("No push events found.");
      return;
    }

    const latestCommitMessage = pushEvent.payload.commits[0].message;
    const timestamp = new Date().toISOString();

    const newStatus = {
      now: latestCommitMessage,
      updatedAt: timestamp,
    };

    fs.writeFileSync("public/now.json", JSON.stringify(newStatus, null, 2));
    console.log("✅ now.json updated with latest commit message.");
  });
});
