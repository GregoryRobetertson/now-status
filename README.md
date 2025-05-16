# now-status

This is a simple backend script I built to fetch my latest GitHub activity—specifically my latest commit message—and generate a live status file (`now.json`) that I can use to show what I’m currently working on.

---

## What is this for?

I use this project to create a **live “What I’m working on” feed** for my personal portfolio website by:

- Automatically pulling my latest GitHub commit message using the GitHub API.
- Updating a JSON file (`now.json`) with my current activity and the timestamp.
- Making this status publicly accessible so my portfolio frontend can display it in real-time.

---

## How it works

1. The script uses my GitHub username and a Personal Access Token (PAT) to authenticate with the GitHub API.
2. It fetches my recent public and/or private GitHub events.
3. It finds the latest push event and extracts the commit message.
4. It writes this information into a `now.json` file along with the current timestamp.
5. My portfolio website fetches this JSON file and displays the live status.

---

## Usage

- I store my GitHub username and token securely in a `.env` file.
- I run the script manually or schedule it to update `now.json` regularly.
- I host `now.json` publicly (for example, via GitHub Pages or a static file server).
- My portfolio frontend fetches this file and shows my current work.

---

## Why I use this

- It keeps my portfolio fresh and dynamic with minimal manual effort.
- It shows potential employers or visitors what I’m actively working on.
- It leverages the GitHub API for real-time, automated updates.

---

## Notes

- I keep my GitHub token private and never commit it to public repositories.
- Using a token helps increase the API rate limits and avoids errors.

---

I can customize and extend this project anytime to better fit my workflow.

## 💥 Handling Push Protection: Removing a Committed Secret

While developing, I accidentally committed a `.env` file that contained a **GitHub Personal Access Token**. GitHub’s security blocked the push due to **push protection**.

Here’s exactly how I fixed it:

### ✅ Steps I Took to Fix the Error

1. **Installed `git-filter-repo`**

   ```bash
   pip install --user git-filter-repo
   export PATH=$PATH:~/.local/bin
   git filter-repo --path .env --invert-paths
   git remote add origin https://github.com/GregoryRobetertson/now-status.git
   git push -u origin main --force


   ```

   ### Handling the workload failed error

The cause of this error was because it could not find the module.

I notice how my file name didn't match the file name in the workflow.
So i renamed it to match and thats how i solved it.
