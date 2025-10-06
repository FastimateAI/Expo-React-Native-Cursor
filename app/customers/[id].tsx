import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { fetchCustomerById, fetchCustomerProposals } from '@/lib/queries';
import { Box, Center, HStack, Heading, Spinner, Text, VStack } from 'native-base';

export default function CustomerDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const customerQuery = useQuery({ queryKey: ['customer', id], queryFn: () => fetchCustomerById(String(id)) });
  const proposalsQuery = useQuery({ queryKey: ['customer-proposals', id], queryFn: () => fetchCustomerProposals(String(id), 10) });

  if (customerQuery.isLoading || proposalsQuery.isLoading) {
    return (
      <Center flex={1}>
        <Spinner accessibilityLabel="Loading customer" />
        <Text mt={2}>Loading…</Text>
      </Center>
    );
  }

  if (customerQuery.error || customerQuery.data?.error) {
    return (
      <Center flex={1} px={4}>
        <Text color="red.500" textAlign="center">{customerQuery.data?.error ?? 'Failed to load customer'}</Text>
      </Center>
    );
  }

  const customer = customerQuery.data?.data;
  const proposals = proposalsQuery.data?.data ?? [];

  return (
    <VStack flex={1} p={4} space={4}>
      <Box borderWidth={1} borderColor="coolGray.200" borderRadius="md" p={4}>
        <Heading size="md" mb={2}>Customer</Heading>
        {customer ? (
          <VStack space={1}>
            <Text><Text fontWeight="bold">Name: </Text>{customer.name ?? customer.full_name ?? '—'}</Text>
            <Text><Text fontWeight="bold">Email: </Text>{customer.email ?? '—'}</Text>
            <Text><Text fontWeight="bold">Phone: </Text>{customer.phone ?? '—'}</Text>
            <Text><Text fontWeight="bold">Address: </Text>{customer.address ?? '—'}</Text>
          </VStack>
        ) : (
          <Text color="coolGray.500">This data isn’t available yet.</Text>
        )}
      </Box>

      <Box borderWidth={1} borderColor="coolGray.200" borderRadius="md" p={4}>
        <Heading size="md" mb={2}>Recent Proposals</Heading>
        {proposalsQuery.error || proposalsQuery.data?.error ? (
          <Text color="coolGray.500">This data isn’t available yet.</Text>
        ) : proposals.length === 0 ? (
          <Text color="coolGray.500">No proposals.</Text>
        ) : (
          <VStack space={3}>
            {proposals.map((p: any) => (
              <HStack key={p.id} justifyContent="space-between">
                <VStack>
                  <Text fontWeight="bold">#{p.id} {p.title ?? ''}</Text>
                  <Text color="coolGray.600">{p.created_at ? new Date(p.created_at).toLocaleString() : ''}</Text>
                </VStack>
                <VStack alignItems="flex-end">
                  <Text>{p.status ?? '—'}</Text>
                  <Text fontWeight="bold">{typeof p.total === 'number' ? `$${p.total.toFixed(2)}` : p.total ?? '—'}</Text>
                </VStack>
              </HStack>
            ))}
          </VStack>
        )}
      </Box>
    </VStack>
  );
}


