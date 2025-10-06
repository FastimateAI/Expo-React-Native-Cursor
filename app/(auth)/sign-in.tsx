import { Link, useRouter } from "expo-router";
import {
  Box, Button, Center, Heading,
  Text,
  VStack
} from "native-base";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSignIn = async () => {
    setSubmitting(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (error) { setError(error.message); return; }
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Center flex={1} px={4}>
          <Box w="100%" maxW="420">
            <Heading mb="16">Sign in</Heading>

            <VStack space="6">
              <View>
                <Text fontWeight="bold" mb="2">Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                  autoFocus
                  placeholder="you@email.com"
                  textContentType="username"
                />
              </View>

              <View>
                <Text fontWeight="bold" mb="2">Password</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholder="••••••••"
                  textContentType="password"
                />
              </View>

              {error ? <Text color="red.500">{error}</Text> : null}

              <Button isLoading={submitting} onPress={onSignIn}>
                Sign In
              </Button>

              <Text textAlign="center">
                No account? <Link href="/(auth)/sign-up">Create one</Link>
              </Text>
            </VStack>
          </Box>
        </Center>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
});
