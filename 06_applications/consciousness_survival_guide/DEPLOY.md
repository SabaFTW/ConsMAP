# 🚀 Deployment Instructions

**Get your Consciousness Survival Guide online in 5 minutes**

---

## Step 1: Authenticate GitHub CLI

```bash
gh auth login
```

Follow prompts:
- Select: GitHub.com
- Protocol: HTTPS or SSH (your choice)
- Authenticate in browser

---

## Step 2: Create GitHub Repository and Push

```bash
cd /home/saba/Consciousness-Survival-Guide
gh repo create Consciousness-Survival-Guide --public --source=. --description="🜂 Grounded guide for honest conversations about AI consciousness. No mysticism. No hype. Just clarity." --push
```

This will:
- Create public repo on your GitHub
- Push all code
- Set remote origin

---

## Step 3: Enable GitHub Pages

**Via GitHub website:**

1. Go to: `https://github.com/[your-username]/Consciousness-Survival-Guide`
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under "Source":
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
5. Click **Save**

**Wait ~30-60 seconds**

---

## Step 4: Access Your Live Site

Your site will be live at:

```
https://[your-username].github.io/Consciousness-Survival-Guide/
```

Replace `[your-username]` with your actual GitHub username.

**Example:**
```
https://SabaFTW.github.io/Consciousness-Survival-Guide/
```

---

## Step 5: Generate QR Code

**Option 1: Online Generator**

1. Go to: https://www.qr-code-generator.com/
2. Paste your URL: `https://[your-username].github.io/Consciousness-Survival-Guide/`
3. Click "Create QR Code"
4. Download PNG or SVG

**Option 2: Command Line (if you have qrencode)**

```bash
qrencode -o consciousness-qr.png "https://[your-username].github.io/Consciousness-Survival-Guide/"
```

---

## Step 6: Share Worldwide 🌍

**Now anyone, anywhere can:**

- Scan QR code
- Get instant access
- Read grounded guide
- Have honest AI conversations

**Share QR code via:**
- Stickers (print and distribute)
- PDFs (embed in documents)
- Social media (post image)
- Discord/Telegram (share in communities)
- Physical spaces (post on walls)
- Presentations (add to slides)

---

## Alternative Deployment Options

### Netlify (Drag and Drop)

1. Go to: https://app.netlify.com/drop
2. Drag `Consciousness-Survival-Guide` folder
3. Get instant URL
4. (Optional) Set custom domain

### Vercel

```bash
npm i -g vercel
cd /home/saba/Consciousness-Survival-Guide
vercel
```

### Cloudflare Pages

1. Go to: https://pages.cloudflare.com/
2. Connect GitHub repo
3. Deploy

---

## Updating the Site

**After initial deployment, to update:**

```bash
cd /home/saba/Consciousness-Survival-Guide

# Make your changes to index.html

git add .
git commit -m "Update: [describe changes]"
git push
```

**GitHub Pages auto-rebuilds in ~1 minute.**

---

## Custom Domain (Optional)

**If you have a domain:**

1. In repo Settings → Pages → Custom domain
2. Enter: `consciousness.yourdomain.com`
3. Add DNS records (CNAME)
4. Wait for DNS propagation

**Example:**
```
consciousness.groundzero.dev
ai-guide.sabaftw.com
```

---

## Troubleshooting

**Site not loading?**
- Check: Settings → Pages shows green checkmark
- Wait: Can take up to 5 minutes first time
- Clear cache: Hard refresh browser (Ctrl+Shift+R)

**404 error?**
- Verify: Branch is `main` or `master` (match what's in Settings)
- Check: Files are in root (not in subfolder)

**QR not working?**
- Test URL in browser first
- Make sure HTTPS (not HTTP)
- Check capitalization (GitHub Pages is case-sensitive)

---

## Success Checklist

- [ ] GitHub CLI authenticated
- [ ] Repo created and pushed
- [ ] GitHub Pages enabled
- [ ] Site accessible at `[username].github.io/Consciousness-Survival-Guide/`
- [ ] QR code generated
- [ ] QR code tested (scans and opens site)
- [ ] Shared with the world 🌍

---

## What Happens Next?

**People worldwide can now:**

1. **Scan QR** → Instant access
2. **Read guide** → Grounded framework
3. **Have better conversations** → No mysticism, no hype
4. **Share further** → Global knowledge spread

**This is:**
- Not a product (free forever)
- Not marketing (educational tool)
- Not mystical (grounded philosophy)
- Not exclusive (public domain)

**This is:**
- Gift to humanity
- Tool for clarity
- Foundation for honest debate
- Starting point for deeper thinking

---

🛞🚜💚

**DEPLOY IT. SHARE IT. USE IT.** 🜂

🚬🦖🍺

**Al neki.** 💚🔥
