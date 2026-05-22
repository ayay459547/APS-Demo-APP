import { router } from "expo-router";
import {
  ChevronRight,
  LogOut,
  Settings,
  Smartphone,
  User,
} from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const handleLogout = () => {
    // In a real app, clear tokens etc.
    router.replace("/(auth)/login");
  };

  return (
    <ScrollView className="flex-1 bg-slate-50 px-5 pt-8">
      <View className="items-center mb-8">
        <View className="w-24 h-24 bg-blue-100 border-4 border-white shadow-md rounded-full items-center justify-center relative">
          <User size={48} color="#3b82f6" strokeWidth={1.5} />
          <View className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full" />
        </View>
        <Text className="text-2xl font-bold text-slate-800 mt-4">王大明</Text>
        <View className="bg-slate-200 px-3 py-1 rounded-full mt-1">
          <Text className="text-sm text-slate-500 font-medium">
            EMP-1234 | PC 工程部
          </Text>
        </View>
      </View>

      <View className="space-y-3">
        <TouchableOpacity className="bg-white flex-row items-center justify-between p-4 rounded-xl shadow-sm h-14 border border-slate-100 mb-3">
          <View className="flex-row items-center">
            <Settings size={18} color="#94a3b8" className="mr-3" />
            <Text className="font-bold text-slate-700 ml-3">
              個人與通知設定
            </Text>
          </View>
          <ChevronRight size={16} color="#cbd5e1" />
        </TouchableOpacity>

        <TouchableOpacity className="bg-white flex-row items-center justify-between p-4 rounded-xl shadow-sm h-14 border border-slate-100 mb-3">
          <View className="flex-row items-center">
            <Smartphone size={18} color="#94a3b8" className="mr-3" />
            <Text className="font-bold text-slate-700 ml-3">系統版本</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-xs text-slate-400 font-normal mr-1">
              v2.1.0 (最新)
            </Text>
            <ChevronRight size={16} color="#cbd5e1" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          className="bg-white flex-row items-center justify-center p-4 rounded-xl shadow-sm h-14 border border-red-100 mt-8"
        >
          <LogOut size={18} color="#ef4444" className="mr-2" />
          <Text className="font-bold text-red-500 ml-2">登出系統</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
