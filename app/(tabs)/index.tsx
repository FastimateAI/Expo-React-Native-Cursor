import React from "react";
import { Button, Center, Heading, VStack, Text } from "native-base";
import { useAuth } from "../../lib/auth";

export default function HomeScreen() {
  const { signOut } = useAuth();

  return (
    <Center flex={1} px={4}>
      <VStack space="4" alignItems="center">
        <Heading>Welcome! 👋</Heading>
        <Text>This is the Home tab. Auth is wired.</Text>
        <Button onPress={signOut}>Sign Out</Button>
      </VStack>
    </Center>
  );
}
