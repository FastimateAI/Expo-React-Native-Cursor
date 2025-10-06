import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCustomers } from '@/lib/queries';
import { Box, Button, Center, FlatList, HStack, Spinner, Text, VStack } from 'native-base';
import { useRouter } from 'expo-router';

const PAGE_SIZE = 20;

export default function CustomersListScreen() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ['customers', page],
    queryFn: () => fetchCustomers({ page, pageSize: PAGE_SIZE }),
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner accessibilityLabel="Loading customers" />
        <Text mt={2}>Loading customers…</Text>
      </Center>
    );
  }

  if (error || data?.error) {
    return (
      <Center flex={1} px={4}>
        <Text color="red.500" textAlign="center">{data?.error ?? 'Failed to load customers'}</Text>
      </Center>
    );
  }

  const rows = data?.data?.rows ?? [];
  const total = data?.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <VStack flex={1} p={4} space={4}>
      <FlatList
        data={rows}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={({ item }: any) => (
          <Box
            borderWidth={1}
            borderColor="coolGray.200"
            borderRadius="md"
            p={3}
            mb={2}
            onTouchEnd={() => router.push(`/customers/${item.id}`)}
          >
            <Text fontWeight="bold">{item.name ?? item.full_name ?? `Customer #${item.id}`}</Text>
            <Text color="coolGray.600">{item.email ?? '—'}</Text>
            <Text color="coolGray.600">{item.phone ?? '—'}</Text>
          </Box>
        )}
        ListEmptyComponent={() => (
          <Center py={16}>
            <Text color="coolGray.500">No customers found.</Text>
          </Center>
        )}
      />
      <HStack justifyContent="space-between" alignItems="center">
        <Button isDisabled={page <= 1 || isFetching} onPress={() => setPage((p) => Math.max(1, p - 1))}>
          Prev
        </Button>
        <Text>
          Page {page} / {totalPages}
        </Text>
        <Button isDisabled={page >= totalPages || isFetching} onPress={() => setPage((p) => Math.min(totalPages, p + 1))}>
          Next
        </Button>
      </HStack>
    </VStack>
  );
}


