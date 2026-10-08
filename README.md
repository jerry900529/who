# Boss Loot Rotation Tracker

A MapleStory boss-party tool that tracks who picks up each drop next (Jerry, YC, W10). It is a static site (HTML/CSS/JS) hosted on GitHub Pages, with progress stored in Firebase Firestore and synced in real time.

## Files
- `index.html` / `style.css` / `app.js` — the site itself
- `data.js` — items, rotation order, and the initial "next picker" (image file names are defined here too)
- `firebase-config.js` — your Firebase web config
- `firestore.rules` — database rules (passphrase-gated writes; only `next` can be written)
- `images/` — item icons

## How data is stored
- Progress lives in Firestore and is synced to everyone in real time. Visitors never see a login screen.
- Anyone can view. Operating the page (marking a pick, choosing the next person, undo, reset) requires the passphrase.
- If Firebase is not configured (config values still start with `YOUR_`), the site falls back to browser localStorage with no sync and no passphrase.
- To change the default starting point, edit `next` in `data.js` (an index into the rotation order, starting at 0).

## How the passphrase works
1. Each visitor is signed in anonymously in the background.
2. When a visitor submits the passphrase, the page tries to create `members/{uid}` containing it.
3. The Firestore rules allow that write only if a document named exactly like the passphrase exists in `passwords`. Clients cannot read or write `passwords`.
4. Writes to `items` are allowed only for users who have a `members/{uid}` document, and only with `{ next: 0..2 }` on the six known items.

Because the check is enforced by the rules, it cannot be bypassed from the browser.

## Firebase setup (one time)
1. In the [Firebase Console](https://console.firebase.google.com), create a project, add a Web app, and paste its config into `firebase-config.js`.
2. Build → Authentication → Sign-in method → enable **Anonymous**. Then, under Settings → Authorized domains, add `<your-username>.github.io`.
3. Build → Firestore Database → create a database (production mode).
4. On the Rules tab, paste the contents of `firestore.rules` and publish.
5. **Set the passphrase**: in Firestore Data, add a collection named `passwords`. Use your passphrase as the document ID (it cannot contain `/`) and add any field, for example `ok` = `true`. To change the passphrase, replace the document. To allow several passphrases, add several documents.

## Is it safe to publish the API key on GitHub?
The Firebase web `apiKey` is a project identifier, not a secret, and it is designed to be public. The real protections are:
- `firestore.rules`: nothing can be written without the passphrase, and the `passwords` collection is unreadable from the client.
- Restrict the key to your site: open [Google Cloud Console → APIs & Services → Credentials](https://console.cloud.google.com/apis/credentials), open the Browser key, set the application restriction to HTTP referrers, and add `https://<your-username>.github.io/*` (plus `http://localhost:8000/*` for local testing).
- Use a long passphrase, since the rules cannot rate-limit guesses.
- Never commit real secrets such as service account keys.

## Local preview
```bash
python3 -m http.server 8000
```
Then open http://localhost:8000.

## Deploy
Push to GitHub, then go to Settings → Pages and choose Branch `main`, folder `/ (root)`.

## Images
Place these files in `images/`: `life-grindstone.png`, `dark-box.png`, `life-box.png`, `white-jade-box.png`, `faith-grindstone.png`, `eternal-box.png`.
