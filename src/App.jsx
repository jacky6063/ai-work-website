import React, { useState, useEffect, useRef } from 'react'
import './App.css'

// 使用網址連結的圖片
const aiImageTeachingImg = "https://pshop.myqr.com.tw/qrssimage/GoodsPublicImage/4/4675.png?97"
const aiPlatformImg = "https://pshop.myqr.com.tw/qrssimage/GoodsPublicImage/4/4676.png?97"

// YouTube視頻ID提取函數
const getYouTubeVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}

// 首頁YouTube播放器組件 - 19:6容器，16:9影片居中，無文字覆蓋
const HomeYouTubePlayer = ({ videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const iframeRef = useRef(null)
  const videoId = getYouTubeVideoId(videoUrl)
  
  if (!videoId) {
    return <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">無效的YouTube連結</div>
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&showinfo=0&enablejsapi=1`

  const togglePlay = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current
      if (isPlaying) {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
      } else {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current
      if (isMuted) {
        iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*')
      } else {
        iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*')
      }
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="w-full h-full bg-gray-900 relative">
      {/* 19:6容器，YouTube影片在中間16:9區域 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-none" style={{ aspectRatio: '16/9' }}>
          <iframe
            ref={iframeRef}
            src={embedUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="首頁影片"
          />
        </div>
      </div>
      
      {/* 自定義控制按鈕 */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <button
          onClick={togglePlay}
          className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300"
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
        
        <button
          onClick={toggleMute}
          className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300"
        >
          {isMuted ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

// 客戶案例YouTube播放器組件 - 自動播放循環，每個影片都有控制按鈕
const CaseYouTubePlayer = ({ videoUrl, aspectRatio = "aspect-[9/16]" }) => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const iframeRef = useRef(null)
  const videoId = getYouTubeVideoId(videoUrl)
  
  if (!videoId) {
    return <div className="w-full h-48 bg-gray-200 flex items-center justify-center">無效的YouTube連結</div>
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&showinfo=0&enablejsapi=1`

  const togglePlay = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current
      if (isPlaying) {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
      } else {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current
      if (isMuted) {
        iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*')
      } else {
        iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*')
      }
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className={`w-full ${aspectRatio} relative group`}>
      {/* 顯示縮圖作為背景 */}
      <img 
        src={thumbnailUrl} 
        alt="影片縮圖" 
        className="absolute inset-0 w-full h-full object-cover rounded-lg"
      />
      
      {/* 自動播放的iframe覆蓋在縮圖上 */}
      <iframe
        ref={iframeRef}
        src={embedUrl}
        className="absolute inset-0 w-full h-full rounded-lg opacity-90 hover:opacity-100 transition-opacity duration-300"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="客戶案例影片"
      />
      
      {/* 每個影片的控制按鈕 */}
      <div className="absolute bottom-2 right-2 flex space-x-1">
        <button
          onClick={togglePlay}
          className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-1.5 rounded-full transition-all duration-300 z-10"
        >
          {isPlaying ? (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
        
        <button
          onClick={toggleMute}
          className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-1.5 rounded-full transition-all duration-300 z-10"
        >
          {isMuted ? (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>
      </div>
      
      {/* YouTube連結 */}
      <a 
        href={videoUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs hover:bg-opacity-70 transition-all duration-300 z-10"
      >
        YouTube
      </a>
    </div>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'cases', 'about', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 導航欄 */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold text-gray-900">傳啟資訊(AI-Work)</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: '首頁' },
                { id: 'services', label: '服務項目' },
                { id: 'cases', label: '客戶案例' },
                { id: 'about', label: '關於我們' },
                { id: 'contact', label: '聯絡我們' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="md:hidden">
              <button className="text-gray-700 hover:text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 首頁區塊 - 19:8比例容器，增加高度解決裁切問題 */}
      <section id="home" className="relative">
        {/* 桌面版 - 19:8比例，增加高度 */}
        <div className="hidden md:block w-full aspect-[19/8]">
          <HomeYouTubePlayer videoUrl="https://youtu.be/KRpcECneL1w" />
        </div>
        
        {/* 手機版 - 19:12比例，確保YouTube影片完整顯示 */}
        <div className="md:hidden w-full aspect-[19/12]">
          <HomeYouTubePlayer videoUrl="https://youtu.be/KRpcECneL1w" />
        </div>
      </section>

      {/* 服務項目 */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">服務項目</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              我們提供專業的AI影像創作服務，從教學到平台解決方案
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* AI影像教學 */}
            <div className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-lg mb-6 transform group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={aiImageTeachingImg}
                  alt="AI影像教學" 
                  className="w-full h-64 object-cover"
                  onLoad={() => console.log('AI影像教學圖片載入成功')}
                  onError={(e) => {
                    console.error('AI影像教學圖片載入失敗')
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDQwMCAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjU2IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTI4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QkEwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiI+QUkg5b2x5YOP5pWZ5a24PC90ZXh0Pgo8L3N2Zz4K'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI影像教學</h3>
              <p className="text-gray-600 mb-6">
                專業的AI影像創作課程，從基礎概念到進階應用，讓您掌握最前沿的人工智慧影像技術。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">專業教學</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">實作導向</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">個人指導</span>
              </div>
            </div>

            {/* AI智慧平台 */}
            <div className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-lg mb-6 transform group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={aiPlatformImg}
                  alt="AI智慧平台" 
                  className="w-full h-64 object-cover"
                  onLoad={() => console.log('AI智慧平台圖片載入成功')}
                  onError={(e) => {
                    console.error('AI智慧平台圖片載入失敗')
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDQwMCAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjU2IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTI4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QkEwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiI+QUkg5pm65oWn5bmz5Y+wPC90ZXh0Pgo8L3N2Zz4K'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI智慧平台</h3>
              <p className="text-gray-600 mb-6">
                企業級AI智慧平台解決方案，提升生產力與決策效率，協助企業數位轉型。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">企業解決方案</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">客製化服務</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">技術支援</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 客戶案例 - 自動播放循環 */}
      <section id="cases" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">客戶案例</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              看看我們如何幫助客戶實現AI影像創作的目標
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "https://youtube.com/shorts/mTLuEUkyrvM?feature=share",
              "https://youtube.com/shorts/oRoDKVNzPPs?feature=share", 
              "https://youtube.com/shorts/FezHCB8zjvY?feature=share",
              "https://youtube.com/shorts/DqvZGT7ZWwA?feature=share"
            ].map((videoUrl, index) => (
              <div key={index} className="group">
                <CaseYouTubePlayer 
                  videoUrl={videoUrl} 
                  aspectRatio="aspect-[9/16]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 關於我們 - 單欄佈局，更新文字內容 */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">關於傳啟資訊</h2>
            
            <div className="text-lg text-gray-600 leading-relaxed space-y-6 max-w-3xl mx-auto">
              <p>
                AI-Work 是專為企業設計的智慧生產力平台，透過人工智慧驅動 流程自動化、跨部門協作與數據洞察，協助組織全面提升效率與決策力。
              </p>
              
              <p className="text-xl font-semibold text-blue-600">
                我們的使命是：「讓企業更智慧，讓價值更長遠。」
              </p>
              
              <p>
                無論是 專案管理、營運優化、行銷企劃，或人力資源管理，AI-Work 皆能提供客製化解決方案，協助企業專注於創新與成長。
              </p>
              
              <p className="text-xl font-bold text-gray-900">
                AI-Work，不只是平台，而是智慧企業的加速引擎
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 聯絡我們 */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">聯絡我們</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              準備開始您的AI影像創作之旅嗎？立即與我們聯繫
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">電話聯絡</h3>
              <p className="text-gray-300">0905657062</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">電子郵件</h3>
              <p className="text-gray-300">jacky6063@gmail.com</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">服務時間</h3>
              <p className="text-gray-300">週一至週五 9:00-18:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* 底部導航 (手機版) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-5">
          {[
            { id: 'home', label: '首頁', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
            { id: 'services', label: '服務項目', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
            { id: 'cases', label: '客戶案例', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
            { id: 'about', label: '關於我們', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
            { id: 'contact', label: '聯絡我們', icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-1 ${
                activeSection === item.id ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
