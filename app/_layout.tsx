// app/_layout.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { AuthProvider } from "../lib/auth";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <NativeBaseProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}
