import { Outlet } from 'react-router';

import { BoatMenu } from '@/boats/components/boat-menu';
import { PageLayout } from '@/shared/components/page-layout';

const BoatLayout = () => {
  return (
    <>
      <BoatMenu />
      <PageLayout>
        <Outlet />
      </PageLayout>
    </>
  );
};

export { BoatLayout };
