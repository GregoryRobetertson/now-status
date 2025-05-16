"use strict";

const fs = require("fs");
const https = require("https");

const username = process.env.GITHUB_USERNAME;
const token = process.env.GITHUB_TOKEN;

const options = {
  hostname: "api.github.com",
  path: `/users/${username}/repos?sort=created&direction=desc&per_page=1`,
  headers: {
    "User-Agent": "now-status-script",
    Authorization: `token ${token}`,
  },
};

https.get(options, (res) => {
  let body = "";
  res.on("data", (chunk) => (body += chunk));
  res.on("end", () => {
    const repos = JSON.parse(body);

    if (!Array.isArray(repos) || repos.length === 0) {
      console.error("No repositories found.");
      return;
    }

    const latestRepo = repos[0];
    const timestamp = new Date().toISOString();

    const newStatus = {
      now: latestRepo.name,
      updatedAt: timestamp,
    };

    fs.writeFileSync("docs/now.json", JSON.stringify(newStatus, null, 2));
    console.log(
      "✅ now.json updated with latest repository name:",
      latestRepo.name
    );
  });
});
