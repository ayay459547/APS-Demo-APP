<<<<<<< HEAD
import { initialOrders } from "@/constants/mockData";
import { router } from "expo-router";
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
        label = "進行中";
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
=======
import { Image } from "expo-image";
import { Platform, StyleSheet } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
>>>>>>> parent of acba134 (feat: app v1)

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction
              title="Action"
              icon="cube"
              onPress={() => alert("Action pressed")}
            />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert("Share pressed")}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert("Delete pressed")}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">
            npm run reset-project
          </ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
