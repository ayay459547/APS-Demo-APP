import { useRouter } from "expo-router";
import { Factory, Lock, UserCircle } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      router.replace("/(tabs)");
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-slate-50"
    >
      <View className="flex-1 justify-center px-8 relative overflow-hidden">
        {/* Decorative background elements (simplified for mobile) */}
        <View className="absolute top-[-10%] left-[-20%] w-96 h-96 bg-blue-400/10 rounded-full" />
        <View className="absolute bottom-[-10%] right-[-20%] w-96 h-96 bg-indigo-400/10 rounded-full" />

        <View className="items-center mb-12">
          <View className="w-20 h-20 bg-blue-600 rounded-2xl items-center justify-center shadow-lg shadow-blue-600/40 mb-6">
            <Factory size={40} color="white" />
          </View>
          <Text className="text-3xl font-bold text-slate-800 mb-2 tracking-wider">
            APS App Demo
          </Text>
          <Text className="text-slate-500 text-sm">行動智能製造管理系統</Text>
        </View>

        <View className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
          <View className="mb-5">
            <Text className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
              員工編號
            </Text>
            <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl h-12 px-4">
              <UserCircle size={18} color="#94a3b8" />
              <TextInput
                className="flex-1 ml-2 text-slate-800 text-lg font-medium"
                defaultValue="EMP-1234"
                placeholder="請輸入員工編號"
                placeholderTextColor="#94a3b8"
              />
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
              登入密碼
            </Text>
            <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl h-12 px-4">
              <Lock size={18} color="#94a3b8" />
              <TextInput
                className="flex-1 ml-2 text-slate-800 text-lg font-medium"
                defaultValue="123456"
                secureTextEntry
                placeholder="請輸入密碼"
                placeholderTextColor="#94a3b8"
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoggingIn}
            className="bg-blue-600 h-14 rounded-xl shadow-lg shadow-blue-600/40 items-center justify-center"
          >
            {isLoggingIn ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-lg">系統登入</Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="absolute bottom-8 w-full items-center left-0">
          <Text className="text-slate-400 text-xs">
            版權所有 © 2026 先進製造科技
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
