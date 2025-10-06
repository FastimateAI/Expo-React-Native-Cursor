import { supabase } from './db';

export type QueryResult<T> = { data: T | null; error: string | null };

export async function getCounts(): Promise<QueryResult<{ customers: number; proposals: number; revenue: number }>> {
  try {
    // Customers count
    const customersCountPromise = supabase.from('customers').select('*', { count: 'exact', head: true });
    // Proposals count
    const proposalsCountPromise = supabase.from('proposals').select('*', { count: 'exact', head: true });

    const [customersCountRes, proposalsCountRes] = await Promise.all([
      customersCountPromise,
      proposalsCountPromise,
    ]);

    const customers = customersCountRes.count ?? 0;
    const proposals = proposalsCountRes.count ?? 0;

    // Revenue: sum payments.amount; if table/column missing, return 0
    let revenue = 0;
    try {
      const paymentsRes = await supabase.from('payments').select('amount');
      if (paymentsRes.data && Array.isArray(paymentsRes.data)) {
        revenue = paymentsRes.data.reduce((sum: number, row: any) => {
          const value = typeof row.amount === 'number' ? row.amount : Number(row.amount ?? 0);
          return sum + (isFinite(value) ? value : 0);
        }, 0);
      }
    } catch (err) {
      revenue = 0;
    }

    return { data: { customers, proposals, revenue }, error: null };
  } catch (e: any) {
    const message = typeof e?.message === 'string' ? e.message : 'Failed to load KPIs';
    return { data: { customers: 0, proposals: 0, revenue: 0 }, error: message };
  }
}

export async function fetchCustomers({ page, pageSize }: { page: number; pageSize: number }): Promise<QueryResult<{ rows: any[]; total: number }>> {
  try {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    const res = await supabase.from('customers').select('*', { count: 'exact' }).range(from, to).order('id', { ascending: true });
    const total = res.count ?? 0;
    return { data: { rows: res.data ?? [], total }, error: res.error?.message ?? null };
  } catch (e: any) {
    const message = typeof e?.message === 'string' ? e.message : 'Failed to fetch customers';
    return { data: { rows: [], total: 0 }, error: message };
  }
}

export async function fetchCustomerById(id: string): Promise<QueryResult<any>> {
  try {
    const res = await supabase.from('customers').select('*').eq('id', id).maybeSingle();
    return { data: res.data ?? null, error: res.error?.message ?? null };
  } catch (e: any) {
    const message = typeof e?.message === 'string' ? e.message : 'Failed to fetch customer';
    return { data: null, error: message };
  }
}

export async function fetchCustomerProposals(id: string, limit = 10): Promise<QueryResult<any[]>> {
  try {
    const res = await supabase
      .from('proposals')
      .select('*')
      .eq('customer_id', id)
      .order('created_at', { ascending: false })
      .limit(limit);
    return { data: res.data ?? [], error: res.error?.message ?? null };
  } catch (e: any) {
    const message = typeof e?.message === 'string' ? e.message : 'Failed to fetch proposals';
    return { data: [], error: message };
  }
}


