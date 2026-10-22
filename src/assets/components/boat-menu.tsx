import { useGo, useTranslate } from '@refinedev/core';
import type { MenuProps } from 'antd';
import { Grid, Menu } from 'antd';
import { useLocation } from 'react-router';

export type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'dashboard',
  },
  {
    key: 'interventions',
  },
  {
    key: 'equipments',
  },
  {
    key: 'settings',
  },
];

const { useBreakpoint } = Grid;

const BoatMenu = () => {
  const { pathname } = useLocation();
  const go = useGo();
  const translate = useTranslate();
  const screens = useBreakpoint();

  const keys = pathname.split('/').filter(Boolean);

  const onItemClick = (e: { key: string }) => {
    go({
      to: `/boats/${keys[1]}/${e.key}`,
    });
  };

  const translatedItems = items.map((item) =>
    item
      ? {
          ...item,
          label: translate(`boats.menu.${item.key}`),
        }
      : item,
  );

  const selectedKey = keys[2] || 'dashboard';

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[selectedKey]}
      items={translatedItems}
      style={{ padding: screens.sm ? '0 32px' : '0' }}
      onClick={onItemClick}
    />
  );
};

export { BoatMenu };
