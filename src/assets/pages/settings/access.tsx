import { useTranslate } from '@refinedev/core';

import { AccessList } from '@/assets/components/access-list';
import { SettingsLayout } from '@/assets/components/settings-layout';

const AccessSettings = () => {
  const translate = useTranslate();

  return (
    <SettingsLayout title={translate('settings.access.title')}>
      <AccessList />
    </SettingsLayout>
  );
};

export { AccessSettings };
