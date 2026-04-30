import { useTranslate, useUpdate } from '@refinedev/core';
import { Button, Col, Form, Input, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { BoatDeleteButton } from '@/boats/components/boat-delete-button';
import { SettingsLayout } from '@/boats/components/settings-layout';
import { useCurrentBoat } from '@/boats/hooks/use-current-boat';
import { SectionHeader } from '@/shared/components/section-header';

const CommonSettings = () => {
  const translate = useTranslate();
  const { boatId } = useParams();
  const { data, isLoading } = useCurrentBoat();
  const [name, setName] = useState('');
  const { mutate, isLoading: isUpdating } = useUpdate();

  useEffect(() => {
    if (data?.data?.name) {
      setName(data.data.name);
    }
  }, [data]);

  const handleSave = () => {
    if (!name.trim()) return;
    mutate({
      resource: 'boats',
      id: boatId,
      values: { name },
      successNotification: () => ({
        message: translate('settings.common.rename.success'),
        type: 'success',
      }),
      errorNotification: () => ({
        message: translate('settings.common.rename.error'),
        type: 'error',
      }),
    });
  };

  return (
    <SettingsLayout title={translate('settings.common.title')}>
      <Form layout="vertical" onFinish={handleSave}>
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <Form.Item label={translate('settings.common.rename.label')}>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading || isUpdating}
              />
            </Form.Item>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              loading={isUpdating}
              disabled={!name.trim() || isLoading || isUpdating}
            >
              {translate('settings.common.rename.save')}
            </Button>
          </Col>
        </Row>
      </Form>
      <SectionHeader
        title={translate('settings.common.dangerZone.title')}
        subtitle={translate('settings.common.dangerZone.description')}
      />
      <BoatDeleteButton />
    </SettingsLayout>
  );
};

export { CommonSettings };
