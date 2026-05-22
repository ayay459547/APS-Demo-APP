import { initialSchedules } from "@/constants/mockData";
import { Calendar, Clock } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ScheduleScreen() {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setSchedules((prev) => [
        ...prev,
        {
          id: `S${prev.length + 1}`,
          machine: "M-04",
          product: "面板驅動 IC",
          status: "pending",
          time: "16:00 - 20:00",
        },
        {
          id: `S${prev.length + 2}`,
          machine: "M-05",
          product: "電源管理 IC",
          status: "pending",
          time: "18:00 - 22:00",
        },
      ]);
      setLoading(false);
    }, 800);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-blue-500";
      case "abnormal":
        return "bg-red-500";
      case "delayed":
        return "bg-orange-500";
      default:
        return "bg-slate-300";
    }
  };

  const renderStatusTag = (status: string) => {
    switch (status) {
      case "processing":
        return (
          <View className="bg-blue-100 px-2 py-0.5 rounded">
            <Text className="text-blue-700 text-[10px] font-bold">執行中</Text>
          </View>
        );
      case "abnormal":
        return (
          <View className="bg-red-100 px-2 py-0.5 rounded">
            <Text className="text-red-700 text-[10px] font-bold">異常</Text>
          </View>
        );
      case "delayed":
        return (
          <View className="bg-orange-100 px-2 py-0.5 rounded">
            <Text className="text-orange-700 text-[10px] font-bold">延遲</Text>
          </View>
        );
      case "pending":
        return (
          <View className="bg-slate-100 px-2 py-0.5 rounded">
            <Text className="text-slate-600 text-[10px] font-bold">待執行</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView className="flex-1 bg-slate-50 px-5 pt-6">
      <View className="flex-row items-center mb-4">
        <Calendar size={16} color="#64748b" className="mr-2" />
        <Text className="text-sm font-bold text-slate-500">
          執行中與待命排程
        </Text>
      </View>

      <View className="border-l-2 border-slate-200 ml-2 pl-4 space-y-4">
        {schedules.map((schedule) => (
          <View key={schedule.id} className="relative mb-4">
            <View
              className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(schedule.status)}`}
            />
            <View
              className={`bg-white rounded-xl p-4 shadow-sm border border-slate-200 ${schedule.status === "pending" ? "opacity-60" : ""}`}
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1 mr-2">
                  <Text className="font-bold text-slate-800 text-sm">
                    {schedule.machine}{" "}
                    <Text className="text-slate-500 font-normal">
                      {schedule.product}
                    </Text>
                  </Text>
                </View>
                {renderStatusTag(schedule.status)}
              </View>
              <View className="flex-row items-center bg-slate-50 self-start px-2 py-1 rounded-md mt-2">
                <Clock size={12} color="#64748b" className="mr-1" />
                <Text className="text-[10px] text-slate-500">
                  {schedule.time}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        onPress={loadMore}
        disabled={loading}
        className="mt-8 mb-10 bg-white border border-dashed border-slate-300 rounded-full h-10 items-center justify-center"
      >
        {loading ? (
          <ActivityIndicator size="small" color="#94a3b8" />
        ) : (
          <Text className="text-slate-500 text-sm">載入更多後續排程</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
