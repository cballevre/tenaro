import { useGetIdentity } from '@refinedev/core';

import { supabaseClient } from '@/core/utils/supabaseClient';

const useUpdateIdentity = () => {
  const identity = useGetIdentity<{
    id: string;
    user_metadata?: Record<string, unknown> | null;
  }>();

  const update = async (data: Record<string, unknown>) => {
    supabaseClient.auth.updateUser({
      data: {
        ...identity.data?.user_metadata,
        ...data,
      },
    });
    identity.refetch();
  };

  return { update, identity: identity.data?.user_metadata };
};

export { useUpdateIdentity };
