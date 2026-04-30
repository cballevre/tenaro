import { useOne } from '@refinedev/core';
import { useParams } from 'react-router';

const useCurrentBoat = () => {
  const { boatId } = useParams<{ boatId: string }>();
  const boatRequest = useOne({ resource: 'boats', id: boatId });

  return boatRequest;
};

export { useCurrentBoat };
