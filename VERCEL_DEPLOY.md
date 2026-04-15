# Deploy This Experiment on Vercel

This experiment is a static HTML/CSS/JavaScript site. It does not need a build step.

## Folder to Deploy

Deploy this folder:

`C:\Users\JayCh\ASU Dropbox\Jie Chen\Research\Text to video\material\misq\Lab2\experiment`

If your Git repository contains the whole `Lab2` directory, set the Vercel **Root Directory** to:

`experiment`

If your repository contains only the website files, keep the Root Directory as the repository root.

## Dashboard Deployment

1. Push the website files to GitHub, GitLab, or Bitbucket.
2. In Vercel, create a **New Project**.
3. Import that repository.
4. In **Build & Output Settings**, use:
   - **Framework Preset**: `Other`
   - **Build Command**: leave blank
   - **Output Directory**: leave blank if the deployed root is `experiment`; otherwise use `.`
5. Deploy.

After deployment, Vercel will automatically give you a URL like:

`https://your-project-name.vercel.app`

That URL is the domain you can type in immediately.

## Custom Domain

If you want your own domain name instead of `vercel.app`:

1. Open the project in Vercel.
2. Go to **Settings** > **Domains**.
3. Add your domain.
4. Follow the DNS instructions Vercel shows.

If you do not already own a domain, you need to buy one first or buy one through Vercel.

## Notes for This Experiment

- Make sure the `media/` folder is included in the deployed files.
- The site stores progress in browser local storage.
- If you use Google Sheets collection, keep your Apps Script web app URL in the query string as before:

`?sheet=YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL`

- If you use Prolific completion, keep your completion code in the query string:

`?cc=YOURCODE`

## Optional Next Step

If you want, the next step is to add a small `vercel.json` file so the deployment is even more explicit, but this static site can already deploy without one.
