import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { useDelete, useGo, useTranslate } from '@refinedev/core';
import { Button, Dropdown, type MenuProps, Modal } from 'antd';
import type { FC } from 'react';

import { useCurrentBoat } from '@/boats/hooks/use-current-boat';

interface ResourceActionsMenuProps {
  resource: string;
  resourceId: string;
}

const ResourceActionsMenu: FC<ResourceActionsMenuProps> = ({
  resource,
  resourceId,
}) => {
  const translate = useTranslate();
  const { data: boat } = useCurrentBoat();
  const go = useGo();

  const { mutate: deleteEquipment } = useDelete();

  const handleDelete = () => {
    Modal.confirm({
      title: translate('shared.actions_menu.delete.confirm.title'),
      content: translate('shared.actions_menu.delete.confirm.content', {
        resource: translate(`${resource}.single`),
      }),
      okText: translate('common.delete'),
      cancelText: translate('common.cancel'),
      okType: 'danger',
      onOk: () => {
        deleteEquipment({
          resource,
          id: resourceId,
        });
      },
    });
  };

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'edit') {
      go({
        to: `/boats/${boat?.data?.id}/${resource}/${resourceId}/edit`,
      });
    } else if (key === 'delete') {
      handleDelete();
    }
  };

  const items: MenuProps['items'] = [
    {
      label: translate('common.edit'),
      key: 'edit',
      icon: <EditOutlined />,
    },
    {
      label: translate('common.delete'),
      key: 'delete',
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Dropdown menu={menuProps} trigger={['click']}>
      <Button icon={<MoreOutlined />} title={translate('common.more')} />
    </Dropdown>
  );
};

export { ResourceActionsMenu };
