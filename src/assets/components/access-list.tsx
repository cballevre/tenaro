import { type HttpError, useList, useTranslate } from '@refinedev/core';
import { Button, Empty, List } from 'antd';
import { useState } from 'react';

import type { Access } from '@/shared/types/models';
import { AddAccess } from './add-access';

const AccessList = () => {
  const {
    data: accesses,
    isLoading,
    isError,
  } = useList<Access, HttpError>({
    resource: 'accesses',
  });

  const translate = useTranslate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddAccess = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  if (accesses.data.length === 0) {
    return (
      <>
        <Empty description={translate('settings.access.empty.description')}>
          <Button type="primary" onClick={handleAddAccess}>
            {translate('settings.access.empty.action')}
          </Button>
        </Empty>
        <AddAccess open={isModalOpen} onCancel={handleCancel} />
      </>
    );
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={accesses.data}
      renderItem={(access) => (
        <List.Item>
          <List.Item.Meta title={`User ID: ${access.user_id}`} />
        </List.Item>
      )}
    />
  );
};

export { AccessList };
