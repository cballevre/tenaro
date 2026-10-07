import { useGetIdentity } from '@refinedev/core';

const useUpdateIdentity = () => {
  const identity = useGetIdentity<{
    id: string;
    user_metadata?: Record<string, unknown> | null;
  }>();

  const update = async (data: Record<string, unknown>) => {
    /* @TODO : 
      * This is a temporary solution to update the user metadata in the identity.
    {
      data: {
        ...identity.data?.user_metadata,
        ...data,
      },
    });
    identity.refetch();
    */
  };

  return { update, identity: identity.data?.user_metadata };
}

export { useUpdateIdentity }
