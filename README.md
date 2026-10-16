# Md Majid Khan — Portfolio

My engineering portfolio. It is published for free by **GitHub Pages** — no hosting, server or domain needed.

Your live link will look like this:

```
https://<your-github-username>.github.io/<repository-name>/
```

Example: username `majidkhan`, repository `portfolio` → **https://majidkhan.github.io/portfolio/**

---

## Publish it (one time, about 10 minutes)

### 1. Create a GitHub repository
- Sign in at **github.com** → click **+** (top right) → **New repository**.
- Repository name: `portfolio` (lowercase, no spaces).
- Choose **Public** (required for free GitHub Pages).
- Do **not** tick "Add a README". Click **Create repository**.

### 2. Upload the project
- **Extract the ZIP first.** Do not upload the ZIP file itself.
- Open the extracted `majid-portfolio` folder. Upload **everything inside it** — not the folder itself —
  so that `package.json` sits at the top level of your repository.
- On the empty repository page click **uploading an existing file**, drag in all the files and folders, then click **Commit changes**.

The `.github` folder is **required** — it tells GitHub how to build the site. Its name starts with a dot, so it may be hidden:
- **Windows:** File Explorer → View → Show → **Hidden items**.
- **Mac:** in Finder press **Cmd + Shift + .** (full stop).

If it still doesn't upload, see [Missing .github folder](#missing-github-folder) below.

### 3–5. Turn on GitHub Pages
- In your repository open **Settings** → **Pages** (left menu).
- Under **Build and deployment → Source**, choose **GitHub Actions**.

### 6. Wait for the deployment
- Open the **Actions** tab. A run called **Deploy portfolio to GitHub Pages** appears.
- Wait for the green tick (about 1–2 minutes).
- If the first run shows a red ✗ (it can happen if it started before step 3–5), click it → **Re-run all jobs**.

### 7. Open your link
- **Settings → Pages** now shows **"Your site is live at …"**. That is your link.
  It is also shown inside the finished Actions run.
- It works on any phone, tablet or computer. Add it to your LinkedIn and resume.

---

## Updating the site later

Change a file on GitHub (open it → pencil icon → **Commit changes**) or upload a new version.
Every change to the `main` branch republishes the site automatically within a couple of minutes.

| To change…                             | Edit this file                          |
| -------------------------------------- | --------------------------------------- |
| Jobs, skills, projects, achievements   | `src/data/portfolioData.js`             |
| GitHub button (your profile link)      | `social.github` in `src/data/portfolioData.js` |
| Resume                                 | replace `public/Majid_Khan_Resume.pdf` (keep the same name) |

---

## Missing .github folder

If the Actions tab shows nothing after uploading, the workflow file wasn't uploaded. Create it on GitHub directly:

1. In your repository click **Add file → Create new file**.
2. In the name box type exactly: `.github/workflows/deploy.yml`
3. Paste the contents of the `deploy.yml` file from the extracted project's `.github/workflows` folder.
4. Click **Commit changes**. The deployment starts automatically.

---

## Optional: run it on your own computer

Only needed if you want to preview changes before uploading. Install Node.js (version 18 or newer) from nodejs.org, then in the project folder:

```bash
npm install
npm run dev
```

Open the address it prints in your browser.
