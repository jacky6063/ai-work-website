# 傳啟資訊(AI-Work) - AI影像創作服務網站

## 專案概述

這是一個專為傳啟資訊(AI-Work)設計的專業AI影像創作服務網站，展示公司的核心服務和客戶案例。

## 功能特色

### 🎬 視頻播放功能
- **首屏視頻區塊**：16:9比例的YouTube嵌入式播放器
- **客戶案例視頻**：9:16比例的YouTube短影片展示
- **智能播放控制**：縮圖預覽、播放按鈕、外部連結
- **自動播放支援**：在嵌入模式下支援自動播放和循環

### 📱 響應式設計
- **多設備適配**：完美支援手機、平板、桌面設備
- **現代化UI**：使用Tailwind CSS和shadcn/ui組件
- **流暢動畫**：懸停效果、平滑過渡、微互動
- **深色模式**：支援明暗主題切換

### 🧭 導航系統
- **智能導航**：自動檢測當前區段並高亮顯示
- **平滑滾動**：點擊導航項目平滑滾動到對應區段
- **雙重導航**：桌面版頂部導航 + 手機版底部導航
- **響應式選單**：手機版可展開/收合的導航選單

### 📋 內容區塊
1. **首頁區段**：品牌介紹和主要CTA按鈕
2. **服務項目**：AI影像教學和AI智慧平台
3. **客戶案例**：四個YouTube短影片案例展示
4. **關於我們**：公司介紹和核心價值
5. **聯絡我們**：聯絡資訊和CTA按鈕

## 技術架構

### 前端技術棧
- **React 18**：現代化前端框架
- **Vite**：快速建置工具
- **Tailwind CSS**：實用優先的CSS框架
- **shadcn/ui**：高品質UI組件庫
- **Lucide Icons**：現代化圖標庫
- **Framer Motion**：動畫庫（預安裝）

### 專案結構
```
ai-work-website/
├── public/                 # 靜態資源
├── src/
│   ├── assets/            # 圖片和媒體資源
│   │   ├── AI影像教學圖片.png
│   │   └── AI智慧平台圖片.png
│   ├── components/        # React組件
│   │   └── ui/           # UI組件庫
│   ├── App.jsx           # 主應用組件
│   ├── App.css           # 樣式文件
│   ├── index.css         # 全局樣式
│   └── main.jsx          # 應用入口點
├── index.html            # HTML模板
├── package.json          # 專案配置
└── vite.config.js        # Vite配置
```

## YouTube視頻整合

### 首屏廣告視頻
- **網址**：https://youtu.be/KRpcECneL1w
- **比例**：16:9
- **功能**：縮圖預覽、嵌入播放、外部連結

### 客戶案例視頻
1. **案例1**：https://youtube.com/shorts/mTLuEUkyrvM?feature=share
2. **案例2**：https://youtube.com/shorts/oRoDKVNzPPs?feature=share
3. **案例3**：https://youtube.com/shorts/FezHCB8zjvY?feature=share
4. **案例4**：https://youtube.com/shorts/DqvZGT7ZWwA?feature=share

所有視頻都支援：
- 縮圖預覽模式
- 點擊播放切換到嵌入式播放器
- 外部連結直接跳轉YouTube
- 9:16直式比例顯示

## 開發指令

### 安裝依賴
```bash
npm install
```

### 開發模式
```bash
npm run dev
```

### 建置生產版本
```bash
npm run build
```

### 預覽生產版本
```bash
npm run preview
```

## 部署說明

本專案已配置為可直接部署到各種靜態網站託管平台：

1. **Vercel**：推薦選擇，零配置部署
2. **Netlify**：支援自動部署和表單處理
3. **GitHub Pages**：免費靜態網站託管
4. **其他平台**：任何支援靜態網站的平台

## 瀏覽器支援

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 授權資訊

© 2024 傳啟資訊股份有限公司 (AI-Work)
保留所有權利。

---

**開發團隊**：Manus AI Agent
**完成日期**：2024年12月
**版本**：1.0.0
