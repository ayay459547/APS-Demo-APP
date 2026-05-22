import { Tabs } from "expo-router";
import { Bell, Calendar, Home, User } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: {
          height: 80,
          paddingBottom: 25,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: "#e2e8f0",
          backgroundColor: "#ffffff",
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#ffffff",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 1,
          elevation: 2,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "bold",
          color: "#1e293b",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "看板",
          headerTitle: "APS 行動看板",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "排程",
          headerTitle: "生產排程",
          tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "通知",
          headerTitle: "系統通知",
          tabBarIcon: ({ color }) => <Bell size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "我的",
          headerTitle: "我的中心",
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
