import { useTranslate } from '@refinedev/core';
import { Card } from 'antd';

import { PageHeader } from '@/shared/components/page-header';
import { PageLayout } from '@/shared/components/page-layout';
import { ChangeLanguage } from '../components/change-language';

const SettingsPage = () => {
  const translate = useTranslate();

  return (
    <PageLayout>
      <PageHeader title={translate('auth.settings.title')} />
      <Card>
        <ChangeLanguage />
      </Card>
    </PageLayout>
  );
};

export { SettingsPage };
