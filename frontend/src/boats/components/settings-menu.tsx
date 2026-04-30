import { useGo, useTranslate } from '@refinedev/core';
import { Menu } from 'antd';
import { useLocation } from 'react-router';

import type { MenuItem } from '@/boats/components/boat-menu';

const items: MenuItem[] = [
  {
    key: 'common',
  },
  {
    key: 'access',
  },
];

const SettingsMenu = () => {
  const { pathname } = useLocation();
  const go = useGo();
  const translate = useTranslate();

  const keys = pathname.split('/').filter(Boolean);

  const onItemClick = (e: { key: string }) => {
    if (e.key === 'common') {
      go({
        to: `/boats/${keys[1]}/settings`,
      });
    } else {
      go({
        to: `/boats/${keys[1]}/settings/${e.key}`,
      });
    }
  };

  const translatedItems = items.map((item) =>
    item
      ? {
          ...item,
          label: translate(`settings.menu.${item.key}`),
        }
      : item,
  );

  const selectedKey = keys[3] || 'common';

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      items={translatedItems}
      onClick={onItemClick}
    />
  );
};

export { SettingsMenu };
