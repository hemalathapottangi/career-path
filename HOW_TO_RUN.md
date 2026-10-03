# How to Run CareerPath

## ⚠️ Important: OneDrive Issue
The project is inside OneDrive which blocks npm from creating symlinks.
**Run these steps exactly as shown.**

---

## Step 1 — Pause OneDrive Sync
1. Right-click the OneDrive icon in the system tray (bottom-right)
2. Click **"Pause syncing" → 2 hours**

---

## Step 2 — Install Server Dependencies
Open a terminal (PowerShell or Command Prompt):
```
cd "C:\Users\hemal\OneDrive\Desktop\career-path2\server"
npm install
```

---

## Step 3 — Install Client Dependencies
In the same or a new terminal:
```
cd "C:\Users\hemal\OneDrive\Desktop\career-path2\client"
npm install
```

---

## Step 4 — Start the Server
Open **Terminal 1**:
```
cd "C:\Users\hemal\OneDrive\Desktop\career-path2\server"
node server.js
```
You should see:
```
⚠️  No valid MONGO_URI found. Running in localStorage/memory fallback mode.
🚀 CareerPath server running on http://localhost:5000
```

---

## Step 5 — Start the Client
Open **Terminal 2**:
```
cd "C:\Users\hemal\OneDrive\Desktop\career-path2\client"
npm run dev
```
You should see:
```
  VITE v4.x  ready in 300ms
  ➜  Local:   http://localhost:5173/
```

---

## Step 6 — Open in Browser
Go to: **http://localhost:5173**

---

## No MongoDB? No Problem!
The server runs in **memory fallback mode** automatically.
All data is stored in RAM (resets on restart) — perfect for demo/testing.

To use MongoDB Atlas (optional):
1. Create free account at https://cloud.mongodb.com
2. Copy `.env.example` to `.env` in the `server/` folder
3. Paste your MongoDB URI into `MONGO_URI=`

---

## Credentials (after registering)
- Register at http://localhost:5173/register
- Use any email + password (min 6 chars)

---

## Quick Summary
| Terminal | Command |
|----------|---------|
| Terminal 1 | `cd server && node server.js` |
| Terminal 2 | `cd client && npm run dev` |
| Browser | http://localhost:5173 |
