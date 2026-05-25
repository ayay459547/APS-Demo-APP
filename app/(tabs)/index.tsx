import { initialOrders } from "@/constants/mockData";
import { useRouter } from "expo-router";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRightLeft,
  CheckCircle2,
  ChevronRight,
  PencilLine,
  Search,
  XCircle,
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function BoardScreen() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredOrders = useMemo(() => {
    return initialOrders.filter((order) => {
      const matchStatus = activeTab === "all" || order.status === activeTab;
      const matchSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.product.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [activeTab, searchQuery]);

  const renderStatusTag = (status: string) => {
    let colorClass = "bg-slate-100 text-slate-500";
    let label = status;
    let Icon = CheckCircle2;

    switch (status) {
      case "normal":
        colorClass = "bg-green-100 text-green-700";
        label = "正常";
        Icon = CheckCircle2;
        break;
      case "delayed":
        colorClass = "bg-orange-100 text-orange-700";
        label = "延遲";
        Icon = AlertTriangle;
        break;
      case "abnormal":
        colorClass = "bg-red-100 text-red-700";
        label = "異常";
        Icon = XCircle;
        break;
      case "completed":
        colorClass = "bg-slate-200 text-slate-600";
        label = "完工";
        Icon = CheckCircle2;
        break;
    }

    return (
      <View
        className={`flex-row items-center px-2 py-1 rounded-md ${colorClass}`}
      >
        <Icon size={12} color="currentColor" />
        <Text className="text-[10px] font-bold">{label}</Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-slate-50">
      {/* Search and Filters */}
      <View className="px-5 pt-5 pb-2">
        <View className="flex-row items-center bg-white rounded-full px-4 h-12 border border-slate-200 shadow-sm mb-4">
          <Search size={18} color="#94a3b8" />
          <TextInput
            className="flex-1 ml-2 text-slate-800"
            placeholder="搜尋工單、產品或機台..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View className="flex-row bg-slate-200 p-1 rounded-xl">
          {["all", "normal", "delayed", "abnormal"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg items-center ${activeTab === tab ? "bg-white shadow-sm" : ""}`}
            >
              <Text
                className={`text-xs font-bold ${activeTab === tab ? "text-blue-600" : "text-slate-500"}`}
              >
                {tab === "all"
                  ? "全部"
                  : tab === "normal"
                    ? "進行中"
                    : tab === "delayed"
                      ? "延遲"
                      : "異常"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Orders List */}
      <ScrollView
        className="flex-1 px-5 pt-2"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {filteredOrders.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <AlertCircle size={48} color="#cbd5e1" />
            <Text className="text-slate-400 mt-2">找不到符合的工單</Text>
          </View>
        ) : (
          filteredOrders.map((order) => (
            <View
              key={order.id}
              className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-slate-100"
            >
              <View className="flex-row justify-between items-start mb-2">
                <View>
                  <Text className="text-slate-800 font-bold text-base">
                    {order.id}
                  </Text>
                  <Text className="text-slate-500 text-xs mt-0.5">
                    {order.product} | {order.machine}
                  </Text>
                </View>
                {renderStatusTag(order.status)}
              </View>

              <View className="mt-4">
                <View className="flex-row justify-between mb-1">
                  <Text className="text-[10px] text-slate-500">生產進度</Text>
                  <Text className="text-[10px] font-bold text-blue-600">
                    {order.progress}%
                  </Text>
                </View>
                <View className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <View
                    className="h-full rounded-full"
                    style={{
                      width: `${order.progress}%`,
                      backgroundColor:
                        order.status === "abnormal"
                          ? "#ef4444"
                          : order.status === "delayed"
                            ? "#f97316"
                            : "#2563eb",
                    }}
                  />
                </View>
              </View>

              <View className="mt-4 pt-3 border-t border-slate-100 flex-row justify-between items-center">
                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={() => router.push(`/order/${order.id}`)}
                >
                  <Text className="text-slate-400 text-xs mr-1">詳細資訊</Text>
                  <ChevronRight size={14} color="#94a3b8" />
                </TouchableOpacity>

                <View className="flex-row gap-2">
                  <TouchableOpacity
                    disabled={order.status === "completed"}
                    className={`flex-row items-center px-3 py-1.5 rounded-full border border-slate-200 ${order.status === "completed" ? "opacity-50" : "bg-slate-50"}`}
                  >
                    <ArrowRightLeft
                      size={14}
                      color="#475569"
                      className="mr-1"
                    />
                    <Text className="text-xs font-bold text-slate-600">
                      換線
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={order.status === "completed"}
                    className={`flex-row items-center px-3 py-1.5 rounded-full ${order.status === "completed" ? "opacity-50 bg-slate-200" : "bg-blue-50 border border-blue-100"}`}
                  >
                    <PencilLine size={14} color="#2563eb" className="mr-1" />
                    <Text className="text-xs font-bold text-blue-600">
                      回報
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 w-14 h-14 bg-red-500 rounded-full items-center justify-center shadow-lg shadow-red-500/40"
        onPress={() => {}}
      >
        <AlertTriangle size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
