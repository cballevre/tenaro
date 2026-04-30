import { useTranslate } from '@refinedev/core';

import { AccessList } from '@/boats/components/access-list';
import { SettingsLayout } from '@/boats/components/settings-layout';

const AccessSettings = () => {
  const translate = useTranslate();

  return (
    <SettingsLayout title={translate('settings.access.title')}>
      <AccessList />
    </SettingsLayout>
  );
};

export { AccessSettings };
