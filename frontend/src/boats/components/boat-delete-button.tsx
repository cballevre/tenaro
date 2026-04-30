import { useDelete, useGo, useTranslate } from '@refinedev/core';
import { Button, Input, Modal, Typography } from 'antd';
import { useState } from 'react';

import { useCurrentBoat } from '@/boats/hooks/use-current-boat';

export const BoatDeleteButton = () => {
  const { data } = useCurrentBoat();
  const boat = data?.data;
  const boatId = boat?.id;
  const boatName = boat?.name;
  const [visible, setVisible] = useState(false);
  const [inputName, setInputName] = useState('');
  const { mutate, isLoading } = useDelete({});
  const go = useGo();
  const translate = useTranslate();

  const showModal = () => setVisible(true);
  const handleCancel = () => {
    setVisible(false);
    setInputName('');
  };
  const handleDelete = () => {
    if (!boatId) return;
    mutate(
      {
        resource: 'boats',
        id: boatId,
        successNotification: () => ({
          message: translate('settings.common.deleteBoat.success'),
          type: 'success',
        }),
        errorNotification: () => ({
          message: translate('settings.common.deleteBoat.error'),
          type: 'error',
        }),
      },
      {
        onSuccess: () => {
          go({ to: '/boats', type: 'replace' });
        },
      },
    );
  };

  return (
    <>
      <Button danger onClick={showModal} type="primary" disabled={!boatId}>
        {translate('settings.common.deleteBoat.button')}
      </Button>
      <Modal
        title={translate('settings.common.deleteBoat.modalTitle')}
        open={visible}
        onCancel={handleCancel}
        onOk={handleDelete}
        okButtonProps={{
          disabled: inputName !== boatName || isLoading,
        }}
        okText={translate('settings.common.deleteBoat.okText')}
        cancelText={translate('settings.common.deleteBoat.cancelText')}
      >
        <Typography.Paragraph>
          {`${translate('settings.common.deleteBoat.modalText')} `}
          <b>{boatName}</b>
        </Typography.Paragraph>
        <Input
          placeholder={translate('settings.common.deleteBoat.inputPlaceholder')}
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
      </Modal>
    </>
  );
};
