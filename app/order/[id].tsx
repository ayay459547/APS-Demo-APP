import { initialOrders } from "@/constants/mockData";
import { router, Stack, useLocalSearchParams } from "expo-router";
import {
  AlertTriangle,
  ArrowRightLeft,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Factory,
  Layers,
  Package,
  PencilLine,
  PlayCircle,
  XCircle,
} from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();
  const order = initialOrders.find((o) => o.id === id);

  if (!order) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>找不到工單</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 p-2 bg-blue-500 rounded"
        >
          <Text className="text-white">返回</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderStatusTag = (status: string) => {
    let colorClass = "bg-slate-100 text-slate-500";
    let label = status;
    let Icon = CheckCircle2;

    switch (status) {
      case "normal":
        colorClass = "bg-green-100 text-green-700";
        label = "進行中";
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
        break;
    }

    return (
      <View
        className={`flex-row items-center px-2 py-1 rounded-md ${colorClass}`}
      >
        <Icon size={12} color="currentColor" className="mr-1" />
        <Text className="text-[10px] font-bold">{label}</Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-slate-50">
      <Stack.Screen
        options={{
          headerShown: true,
          title: "工單詳細資訊",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-row items-center bg-slate-100 p-1.5 rounded-full mr-2"
            >
              <ChevronLeft size={20} color="#475569" />
              <Text className="text-sm font-bold text-slate-600 pr-2">
                返回
              </Text>
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView
        className="flex-1 p-4 space-y-4"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header Info */}
        <View className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-4">
          <View className="flex-row justify-between items-start mb-1">
            <Text className="text-xl font-bold text-slate-800">{order.id}</Text>
            {renderStatusTag(order.status)}
          </View>
          <View className="flex-row items-center">
            <Layers size={14} color="#64748b" className="mr-1" />
            <Text className="text-slate-500 text-sm">{order.product}</Text>
          </View>
        </View>

        {/* Progress Info */}
        <View className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-4">
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm font-bold text-slate-700">
              整體生產進度
            </Text>
            <Text className="text-blue-600 font-bold">{order.progress}%</Text>
          </View>
          <View className="h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
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

          <View className="h-[1px] bg-slate-100 w-full my-4" />

          <View className="flex-row gap-2">
            <View className="flex-1 bg-slate-50 p-2 rounded-xl items-center">
              <Text className="text-[10px] text-slate-400 mb-1">預計數量</Text>
              <Text className="font-bold text-slate-700">
                {order.plannedQty}
              </Text>
            </View>
            <View className="flex-1 bg-green-50 p-2 rounded-xl items-center">
              <Text className="text-[10px] text-green-600 mb-1">已完工</Text>
              <Text className="font-bold text-green-700">
                {order.completedQty}
              </Text>
            </View>
            <View className="flex-1 bg-red-50 p-2 rounded-xl items-center">
              <Text className="text-[10px] text-red-500 mb-1">不良報廢</Text>
              <Text className="font-bold text-red-600">{order.scrapQty}</Text>
            </View>
          </View>
        </View>

        {/* Attributes Info */}
        <View className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {[
            { icon: Factory, label: "機台", value: order.machine },
            { icon: Package, label: "批號", value: order.lot },
            { icon: PlayCircle, label: "開始時間", value: order.startTime },
            { icon: Clock, label: "預計完工", value: order.endTime },
          ].map((item, index) => (
            <View
              key={index}
              className={`flex-row items-center justify-between p-4 ${index !== 3 ? "border-b border-slate-50" : ""}`}
            >
              <View className="flex-row items-center w-24">
                <item.icon size={16} color="#64748b" className="mr-2" />
                <Text className="text-slate-500 text-sm ml-2">
                  {item.label}
                </Text>
              </View>
              <Text className="font-bold text-slate-800 flex-1 text-right">
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View className="absolute bottom-0 w-full bg-white border-t border-slate-200 p-4 pb-8 flex-row gap-3 shadow-lg">
        <TouchableOpacity
          disabled={order.status === "completed"}
          className={`flex-1 h-12 flex-row items-center justify-center rounded-full bg-slate-50 border border-slate-200 ${order.status === "completed" ? "opacity-50" : ""}`}
        >
          <ArrowRightLeft size={16} color="#475569" className="mr-2" />
          <Text className="font-bold text-slate-600 ml-2">換線作業</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={order.status === "completed"}
          className={`flex-1 h-12 flex-row items-center justify-center rounded-full bg-blue-600 ${order.status === "completed" ? "opacity-50" : ""}`}
        >
          <PencilLine size={16} color="white" className="mr-2" />
          <Text className="font-bold text-white ml-2">生產回報</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
