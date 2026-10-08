// 到 Firebase Console → 專案設定 → 你的應用程式(Web) 複製設定貼到這裡。
// 這些值本來就會公開在前端(apiKey 只是識別碼),安全性靠 firestore.rules 與網域限制,見 README。
// 沒填(保持 YOUR_...)時,網站會用瀏覽器本機儲存(不會同步)。

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
