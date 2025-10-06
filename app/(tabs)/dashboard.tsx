import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCounts } from '@/lib/queries';
import { Box, Center, HStack, Spinner, Text, VStack } from 'native-base';

function KpiCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Box borderWidth={1} borderColor="coolGray.200" borderRadius="md" p={4} flex={1}>
      <Text fontSize="sm" color="coolGray.600">{label}</Text>
      <Text fontSize="3xl" fontWeight="bold">{value}</Text>
    </Box>
  );
}

export default function DashboardScreen() {
  const { data, error, isLoading } = useQuery({ queryKey: ['kpis'], queryFn: getCounts });

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner accessibilityLabel="Loading KPIs" />
        <Text mt={2}>Loading KPIs…</Text>
      </Center>
    );
  }

  if (error || data?.error) {
    return (
      <Center flex={1} px={4}>
        <Text color="red.500" textAlign="center">{data?.error ?? 'Failed to load dashboard'}</Text>
      </Center>
    );
  }

  const customers = data?.data?.customers ?? 0;
  const proposals = data?.data?.proposals ?? 0;
  const revenue = data?.data?.revenue ?? 0;

  return (
    <VStack flex={1} space={4} p={4}>
      <HStack space={4}>
        <KpiCard label="Total Customers" value={customers} />
        <KpiCard label="Total Proposals" value={proposals} />
      </HStack>
      <HStack>
        <KpiCard label="Total Revenue" value={`$${revenue.toLocaleString()}`} />
      </HStack>
    </VStack>
  );
}


