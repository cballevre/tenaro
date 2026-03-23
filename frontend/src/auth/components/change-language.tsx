import { useTranslation } from '@refinedev/core';
import { Form, Select } from 'antd';

import { useUpdateIdentity } from '../hooks/use-update-identity';

const ChangeLanguage = () => {
  const { getLocale, changeLocale, translate } = useTranslation();
  const { identity, update } = useUpdateIdentity();

  console.log('Rendering ChangeLanguage with identity:', identity);

  const handleChange = (value: string) => {
    changeLocale(value);
    update({ language: value });
  };

  return (
    <Form.Item
      label={translate('auth.settings.language.label')}
      layout="vertical"
    >
      <Select
        defaultValue={getLocale()}
        onChange={handleChange}
        options={[
          {
            value: 'en',
            label: <span>{translate('auth.settings.language.list.en')}</span>,
          },
          {
            value: 'fr',
            label: <span>{translate('auth.settings.language.list.fr')}</span>,
          },
        ]}
      />
    </Form.Item>
  );
};

export { ChangeLanguage };
