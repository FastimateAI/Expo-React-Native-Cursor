// app/index.tsx
import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "../lib/auth";
import { View, ActivityIndicator } from "react-native";

export default function IndexGate() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (session) return <Redirect href="/(tabs)" />;
  return <Redirect href="/(auth)/sign-in" />;
}


