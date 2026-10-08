# 王團撿寶輪替表

純靜態網站(HTML/CSS/JS),前端放 GitHub Pages,資料存 Firebase Firestore。

## 檔案
- `index.html` / `style.css` / `app.js` — 網站本體
- `data.js` — 寶物、輪替順序與初始「下一位」(圖片檔名也在這)
- `firebase-config.js` — 貼上你的 Firebase 設定
- `firestore.rules` — 資料庫規則(免登入,但只能寫 `next`)
- `images/` — 寶物圖片

## 資料怎麼存
- 進度存在 Firestore,所有人即時同步,不需登入。未設定 Firebase 時退回瀏覽器本機儲存。
- 想改預設起點:編輯 `data.js` 的 `next`(輪替順序的索引,0 起算)。

## 設定 Firebase(一次就好)
1. [Firebase Console](https://console.firebase.google.com) 建立專案 → 新增 Web 應用程式 → 把 config 貼進 `firebase-config.js`
2. Build → Authentication → Sign-in method → 啟用 **Anonymous(匿名)**。訪客不會看到任何登入畫面。
   同頁 Settings → Authorized domains 加入 `<你的帳號>.github.io`
3. Build → Firestore Database → 建立資料庫
4. Rules 分頁貼上 `firestore.rules` 內容並發布
5. **設定通關密語**:Firestore Data → 開始集合,集合 ID 填 `passwords`,
   文件 ID 填你的密語(如 `maple2026`,不可含 `/`),隨意加一個欄位(例如 `ok` = true)。
   想換密語就改文件 ID、想多組就多建幾份。

## API Key 公開在 GitHub 安全嗎?
Firebase 網頁的 `apiKey` 只是專案識別碼,不是密碼,設計上就會公開。真正的防線:
- `firestore.rules`:沒過密語就不能寫;密語清單 `passwords` 前端完全讀不到。
- 到 [Google Cloud Console → API 和服務 → 憑證](https://console.cloud.google.com/apis/credentials),
  點該 Browser key → 應用程式限制選「HTTP 參照網址」,加入 `https://<你的帳號>.github.io/*`
  (本機測試再加 `http://localhost:8000/*`)。
- 密語請取長一點的,因為規則無法限制嘗試次數。
- 真正的祕密(服務帳戶金鑰等)絕對不要放進 repo。

## 本機預覽
```bash
python3 -m http.server 8000
```

## 部署
推到 GitHub → Settings → Pages → Branch 選 `main` / root。

## 圖片
放進 `images/`:`life-grindstone.png`、`dark-box.png`、`life-box.png`、`white-jade-box.png`、`faith-grindstone.png`、`eternal-box.png`
