import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Center, Heading, Spinner, Text, VStack } from 'native-base';
import { supabase } from '@/lib/db';

function HealthCheck() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['health-check'],
    queryFn: async () => {
      try {
        // Test basic connectivity
        const { data: healthData, error: healthError } = await supabase
          .from('customers')
          .select('id', { count: 'exact', head: true });
        
        if (healthError) {
          return { 
            connected: false, 
            error: healthError.message,
            environment: process.env.EXPO_PUBLIC_SUPABASE_URL?.includes('staging') ? 'STAGING' : 'PRODUCTION'
          };
        }
        
        return {
          connected: true,
          customerCount: healthData?.length ?? 0,
          environment: process.env.EXPO_PUBLIC_SUPABASE_URL?.includes('staging') ? 'STAGING' : 'PRODUCTION'
        };
      } catch (err: any) {
        return {
          connected: false,
          error: err.message || 'Connection failed',
          environment: 'UNKNOWN'
        };
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner accessibilityLabel="Checking connection" />
        <Text mt={2}>Checking database connection...</Text>
      </Center>
    );
  }

  const isConnected = data?.connected;
  const environment = data?.environment || 'UNKNOWN';
  const errorMessage = data?.error || error?.message;

  return (
    <VStack flex={1} p={4} space={4}>
      <Heading size="lg" textAlign="center">Health Check</Heading>
      
      <Box 
        borderWidth={1} 
        borderColor={isConnected ? "green.200" : "red.200"} 
        borderRadius="md" 
        p={4}
        bg={isConnected ? "green.50" : "red.50"}
      >
        <VStack space={2}>
          <Text fontWeight="bold" color={isConnected ? "green.700" : "red.700"}>
            Status: {isConnected ? '✅ Connected' : '❌ Disconnected'}
          </Text>
          
          <Text>
            Environment: <Text fontWeight="bold">{environment}</Text>
          </Text>
          
          {isConnected ? (
            <Text>
              Customer Count: <Text fontWeight="bold">{data?.customerCount ?? 'N/A'}</Text>
            </Text>
          ) : (
            <Text color="red.600">
              Error: {errorMessage}
            </Text>
          )}
          
          <Text fontSize="sm" color="coolGray.600" mt={2}>
            URL: {process.env.EXPO_PUBLIC_SUPABASE_URL?.replace(/\/\/.*@/, '//***@') || 'Not set'}
          </Text>
        </VStack>
      </Box>
      
      <Box borderWidth={1} borderColor="coolGray.200" borderRadius="md" p={4}>
        <Text fontSize="sm" color="coolGray.600">
          This screen tests connectivity to the Supabase database. 
          It should show "Connected to STAGING" when properly configured.
        </Text>
      </Box>
    </VStack>
  );
}

export default HealthCheck;
