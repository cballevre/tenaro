import { useTranslate } from '@refinedev/core';

import { PageHeader } from '@/shared/components/page-header';

const BoatDashboard = () => {
  const translate = useTranslate();
  return <PageHeader title={translate('boats.dashboard.title')} />;
};

export { BoatDashboard };
