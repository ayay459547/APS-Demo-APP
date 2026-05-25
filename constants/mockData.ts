// ==========================================
// 假資料庫 (Mock Data)
// ==========================================

/**
 * 看板
 */
export const initialOrders = [
  {
    id: "WO-260424-001",
    product: "半導體封裝 A",
    progress: 85,
    status: "normal",
    machine: "M-01",
    lot: "L-A01",
    plannedQty: 1000,
    completedQty: 850,
    scrapQty: 12,
    startTime: "08:00",
    endTime: "14:00",
  },
  {
    id: "WO-260424-002",
    product: "車用晶片 B",
    progress: 30,
    status: "delayed",
    machine: "M-02",
    lot: "L-B02",
    plannedQty: 500,
    completedQty: 150,
    scrapQty: 5,
    startTime: "09:00",
    endTime: "18:00",
  },
  {
    id: "WO-260424-003",
    product: "通訊模組 C",
    progress: 10,
    status: "abnormal",
    machine: "M-03",
    lot: "L-C03",
    plannedQty: 2000,
    completedQty: 200,
    scrapQty: 45,
    startTime: "10:00",
    endTime: "20:00",
  },
  {
    id: "WO-260424-004",
    product: "面板驅動 IC",
    progress: 100,
    status: "completed",
    machine: "M-04",
    lot: "L-D04",
    plannedQty: 800,
    completedQty: 800,
    scrapQty: 8,
    startTime: "昨日 08:00",
    endTime: "昨日 16:30",
  },
  {
    id: "WO-260424-005",
    product: "電源管理 IC",
    progress: 60,
    status: "normal",
    machine: "M-05",
    lot: "L-E05",
    plannedQty: 1500,
    completedQty: 900,
    scrapQty: 20,
    startTime: "11:00",
    endTime: "19:30",
  },
];

/**
 * 排程
 */
export const initialSchedules = [
  {
    id: "S1",
    machine: "M-01",
    product: "半導體封裝 A",
    status: "processing",
    time: "08:00 - 14:00",
  },
  {
    id: "S2",
    machine: "M-01",
    product: "治具更換與保養",
    status: "pending",
    time: "14:00 - 15:30",
  },
  {
    id: "S3",
    machine: "M-02",
    product: "車用晶片 B",
    status: "delayed",
    time: "09:00 - 18:00",
  },
  {
    id: "S4",
    machine: "M-03",
    product: "通訊模組 C (機障暫停)",
    status: "abnormal",
    time: "10:00 - 12:00",
  },
  {
    id: "S1-1",
    machine: "M-01",
    product: "半導體封裝 A",
    status: "processing",
    time: "08:00 - 14:00",
  },
  {
    id: "S2-1",
    machine: "M-01",
    product: "治具更換與保養",
    status: "pending",
    time: "14:00 - 15:30",
  },
  {
    id: "S3-1",
    machine: "M-02",
    product: "車用晶片 B",
    status: "delayed",
    time: "09:00 - 18:00",
  },
  {
    id: "S4-1",
    machine: "M-03",
    product: "通訊模組 C (機障暫停)",
    status: "abnormal",
    time: "10:00 - 12:00",
  },
];

/**
 * 通知
 */
export const initialNotifications = [
  {
    id: "N1",
    type: "error",
    title: "機台異常警報",
    time: "10 分鐘前",
    desc: "機台 M-03 (通訊模組 C) 發生品質異常，已自動停機。",
  },
  {
    id: "N2",
    type: "info",
    title: "排程變更通知",
    time: "1 小時前",
    desc: "工單 WO-260424-002 已成功排定換線至機台 M-05。",
  },
  {
    id: "N3",
    type: "success",
    title: "工單完工",
    time: "昨天 16:30",
    desc: "面板驅動 IC (WO-260424-004) 已全數生產完畢入庫。",
  },
  {
    id: "N4",
    type: "warning",
    title: "物料短缺預警",
    time: "昨天 14:00",
    desc: "M-02 車用晶片預計於 2 小時後缺料，請確認備料狀況。",
  },
  {
    id: "N1-1",
    type: "error",
    title: "機台異常警報",
    time: "120 分鐘前",
    desc: "機台 M-13 (通訊模組 A) 發生品質異常，已自動停機。",
  },
  {
    id: "N2-1",
    type: "info",
    title: "排程變更通知",
    time: "6 小時前",
    desc: "工單 WO-260424-102 已成功排定換線至機台 M-08。",
  },
  {
    id: "N3-1",
    type: "success",
    title: "工單完工",
    time: "昨天 13:30",
    desc: "面板驅動 IC (WO-260426-010) 已全數生產完畢入庫。",
  },
  {
    id: "N4-1",
    type: "warning",
    title: "物料短缺預警",
    time: "昨天 14:00",
    desc: "M-05 車用晶片預計於 4 小時後缺料，請確認備料狀況。",
  },
];
