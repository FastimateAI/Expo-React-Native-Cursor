import React, { useState } from "react";
import { Link } from "expo-router";
import { Box, Button, Center, FormControl, Heading, Input, VStack, Text } from "native-base";
import { supabase } from "../../lib/supabase";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSignUp = async () => {
    setSubmitting(true);
    setError(null);
    setMessage(null);
    const { error } = await supabase.auth.signUp({ email, password });
    setSubmitting(false);
    if (error) { setError(error.message); return; }
    setMessage("Check your email to confirm, then sign in.");
  };

  return (
    <Center flex={1} px={4}>
      <Box w="100%" maxW="400">
        <Heading mb="6">Create account</Heading>
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
          {message ? <Text color="emerald.500">{message}</Text> : null}
          <Button isLoading={submitting} onPress={onSignUp}>Sign Up</Button>
          <Text textAlign="center">Already have an account? <Link href="/(auth)/sign-in">Sign in</Link></Text>
        </VStack>
      </Box>
    </Center>
  );
}


