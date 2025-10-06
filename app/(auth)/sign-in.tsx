import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { Box, Button, Center, FormControl, Heading, Input, VStack, Text } from "native-base";
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
    <Center flex={1} px={4}>
      <Box w="100%" maxW="400">
        <Heading mb="6">Sign in</Heading>
        <VStack space="4">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input value={password} onChangeText={setPassword} secureTextEntry />
          </FormControl>
          {error ? <Text color="red.500">{error}</Text> : null}
          <Button isLoading={submitting} onPress={onSignIn}>Sign In</Button>
          <Text textAlign="center">No account? <Link href="/(auth)/sign-up">Create one</Link></Text>
        </VStack>
      </Box>
    </Center>
  );
}


