import { initialNotifications } from "@/constants/mockData";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRightLeft,
  CheckCircle2,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setNotifications((prev) => [
        ...prev,
        {
          id: `N${prev.length + 1}`,
          type: "success",
          title: "換線完成",
          time: "昨天 10:00",
          desc: "M-01 機台已完成治具更換，恢復生產。",
        },
        {
          id: `N${prev.length + 2}`,
          type: "info",
          title: "系統更新",
          time: "前天 09:00",
          desc: "APS 排程引擎已更新至 v2.1.0，演算法效能提升。",
        },
      ]);
      setLoading(false);
    }, 800);
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case "error":
        return (
          <View className="p-2.5 rounded-full bg-red-100">
            <AlertTriangle size={20} color="#ef4444" />
          </View>
        );
      case "warning":
        return (
          <View className="p-2.5 rounded-full bg-orange-100">
            <AlertCircle size={20} color="#f97316" />
          </View>
        );
      case "success":
        return (
          <View className="p-2.5 rounded-full bg-green-100">
            <CheckCircle2 size={20} color="#22c55e" />
          </View>
        );
      default:
        return (
          <View className="p-2.5 rounded-full bg-blue-100">
            <ArrowRightLeft size={20} color="#3b82f6" />
          </View>
        );
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {notifications.map((notif) => (
        <TouchableOpacity
          key={notif.id}
          className="border-b border-slate-100 p-4 flex-row gap-3 items-start active:bg-slate-50"
        >
          {renderIcon(notif.type)}
          <View className="flex-1">
            <View className="flex-row justify-between items-center mb-0.5">
              <Text className="font-bold text-sm text-slate-800">
                {notif.title}
              </Text>
              <Text className="text-[10px] text-slate-400">{notif.time}</Text>
            </View>
            <Text className="text-xs text-slate-600 leading-relaxed">
              {notif.desc}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={loadMore}
        disabled={loading}
        className="p-4 items-center"
      >
        {loading ? (
          <ActivityIndicator size="small" color="#94a3b8" />
        ) : (
          <Text className="text-slate-400 text-sm">查看更早的通知</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
