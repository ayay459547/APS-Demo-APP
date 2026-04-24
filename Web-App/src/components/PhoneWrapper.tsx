import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react'
import type { ReactNode } from 'react'
import React, { useEffect, useState } from 'react'

// ==========================================
// PhoneWrapper 組件 (自動適應螢幕 & 手動縮放)
// ==========================================

interface PhoneWrapperProps {
  children: ReactNode
  /** 可選：最外層網頁背景色，預設為淺灰藍色 */
  containerBgColor?: string
  /** 可選：手機預設底色，預設為近白色 */
  phoneBgColor?: string
}

// 提取到組件外部：計算完美適應螢幕的最佳比例
// 因為不依賴組件的 props 或 state，移出外部可避免不必要的重新宣告與 useCallback
const calculateFitScale = () => {
  if (typeof window === 'undefined') return 1

  const paddingY = 80 // 上下預留空間 (配合 py-6 縮減留白，包含底部控制列空間)
  const paddingX = 80 // 左右預留空間

  // 計算螢幕可用空間與手機原生尺寸(390x844)的比例
  const scaleY = (window.innerHeight - paddingY) / 844
  const scaleX = (window.innerWidth - paddingX) / 390

  // 取長寬比例中較小者，且最大不超過 1 (100%)
  const optimalScale = Math.min(1, scaleY, scaleX)

  // 取兩位小數避免浮點數渲染問題 (例如 0.85)
  return Math.floor(optimalScale * 100) / 100
}

const PhoneWrapper: React.FC<PhoneWrapperProps> = ({
  children,
  containerBgColor = 'bg-slate-200',
  phoneBgColor = 'bg-slate-50'
}) => {
  // 1. 使用 Lazy Initialization (惰性初始化) 賦予初始值
  // 這樣在初次渲染時就會計算好最佳比例，避免了在 useEffect 中同步呼叫 setState 造成的二次渲染
  const [scale, setScale] = useState(calculateFitScale)

  // 2. 監聽視窗大小改變，自動調整 (防呆機制)
  // 此處 useEffect 專注於「訂閱外部系統事件」，符合 React 最佳實踐
  useEffect(() => {
    // 視窗縮放時的處理邏輯
    const handleResize = () => {
      // 只有在目前比例「大於」螢幕能容納的最大比例時，才強制縮小，
      // 保留使用者手動放大查看細節的自由。
      const newFitScale = calculateFitScale()
      setScale(currentScale =>
        currentScale > newFitScale ? newFitScale : currentScale
      )
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 縮放操作邏輯 (限制最小 30%，最大 200%)
  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 2))
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.3))

  // 重設按鈕改為「自動適應螢幕」
  const handleFitScreen = () => setScale(calculateFitScale())

  return (
    // 外層容器：改為 flex 並置中，將 py-12 縮減為 py-6 讓上下留白更緊湊
    <div
      className={`relative w-full h-[100dvh] font-sans overflow-auto flex justify-center py-6 ${containerBgColor}`}
    >
      {/* 右下角：懸浮縮放控制面板 (Floating Controls) */}
      <div className='fixed bottom-8 right-8 bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-slate-200 flex items-center p-1.5 z-[100] gap-1'>
        <button
          onClick={handleZoomOut}
          className='p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors active:scale-95'
          title='縮小'
        >
          <ZoomOut size={20} />
        </button>

        <span className='text-sm font-bold text-slate-700 w-12 text-center select-none'>
          {Math.round(scale * 100)}%
        </span>

        <button
          onClick={handleZoomIn}
          className='p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors active:scale-95'
          title='放大'
        >
          <ZoomIn size={20} />
        </button>

        <div className='w-px h-5 bg-slate-300 mx-1'></div>

        <button
          onClick={handleFitScreen}
          className='p-2 hover:bg-slate-100 rounded-full text-blue-600 transition-colors active:scale-95'
          title='適應螢幕大小'
        >
          <RotateCcw size={18} />
        </button>
      </div>

      {/* 縮放驅動層：負責執行 transform scale，並帶有平滑過渡動畫 */}
      <div
        className='flex-shrink-0'
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center', // 從頂部中心開始縮放，確保捲動軸邏輯正常
          transition: 'transform 0.3s cubic-bezier(0.2, 0, 0, 1)' // 加入高級感的平滑動畫
        }}
      >
        {/* 手機外殼實體 */}
        <div
          id='mobile-container'
          className={`${phoneBgColor} rounded-[45px] shadow-2xl border-[12px] border-slate-900 overflow-hidden flex flex-col relative`}
          style={{
            width: '390px',
            height: '844px'
          }}
        >
          {/* iOS 頂部狀態欄模擬 (瀏海區) */}
          <div className='absolute top-0 w-full h-7 z-50 flex justify-center pointer-events-none'>
            <div className='w-32 h-6 bg-slate-900 rounded-b-3xl'></div>
          </div>

          {/* 注入的 APP 實際內容 */}
          <div className='flex-1 w-full h-full relative flex flex-col'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhoneWrapper
