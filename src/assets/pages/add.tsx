import { Create, useForm } from '@refinedev/antd';
import { useGetIdentity, useGo, useTranslate } from '@refinedev/core';
import { Form, Input } from 'antd';

import { PageLayout } from '@/shared/components/page-layout';

const AddBoat = () => {
  const { data: identity } = useGetIdentity<{ id: string }>();
  const go = useGo();

  const { formProps, saveButtonProps, onFinish } = useForm({
    resource: 'boats',
    action: 'create',
    redirect: false,
    successNotification: () => ({
      type: 'success',
      message: translate('boats.add.notification.success.message'),
      description: translate('boats.add.notification.success.description'),
    }),
    errorNotification: () => ({
      type: 'error',
      message: translate('boats.add.notification.error.message'),
      description: translate('boats.add.notification.error.description'),
    }),
    onMutationSuccess: () => {
      go({ to: '/boats', type: 'replace' });
    },
  });

  const handleOnFinish = (values: Record<string, unknown>) => {
    onFinish({
      created_by: identity?.id,
      ...values,
    });
  };

  const translate = useTranslate();

  return (
    <PageLayout>
      <Create
        saveButtonProps={saveButtonProps}
        title={translate('boats.add.title')}
      >
        <Form {...formProps} onFinish={handleOnFinish} layout="vertical">
          <Form.Item
            label={translate('boats.add.form.labels.name')}
            name="name"
            rules={[
              {
                required: true,
                message: translate('boats.add.form.validation.name_required'),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Create>
    </PageLayout>
  );
};

export { AddBoat };
