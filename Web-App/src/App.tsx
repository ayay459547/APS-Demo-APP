import {
  Badge,
  Button,
  Card,
  ConfigProvider,
  Divider,
  Drawer,
  Input,
  InputNumber,
  List,
  message,
  Progress,
  Segmented,
  Select,
  Space,
  Spin,
  Switch,
  Tag,
  Typography
} from 'antd'
import {
  AlertCircle,
  AlertTriangle,
  ArrowRightLeft,
  Bell,
  Calendar,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Factory,
  Home,
  Layers,
  Lock,
  LogOut,
  Package,
  PencilLine,
  PlayCircle,
  Search,
  Settings,
  ShieldCheck,
  Smartphone,
  User,
  UserCircle,
  Volume2,
  X,
  XCircle
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import {
  initialNotifications,
  initialOrders,
  initialSchedules
} from './mockData'

import PhoneWrapper from '@/components/PhoneWrapper.tsx'

const { TextArea } = Input
const { Text } = Typography

// ==========================================
// 主程式 App 組件
// ==========================================
export default function App() {
  // --- 系統狀態 ---
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  // --- 導覽與 UI 狀態 ---
  const [navTab, setNavTab] = useState('board')
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const [detailModalOpen, setDetailModalOpen] = useState(false) // 工單詳細資訊 Drawer
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [issueModalOpen, setIssueModalOpen] = useState(false)
  const [changeoverModalOpen, setChangeoverModalOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false) // 個人設定 Drawer
  const [systemVersionOpen, setSystemVersionOpen] = useState(false) // 系統版本 Drawer

  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  // --- 表單資料狀態 ---
  const [reportData, setReportData] = useState({ completed: 0, scrap: 0 })
  const [issueData, setIssueData] = useState({
    type: '',
    machine: '',
    description: '',
    hasPhoto: false
  })
  const [changeoverData, setChangeoverData] = useState({
    targetMachine: null,
    reason: '',
    notes: ''
  })

  // --- 列表分頁資料狀態 (Load More) ---
  const [schedules, setSchedules] = useState(initialSchedules)
  const [loadingSchedules, setLoadingSchedules] = useState(false)

  const [notifications, setNotifications] = useState(initialNotifications)
  const [loadingNotifications, setLoadingNotifications] = useState(false)

  // 設定 Antd 全域 Message
  useEffect(() => {
    message.config({
      getContainer: () =>
        document.getElementById('mobile-container') || document.body,
      top: isLoggedIn ? 50 : 20,
      maxCount: 3
    })
  }, [isLoggedIn])

  // --- 商業邏輯 ---
  const handleLogin = () => {
    setIsLoggingIn(true)
    setTimeout(() => {
      setIsLoggingIn(false)
      setIsLoggedIn(true)
      setNavTab('board')
      message.success('登入成功，歡迎回來')
    }, 1200)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setNavTab('board')
    message.info('已安全登出系統')
  }

  const loadMoreSchedules = () => {
    setLoadingSchedules(true)
    setTimeout(() => {
      setSchedules(prev => [
        ...prev,
        {
          id: `S${prev.length + 1}`,
          machine: 'M-04',
          product: '面板驅動 IC',
          status: 'pending',
          time: '16:00 - 20:00'
        },
        {
          id: `S${prev.length + 2}`,
          machine: 'M-05',
          product: '電源管理 IC',
          status: 'pending',
          time: '18:00 - 22:00'
        }
      ])
      setLoadingSchedules(false)
    }, 800)
  }

  const loadMoreNotifications = () => {
    setLoadingNotifications(true)
    setTimeout(() => {
      setNotifications(prev => [
        ...prev,
        {
          id: `N${prev.length + 1}`,
          type: 'success',
          title: '換線完成',
          time: '昨天 10:00',
          desc: 'M-01 機台已完成治具更換，恢復生產。'
        },
        {
          id: `N${prev.length + 2}`,
          type: 'info',
          title: '系統更新',
          time: '前天 09:00',
          desc: 'APS 排程引擎已更新至 v2.1.0，演算法效能提升。'
        },
        {
          id: `N${prev.length + 3}`,
          type: 'error',
          title: '人員缺勤',
          time: '前天 08:30',
          desc: '早班作業員 A 請假，已自動重新指派機台負責人。'
        }
      ])
      setLoadingNotifications(false)
    }, 800)
  }

  const filteredOrders = useMemo(() => {
    return initialOrders.filter(order => {
      const matchStatus = activeTab === 'all' || order.status === activeTab
      const matchSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.product.toLowerCase().includes(searchQuery.toLowerCase())
      return matchStatus && matchSearch
    })
  }, [activeTab, searchQuery])

  // --- UI Render Helpers ---
  const renderStatusTag = (status: string) => {
    switch (status) {
      case 'normal':
        return (
          <Tag
            color='success'
            icon={<CheckCircle2 size={12} className='mr-1 inline' />}
          >
            正常
          </Tag>
        )
      case 'delayed':
        return (
          <Tag
            color='warning'
            icon={<AlertTriangle size={12} className='mr-1 inline' />}
          >
            延遲
          </Tag>
        )
      case 'abnormal':
        return (
          <Tag
            color='error'
            icon={<XCircle size={12} className='mr-1 inline' />}
          >
            異常
          </Tag>
        )
      case 'completed':
        return (
          <Tag
            color='default'
            icon={<CheckCircle2 size={12} className='mr-1 inline' />}
          >
            完工
          </Tag>
        )
      default:
        return null
    }
  }

  const renderCloseBtn = (onClose: () => void) => (
    <button
      onClick={onClose}
      className='text-slate-400 bg-slate-100 p-1.5 rounded-full hover:bg-slate-200 transition-colors'
    >
      <X size={20} />
    </button>
  )

  const headerTitle = {
    board: 'APS 行動看板',
    schedule: '生產排程',
    notification: '系統通知',
    profile: '我的中心'
  }[navTab]

  // ==========================================
  // 畫面：登入頁面 (Login View - 淺色主題)
  // ==========================================
  if (!isLoggedIn) {
    return (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#2563eb',
            borderRadius: 8,
            fontFamily: 'inherit'
          }
        }}
      >
        <PhoneWrapper
          containerBgColor='bg-slate-200'
          phoneBgColor='bg-slate-50'
        >
          <div className='flex-1 flex flex-col justify-center px-8 relative overflow-hidden bg-slate-50 h-full'>
            <div className='absolute top-[-10%] left-[-20%] w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none'></div>
            <div className='absolute bottom-[-10%] right-[-20%] w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none'></div>

            <div className='z-10 w-full flex flex-col items-center mb-12'>
              <div className='w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/40 mb-6'>
                <Factory size={40} className='text-white' />
              </div>
              <h1 className='text-3xl font-bold text-slate-800 mb-2 tracking-wider'>
                APS App Demo
              </h1>
              <p className='text-slate-500 text-sm'>行動智能製造管理系統</p>
            </div>

            <div className='z-10 space-y-5 bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50'>
              <div>
                <label className='block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider'>
                  員工編號
                </label>
                <Input
                  size='large'
                  prefix={
                    <UserCircle size={18} className='text-slate-400 mr-2' />
                  }
                  defaultValue='EMP-1234'
                  className='bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 focus:bg-white rounded-xl h-12 text-lg font-medium placeholder:text-slate-400'
                />
              </div>
              <div>
                <label className='block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider'>
                  登入密碼
                </label>
                <Input.Password
                  size='large'
                  prefix={<Lock size={18} className='text-slate-400 mr-2' />}
                  defaultValue='123456'
                  className='bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 focus:bg-white rounded-xl h-12 text-lg font-medium'
                />
              </div>

              <Button
                type='primary'
                size='large'
                block
                loading={isLoggingIn}
                onClick={handleLogin}
                className='mt-4 h-14 rounded-xl shadow-lg shadow-blue-600/40 font-bold text-lg border-none'
              >
                系統登入
              </Button>
            </div>

            <div className='absolute bottom-8 w-full text-center left-0 z-10 text-slate-400 text-xs'>
              版權所有 © 2026 先進製造科技
            </div>
          </div>
        </PhoneWrapper>
      </ConfigProvider>
    )
  }

  // ==========================================
  // 畫面：系統內部 (Main App View)
  // ==========================================
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2563eb',
          borderRadius: 8,
          fontFamily: 'inherit'
        }
      }}
    >
      <PhoneWrapper>
        {/* Navbar */}
        <div className='bg-white pt-12 pb-4 px-5 text-slate-800 flex justify-center items-center z-40 rounded-b-2xl shadow-sm border-b border-slate-100 shrink-0'>
          <h1 className='text-lg font-bold tracking-wider m-0'>
            {headerTitle}
          </h1>
        </div>

        {/* 內容區塊 */}
        <div className='flex-1 overflow-hidden relative flex flex-col bg-slate-50'>
          {/* ================= 看板 View ================= */}
          {navTab === 'board' && (
            <>
              <div className='px-5 pt-5 pb-2 z-30 shrink-0'>
                <Input
                  size='large'
                  placeholder='搜尋工單、產品或機台...'
                  prefix={<Search size={18} className='text-slate-400' />}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className='rounded-full mb-4'
                />
                <Segmented
                  block
                  value={activeTab}
                  onChange={setActiveTab}
                  options={[
                    { value: 'all', label: '全部' },
                    { value: 'normal', label: '進行中' },
                    { value: 'delayed', label: '延遲' },
                    { value: 'abnormal', label: '異常' }
                  ]}
                  className='bg-slate-200 p-1 rounded-xl font-medium'
                />
              </div>

              <div className='flex-1 overflow-y-auto px-5 pb-24 pt-2 space-y-4 scrollbar-hide'>
                {filteredOrders.length === 0 ? (
                  <div className='flex flex-col items-center justify-center h-40 text-slate-400'>
                    <AlertCircle size={32} className='mb-2' />
                    <p>找不到符合的工單</p>
                  </div>
                ) : (
                  filteredOrders.map(order => (
                    <Card
                      key={order.id}
                      className='rounded-2xl shadow-sm border-slate-100'
                      styles={{ body: { padding: '16px' } }}
                    >
                      <div className='flex justify-between items-start mb-2'>
                        <div>
                          <h2 className='text-slate-800 font-bold text-base m-0'>
                            {order.id}
                          </h2>
                          <p className='text-slate-500 text-xs mt-0.5 m-0'>
                            {order.product} | {order.machine}
                          </p>
                        </div>
                        {renderStatusTag(order.status)}
                      </div>
                      <div className='mt-4'>
                        <div className='flex justify-between text-xs text-slate-500 mb-1'>
                          <span>生產進度</span>
                          <span className='font-bold text-blue-600'>
                            {order.progress}%
                          </span>
                        </div>
                        <Progress
                          percent={order.progress}
                          showInfo={false}
                          strokeColor={
                            order.status === 'abnormal'
                              ? '#ef4444'
                              : order.status === 'delayed'
                                ? '#f97316'
                                : '#2563eb'
                          }
                        />
                      </div>
                      <div className='mt-4 pt-3 border-t border-slate-100 flex justify-between items-center'>
                        <Button
                          type='link'
                          size='small'
                          className='px-0 text-slate-400 hover:text-slate-600 flex items-center'
                          onClick={() => {
                            setSelectedOrder(order)
                            setDetailModalOpen(true)
                          }}
                        >
                          詳細資訊 <ChevronRight size={14} />
                        </Button>
                        <Space>
                          <Button
                            size='small'
                            shape='round'
                            icon={<ArrowRightLeft size={14} />}
                            disabled={order.status === 'completed'}
                            onClick={() => {
                              setSelectedOrder(order)
                              setChangeoverData({
                                targetMachine: null,
                                reason: '',
                                notes: ''
                              })
                              setChangeoverModalOpen(true)
                            }}
                            className='flex items-center text-slate-600 bg-slate-50'
                          >
                            換線
                          </Button>
                          <Button
                            type='primary'
                            size='small'
                            shape='round'
                            ghost
                            icon={<PencilLine size={14} />}
                            disabled={order.status === 'completed'}
                            onClick={() => {
                              setSelectedOrder(order)
                              setReportData({ completed: 0, scrap: 0 })
                              setReportModalOpen(true)
                            }}
                            className='flex items-center'
                          >
                            回報
                          </Button>
                        </Space>
                      </div>
                    </Card>
                  ))
                )}
              </div>

              <div className='absolute bottom-24 right-5 z-40'>
                <Button
                  type='primary'
                  danger
                  shape='circle'
                  icon={<AlertTriangle size={24} />}
                  onClick={() => {
                    setIssueData({
                      type: '',
                      machine: '',
                      description: '',
                      hasPhoto: false
                    })
                    setIssueModalOpen(true)
                  }}
                  style={{ width: 56, height: 56 }}
                  className='shadow-lg shadow-red-500/40 flex items-center justify-center border-none'
                />
              </div>
            </>
          )}

          {/* ================= 排程 View ================= */}
          {navTab === 'schedule' && (
            <div className='flex-1 overflow-y-auto px-5 pb-24 pt-6 scrollbar-hide'>
              <h3 className='text-sm font-bold text-slate-500 mb-4 flex items-center'>
                <Calendar size={16} className='mr-2' /> 執行中與待命排程
              </h3>
              <div className='space-y-4 border-l-2 border-slate-200 ml-2 pl-4'>
                {schedules.map(schedule => (
                  <div key={schedule.id} className='relative'>
                    <div
                      className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white ${
                        schedule.status === 'processing'
                          ? 'bg-blue-500'
                          : schedule.status === 'abnormal'
                            ? 'bg-red-500'
                            : schedule.status === 'delayed'
                              ? 'bg-orange-500'
                              : 'bg-slate-300'
                      }`}
                    ></div>
                    <Card
                      size='small'
                      className={`border-slate-200 shadow-sm rounded-xl ${schedule.status === 'pending' ? 'opacity-60' : ''}`}
                    >
                      <div className='flex justify-between items-start'>
                        <div className='font-bold text-slate-800'>
                          {schedule.machine}{' '}
                          <span className='text-slate-500 font-normal ml-1'>
                            {schedule.product}
                          </span>
                        </div>
                        {schedule.status === 'processing' && (
                          <Tag color='processing' className='m-0'>
                            執行中
                          </Tag>
                        )}
                        {schedule.status === 'pending' && (
                          <Tag className='m-0'>待執行</Tag>
                        )}
                        {schedule.status === 'abnormal' && (
                          <Tag color='error' className='m-0'>
                            異常
                          </Tag>
                        )}
                        {schedule.status === 'delayed' && (
                          <Tag color='warning' className='m-0'>
                            延遲
                          </Tag>
                        )}
                      </div>
                      <div className='text-xs text-slate-500 mt-2 flex items-center bg-slate-50 inline-block px-2 py-1 rounded-md'>
                        <Clock size={12} className='mr-1 inline' />{' '}
                        {schedule.time}
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
              <div className='mt-8 mb-4 text-center'>
                <Button
                  type='dashed'
                  block
                  shape='round'
                  onClick={loadMoreSchedules}
                  loading={loadingSchedules}
                  className='text-slate-500 border-slate-300 h-10'
                >
                  載入更多後續排程
                </Button>
              </div>
            </div>
          )}

          {/* ================= 通知 View ================= */}
          {navTab === 'notification' && (
            <div className='flex-1 overflow-y-auto pb-24 scrollbar-hide bg-white'>
              {notifications.map(notif => (
                <div
                  key={notif.id}
                  className='border-b border-slate-100 p-4 flex gap-3 items-start active:bg-slate-50 transition-colors'
                >
                  <div
                    className={`p-2.5 rounded-full shrink-0 ${
                      notif.type === 'error'
                        ? 'bg-red-100 text-red-500'
                        : notif.type === 'warning'
                          ? 'bg-orange-100 text-orange-500'
                          : notif.type === 'success'
                            ? 'bg-green-100 text-green-500'
                            : 'bg-blue-100 text-blue-500'
                    }`}
                  >
                    {notif.type === 'error' ? (
                      <AlertTriangle size={20} />
                    ) : notif.type === 'warning' ? (
                      <AlertCircle size={20} />
                    ) : notif.type === 'success' ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      <ArrowRightLeft size={20} />
                    )}
                  </div>
                  <div className='flex-1'>
                    <div className='flex justify-between items-center mb-0.5'>
                      <span className='font-bold text-sm text-slate-800'>
                        {notif.title}
                      </span>
                      <span className='text-[10px] text-slate-400'>
                        {notif.time}
                      </span>
                    </div>
                    <div className='text-xs text-slate-600 leading-relaxed'>
                      {notif.desc}
                    </div>
                  </div>
                </div>
              ))}
              <div className='p-4 text-center'>
                {loadingNotifications ? (
                  <Spin size='small' />
                ) : (
                  <Button
                    type='link'
                    onClick={loadMoreNotifications}
                    className='text-slate-400'
                  >
                    查看更早的通知
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* ================= 我的 View ================= */}
          {navTab === 'profile' && (
            <div className='flex-1 overflow-y-auto px-5 pb-24 pt-8 scrollbar-hide'>
              <div className='flex flex-col items-center mb-8'>
                <div className='w-24 h-24 bg-blue-100 border-4 border-white shadow-md rounded-full flex items-center justify-center text-blue-600 mb-4 relative'>
                  <User size={48} strokeWidth={1.5} />
                  <div className='absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full'></div>
                </div>
                <h2 className='text-2xl font-bold text-slate-800'>王大明</h2>
                <p className='text-sm text-slate-500 mt-1 font-medium bg-slate-200 px-3 py-1 rounded-full'>
                  EMP-1234 | PC 工程部
                </p>
              </div>

              <div className='space-y-3'>
                <Button
                  block
                  size='large'
                  onClick={() => setSettingsOpen(true)}
                  className='text-left font-bold rounded-xl h-14 shadow-sm text-slate-700 flex items-center justify-between px-5'
                >
                  <span className='flex items-center'>
                    <Settings size={18} className='mr-3 text-slate-400' />{' '}
                    個人與通知設定
                  </span>
                  <ChevronRight size={16} className='text-slate-300' />
                </Button>
                <Button
                  block
                  size='large'
                  onClick={() => setSystemVersionOpen(true)}
                  className='text-left font-bold rounded-xl h-14 shadow-sm text-slate-700 flex items-center justify-between px-5'
                >
                  <span className='flex items-center'>
                    <Smartphone size={18} className='mr-3 text-slate-400' />{' '}
                    系統版本
                  </span>
                  <div className='flex items-center'>
                    <span className='text-xs text-slate-400 font-normal mr-1'>
                      v2.1.0 (最新)
                    </span>
                    <ChevronRight size={16} className='text-slate-300' />
                  </div>
                </Button>
                <Button
                  block
                  size='large'
                  danger
                  onClick={handleLogout}
                  className='text-left font-bold rounded-xl h-14 shadow-sm mt-8 flex items-center justify-center'
                >
                  <LogOut size={18} className='mr-2' /> 登出系統
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* 底部導覽列 */}
        <div className='absolute bottom-0 w-full h-20 bg-white border-t border-slate-200 flex justify-around items-start pt-3 pb-5 z-40 shrink-0'>
          <button
            onClick={() => setNavTab('board')}
            className={`flex flex-col items-center w-16 transition-colors ${navTab === 'board' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <Home size={24} />
            <span className='text-[10px] mt-1 font-bold'>看板</span>
          </button>
          <button
            onClick={() => setNavTab('schedule')}
            className={`flex flex-col items-center w-16 transition-colors ${navTab === 'schedule' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <Calendar size={24} />
            <span className='text-[10px] mt-1 font-bold'>排程</span>
          </button>
          <button
            onClick={() => setNavTab('notification')}
            className={`flex flex-col items-center w-16 transition-colors relative ${navTab === 'notification' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <Badge dot offset={[-2, 2]}>
              <Bell
                size={24}
                className={
                  navTab === 'notification' ? 'text-blue-600' : 'text-slate-400'
                }
              />
            </Badge>
            <span className='text-[10px] mt-1 font-bold'>通知</span>
          </button>
          <button
            onClick={() => setNavTab('profile')}
            className={`flex flex-col items-center w-16 transition-colors ${navTab === 'profile' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <User size={24} />
            <span className='text-[10px] mt-1 font-bold'>我的</span>
          </button>
        </div>

        {/* ==================================================== */}
        {/* Drawers: 模態視窗 */}
        {/* ==================================================== */}

        {/* --- 工單詳細資訊 (全螢幕右側滑入) --- */}
        <Drawer
          title={<span className='font-bold text-lg'>工單詳細資訊</span>}
          placement='right'
          width='100%'
          closable={false}
          extra={
            <button
              onClick={() => setDetailModalOpen(false)}
              className='text-slate-600 bg-slate-100 p-1.5 rounded-full hover:bg-slate-200 flex items-center pr-2'
            >
              <ChevronLeft size={20} />
              <span className='text-sm font-bold'>返回</span>
            </button>
          }
          open={detailModalOpen}
          getContainer={false}
          rootStyle={{ position: 'absolute' }}
          styles={{
            header: { borderBottom: '1px solid #f1f5f9', paddingTop: '40px' },
            body: {
              padding: 0,
              backgroundColor: '#f8fafc',
              display: 'flex',
              flexDirection: 'column'
            }
          }}
        >
          {selectedOrder && (
            <>
              <div className='flex-1 overflow-y-auto p-4 space-y-4 pb-24 scrollbar-hide'>
                {/* Header 資訊區 */}
                <div className='bg-white p-5 rounded-2xl shadow-sm border border-slate-100'>
                  <div className='flex justify-between items-start mb-1'>
                    <h2 className='text-xl font-bold text-slate-800 m-0'>
                      {selectedOrder.id}
                    </h2>
                    {renderStatusTag(selectedOrder.status)}
                  </div>
                  <p className='text-slate-500 text-sm m-0 flex items-center'>
                    <Layers size={14} className='mr-1' />{' '}
                    {selectedOrder.product}
                  </p>
                </div>

                {/* 生產進度區 */}
                <div className='bg-white p-5 rounded-2xl shadow-sm border border-slate-100'>
                  <div className='flex justify-between text-sm font-bold text-slate-700 mb-2'>
                    <span>整體生產進度</span>
                    <span className='text-blue-600'>
                      {selectedOrder.progress}%
                    </span>
                  </div>
                  <Progress
                    percent={selectedOrder.progress}
                    showInfo={false}
                    strokeColor={
                      selectedOrder.status === 'abnormal'
                        ? '#ef4444'
                        : selectedOrder.status === 'delayed'
                          ? '#f97316'
                          : '#2563eb'
                    }
                  />

                  <Divider className='my-4' />

                  <div className='grid grid-cols-3 gap-2 text-center'>
                    <div className='bg-slate-50 p-2 rounded-xl'>
                      <div className='text-[10px] text-slate-400 mb-1'>
                        預計數量
                      </div>
                      <div className='font-bold text-slate-700'>
                        {selectedOrder.plannedQty}
                      </div>
                    </div>
                    <div className='bg-green-50 p-2 rounded-xl'>
                      <div className='text-[10px] text-green-600 mb-1'>
                        已完工
                      </div>
                      <div className='font-bold text-green-700'>
                        {selectedOrder.completedQty}
                      </div>
                    </div>
                    <div className='bg-red-50 p-2 rounded-xl'>
                      <div className='text-[10px] text-red-500 mb-1'>
                        不良報廢
                      </div>
                      <div className='font-bold text-red-600'>
                        {selectedOrder.scrapQty}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 詳細屬性區 */}
                <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
                  <List itemLayout='horizontal' size='small' className='px-2'>
                    <List.Item className='border-b border-slate-50 py-3'>
                      <div className='flex items-center text-slate-500 text-sm w-24'>
                        <Factory size={16} className='mr-2' /> 機台
                      </div>
                      <div className='font-bold text-slate-800'>
                        {selectedOrder.machine}
                      </div>
                    </List.Item>
                    <List.Item className='border-b border-slate-50 py-3'>
                      <div className='flex items-center text-slate-500 text-sm w-24'>
                        <Package size={16} className='mr-2' /> 批號
                      </div>
                      <div className='font-bold text-slate-800'>
                        {selectedOrder.lot}
                      </div>
                    </List.Item>
                    <List.Item className='border-b border-slate-50 py-3'>
                      <div className='flex items-center text-slate-500 text-sm w-24'>
                        <PlayCircle size={16} className='mr-2' /> 開始時間
                      </div>
                      <div className='font-medium text-slate-700'>
                        {selectedOrder.startTime}
                      </div>
                    </List.Item>
                    <List.Item className='py-3'>
                      <div className='flex items-center text-slate-500 text-sm w-24'>
                        <Clock size={16} className='mr-2' /> 預計完工
                      </div>
                      <div className='font-medium text-slate-700'>
                        {selectedOrder.endTime}
                      </div>
                    </List.Item>
                  </List>
                </div>
              </div>

              {/* 底部固定操作列 (Sticky Bottom Bar) */}
              <div className='absolute bottom-0 w-full bg-white border-t border-slate-200 p-4 pb-6 flex gap-3 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]'>
                <Button
                  size='large'
                  shape='round'
                  icon={<ArrowRightLeft size={16} />}
                  disabled={selectedOrder.status === 'completed'}
                  onClick={() => {
                    setChangeoverData({
                      targetMachine: null,
                      reason: '',
                      notes: ''
                    })
                    setChangeoverModalOpen(true)
                  }}
                  className='flex-1 h-12 flex items-center justify-center font-bold text-slate-600 bg-slate-50'
                >
                  換線作業
                </Button>
                <Button
                  type='primary'
                  size='large'
                  shape='round'
                  icon={<PencilLine size={16} />}
                  disabled={selectedOrder.status === 'completed'}
                  onClick={() => {
                    setReportData({ completed: 0, scrap: 0 })
                    setReportModalOpen(true)
                  }}
                  className='flex-1 h-12 flex items-center justify-center font-bold shadow-md shadow-blue-500/20'
                >
                  回報現況
                </Button>
              </div>
            </>
          )}
        </Drawer>

        {/* --- 個人設定 (全螢幕右側滑入) --- */}
        <Drawer
          title={<span className='font-bold text-lg'>個人與通知設定</span>}
          placement='right'
          width='100%'
          closable={false}
          extra={
            <button
              onClick={() => setSettingsOpen(false)}
              className='text-slate-600 bg-slate-100 p-1.5 rounded-full hover:bg-slate-200 flex items-center pr-2'
            >
              <ChevronLeft size={20} />
              <span className='text-sm font-bold'>返回</span>
            </button>
          }
          open={settingsOpen}
          getContainer={false}
          rootStyle={{ position: 'absolute' }}
          styles={{
            header: { borderBottom: '1px solid #f1f5f9', paddingTop: '40px' },
            body: { padding: 0, backgroundColor: '#f8fafc' }
          }}
        >
          <div className='p-4 space-y-6'>
            <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
              <div className='px-4 py-3 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50'>
                推送通知
              </div>
              <List itemLayout='horizontal'>
                <List.Item className='px-4 py-3 border-b border-slate-50 flex justify-between items-center'>
                  <div className='flex items-center'>
                    <Bell size={18} className='text-slate-400 mr-3' />
                    <span className='font-bold text-slate-700'>
                      接收排程變更通知
                    </span>
                  </div>
                  <Switch defaultChecked />
                </List.Item>
                <List.Item className='px-4 py-3 border-b border-slate-50 flex justify-between items-center'>
                  <div className='flex items-center'>
                    <AlertTriangle size={18} className='text-slate-400 mr-3' />
                    <span className='font-bold text-slate-700'>
                      機台異常緊急警報
                    </span>
                  </div>
                  <Switch defaultChecked className='bg-red-500' />
                </List.Item>
                <List.Item className='px-4 py-3 flex justify-between items-center'>
                  <div className='flex items-center'>
                    <Volume2 size={18} className='text-slate-400 mr-3' />
                    <span className='font-bold text-slate-700'>
                      警報震動與音效
                    </span>
                  </div>
                  <Switch defaultChecked />
                </List.Item>
              </List>
            </div>

            <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
              <div className='px-4 py-3 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50'>
                安全性與顯示
              </div>
              <List itemLayout='horizontal'>
                <List.Item className='px-4 py-3 border-b border-slate-50 flex justify-between items-center'>
                  <div className='flex items-center'>
                    <ShieldCheck size={18} className='text-slate-400 mr-3' />
                    <span className='font-bold text-slate-700'>
                      生物辨識快速登入
                    </span>
                  </div>
                  <Switch defaultChecked />
                </List.Item>
                <List.Item className='px-4 py-3 flex justify-between items-center'>
                  <div className='flex items-center'>
                    <Clock size={18} className='text-slate-400 mr-3' />
                    <span className='font-bold text-slate-700'>
                      深色模式 (Dark Mode)
                    </span>
                  </div>
                  <Switch />
                </List.Item>
              </List>
            </div>
          </div>
        </Drawer>

        {/* --- 系統版本詳細資訊 (全螢幕右側滑入) --- */}
        <Drawer
          title={<span className='font-bold text-lg'>系統版本資訊</span>}
          placement='right'
          width='100%'
          closable={false}
          extra={
            <button
              onClick={() => setSystemVersionOpen(false)}
              className='text-slate-600 bg-slate-100 p-1.5 rounded-full hover:bg-slate-200 flex items-center pr-2'
            >
              <ChevronLeft size={20} />
              <span className='text-sm font-bold'>返回</span>
            </button>
          }
          open={systemVersionOpen}
          getContainer={false}
          rootStyle={{ position: 'absolute' }}
          styles={{
            header: { borderBottom: '1px solid #f1f5f9', paddingTop: '40px' },
            body: { padding: 0, backgroundColor: '#f8fafc' }
          }}
        >
          <div className='p-5 space-y-6'>
            <div className='flex flex-col items-center justify-center py-6'>
              <div className='w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-600/40 mb-4'>
                <Factory size={40} className='text-white' />
              </div>
              <h2 className='text-2xl font-bold text-slate-800'>
                APS App Demo
              </h2>
              <Tag
                color='processing'
                className='mt-2 px-3 py-1 text-sm rounded-full border-none font-bold'
              >
                Version 2.1.0
              </Tag>
            </div>

            <div className='bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-5'>
              <div>
                <Text
                  type='secondary'
                  className='text-[10px] font-bold uppercase tracking-wider block mb-1'
                >
                  系統更新時間
                </Text>
                <div className='text-slate-700 font-bold flex items-center'>
                  <Clock size={14} className='mr-1.5 text-blue-500' />{' '}
                  2026-04-24 10:30:00
                </div>
              </div>
              <div className='w-full h-px bg-slate-100'></div>
              <div>
                <Text
                  type='secondary'
                  className='text-[10px] font-bold uppercase tracking-wider block mb-1'
                >
                  系統核心說明
                </Text>
                <div className='text-slate-700 text-sm leading-relaxed font-medium'>
                  基於高效能遺傳演算法 (Genetic Algorithm) 的 APS 排程引擎
                  V5，支援動態插單、多機台負載平衡，並與現場 MES
                  系統達到毫秒級雙向同步。
                </div>
              </div>
              <div className='w-full h-px bg-slate-100'></div>
              <div>
                <Text
                  type='secondary'
                  className='text-[10px] font-bold uppercase tracking-wider block mb-2'
                >
                  本次更新內容
                </Text>
                <ul className='list-none p-0 m-0 text-sm text-slate-700 space-y-3 font-medium'>
                  <li className='flex items-start'>
                    <CheckCircle2
                      size={16}
                      className='text-green-500 mr-2 shrink-0 mt-0.5'
                    />
                    全新行動端介面，支援單手大拇指快速操作。
                  </li>
                  <li className='flex items-start'>
                    <CheckCircle2
                      size={16}
                      className='text-green-500 mr-2 shrink-0 mt-0.5'
                    />
                    新增「現場異常回報」功能，支援拍照與機台條碼掃描。
                  </li>
                  <li className='flex items-start'>
                    <CheckCircle2
                      size={16}
                      className='text-green-500 mr-2 shrink-0 mt-0.5'
                    />
                    新增「換線作業」智慧模組，自動排除生產中機台。
                  </li>
                  <li className='flex items-start'>
                    <CheckCircle2
                      size={16}
                      className='text-green-500 mr-2 shrink-0 mt-0.5'
                    />
                    效能優化：排程重算與即時同步速度提升 30%。
                  </li>
                </ul>
              </div>
            </div>

            <div className='text-center text-xs text-slate-400 mt-6 font-medium'>
              先進製造科技 © 2026 All Rights Reserved.
            </div>
          </div>
        </Drawer>

        {/* 1. 現況回報 Drawer */}
        <Drawer
          title={<span className='font-bold text-lg'>生產現況回報</span>}
          placement='bottom'
          closable={false}
          extra={renderCloseBtn(() => setReportModalOpen(false))}
          open={reportModalOpen}
          getContainer={false}
          rootStyle={{ position: 'absolute' }}
          height={420}
          className='rounded-t-3xl'
        >
          <div className='mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100'>
            <Text type='secondary' className='text-sm'>
              當前工單
            </Text>
            <div className='font-bold text-slate-800'>{selectedOrder?.id}</div>
            <Text type='secondary' className='text-xs'>
              {selectedOrder?.product}
            </Text>
          </div>
          <div className='space-y-5'>
            <div>
              <div className='text-sm font-bold text-slate-700 mb-2'>
                完工數量 (良品)
              </div>
              <InputNumber
                min={0}
                size='large'
                className='w-full font-bold text-center'
                value={reportData.completed}
                onChange={val =>
                  setReportData(p => ({ ...p, completed: val || 0 }))
                }
                controls={true}
              />
            </div>
            <div>
              <div className='text-sm font-bold text-slate-700 mb-2'>
                報廢數量 (不良品)
              </div>
              <InputNumber
                min={0}
                size='large'
                status='error'
                className='w-full font-bold text-center text-red-500'
                value={reportData.scrap}
                onChange={val =>
                  setReportData(p => ({ ...p, scrap: val || 0 }))
                }
                controls={true}
              />
            </div>
          </div>
          <Button
            type='primary'
            size='large'
            block
            className='mt-8 rounded-xl h-12 shadow-lg shadow-blue-600/30 font-bold'
            onClick={() => {
              setReportModalOpen(false)
              message.success(`成功回報 ${selectedOrder?.id} 現況資料`)
            }}
          >
            確認送出
          </Button>
        </Drawer>

        {/* 2. 異常回報 Drawer */}
        <Drawer
          title={
            <div className='font-bold text-xl flex items-center'>
              <AlertTriangle className='text-red-500 mr-2' /> 現場異常回報
            </div>
          }
          placement='bottom'
          closable={false}
          extra={renderCloseBtn(() => setIssueModalOpen(false))}
          open={issueModalOpen}
          getContainer={false}
          rootStyle={{ position: 'absolute' }}
          height='90%'
          className='rounded-t-3xl'
          styles={{ body: { paddingBottom: '20px' } }}
        >
          <div className='space-y-6'>
            <div>
              <label className='block text-sm font-bold text-slate-700 mb-2'>
                異常類型 <span className='text-red-500'>*</span>
              </label>
              <div className='grid grid-cols-2 gap-2'>
                {['機台故障', '材料短缺', '品質異常', '人員缺勤'].map(type => (
                  <Button
                    key={type}
                    type={issueData.type === type ? 'primary' : 'default'}
                    danger={issueData.type === type}
                    className='h-10 rounded-xl font-medium'
                    onClick={() => setIssueData(p => ({ ...p, type }))}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label className='block text-sm font-bold text-slate-700 mb-2'>
                受影響機台 / 批號 <span className='text-red-500'>*</span>
              </label>
              <Input
                size='large'
                value={issueData.machine}
                onChange={e =>
                  setIssueData(p => ({ ...p, machine: e.target.value }))
                }
                placeholder='輸入或點擊掃描條碼'
                className='rounded-xl bg-slate-50 focus:bg-white'
              />
            </div>
            <div>
              <label className='block text-sm font-bold text-slate-700 mb-2'>
                現場照片 (選填)
              </label>
              {!issueData.hasPhoto ? (
                <div
                  onClick={() => setIssueData(p => ({ ...p, hasPhoto: true }))}
                  className='w-full h-28 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-blue-400 cursor-pointer transition-colors bg-slate-50/50'
                >
                  <Camera size={32} className='mb-2 text-slate-400' />
                  <span className='text-sm font-medium'>點擊開啟相機</span>
                </div>
              ) : (
                <div className='w-full h-32 rounded-xl relative overflow-hidden bg-slate-900 shadow-inner'>
                  <img
                    src='https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80'
                    alt='現場照片'
                    className='w-full h-full object-cover opacity-70'
                  />
                  <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/20'>
                    <CheckCircle2
                      className='text-green-400 mb-1 drop-shadow-md'
                      size={32}
                    />
                    <span className='text-white text-sm font-bold drop-shadow-md'>
                      照片已附加
                    </span>
                  </div>
                  <Button
                    type='text'
                    icon={<X size={16} className='text-white' />}
                    onClick={() =>
                      setIssueData(p => ({ ...p, hasPhoto: false }))
                    }
                    className='absolute top-2 right-2 bg-black/50 hover:bg-red-500 border-none rounded-full w-8 h-8 flex items-center justify-center'
                  />
                </div>
              )}
            </div>
            <div>
              <label className='block text-sm font-bold text-slate-700 mb-2'>
                狀況說明 (選填)
              </label>
              <TextArea
                rows={3}
                value={issueData.description}
                onChange={e =>
                  setIssueData(p => ({ ...p, description: e.target.value }))
                }
                placeholder='請簡述現場狀況，以利工程部判斷...'
                className='rounded-xl bg-slate-50 focus:bg-white resize-none'
              />
            </div>
          </div>
          <div className='pt-6 mt-4 border-t border-slate-100'>
            <Button
              type='primary'
              danger
              size='large'
              block
              disabled={!issueData.type || !issueData.machine}
              className='h-14 rounded-xl shadow-lg shadow-red-500/30 font-bold text-lg'
              icon={<AlertTriangle size={20} />}
              onClick={() => {
                setIssueModalOpen(false)
                message.error(`🚨 異常警報已發送至戰情室與工程部！`)
              }}
            >
              確認發送警報
            </Button>
          </div>
        </Drawer>

        {/* 3. 換線作業 Drawer */}
        <Drawer
          title={
            <div className='font-bold text-xl flex items-center'>
              <ArrowRightLeft className='text-blue-600 mr-2' /> 安排換線作業
            </div>
          }
          placement='bottom'
          closable={false}
          extra={renderCloseBtn(() => setChangeoverModalOpen(false))}
          open={changeoverModalOpen}
          getContainer={false}
          rootStyle={{ position: 'absolute' }}
          height={550}
          className='rounded-t-3xl'
        >
          <div className='space-y-6'>
            <div className='bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between'>
              <div className='flex-1 w-0'>
                <Text type='secondary' className='text-xs mb-1 block'>
                  目前機台
                </Text>
                <Text strong className='text-lg truncate block'>
                  {selectedOrder?.machine}
                </Text>
              </div>
              <div className='bg-white rounded-full p-2 shadow-sm border border-slate-100 mx-3 shrink-0'>
                <ArrowRightLeft className='text-slate-400' size={18} />
              </div>
              <div className='flex-1 w-0 text-right'>
                <Text type='secondary' className='text-xs mb-1 block'>
                  目標機台 <span className='text-red-500'>*</span>
                </Text>
                <Select
                  size='large'
                  placeholder='請選擇機台'
                  className='w-full text-left font-bold'
                  value={changeoverData.targetMachine}
                  onChange={val =>
                    setChangeoverData(p => ({ ...p, targetMachine: val }))
                  }
                  options={['M-01', 'M-02', 'M-03', 'M-04', 'M-05']
                    .filter(m => m !== selectedOrder?.machine)
                    .map(m => ({ label: m, value: m }))}
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-bold text-slate-700 mb-2'>
                換線原因 <span className='text-red-500'>*</span>
              </label>
              <div className='grid grid-cols-2 gap-2'>
                {['機台保養', '急單插單', '良率異常', '負載平衡'].map(
                  reason => (
                    <Button
                      key={reason}
                      type={
                        changeoverData.reason === reason ? 'primary' : 'default'
                      }
                      ghost={changeoverData.reason === reason}
                      className='h-10 rounded-xl font-medium'
                      onClick={() => setChangeoverData(p => ({ ...p, reason }))}
                    >
                      {reason}
                    </Button>
                  )
                )}
              </div>
            </div>
            <div>
              <label className='block text-sm font-bold text-slate-700 mb-2'>
                備註事項 (選填)
              </label>
              <Input
                size='large'
                value={changeoverData.notes}
                onChange={e =>
                  setChangeoverData(p => ({ ...p, notes: e.target.value }))
                }
                placeholder='例如: 刀具更換、治具重新校正...'
                className='rounded-xl bg-slate-50 focus:bg-white'
              />
            </div>
          </div>
          <div className='pt-6 mt-4'>
            <Button
              type='primary'
              size='large'
              block
              disabled={!changeoverData.targetMachine || !changeoverData.reason}
              className='h-14 rounded-xl shadow-lg shadow-blue-600/30 font-bold text-lg'
              onClick={() => {
                setChangeoverModalOpen(false)
                message.success(
                  `已排定 ${selectedOrder?.id} 換線: ${selectedOrder?.machine} ➔ ${changeoverData.targetMachine}`
                )
              }}
            >
              確認換線排程
            </Button>
          </div>
        </Drawer>

        {/* Tailwind 輔助樣式 */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `
          }}
        />
      </PhoneWrapper>
    </ConfigProvider>
  )
}
