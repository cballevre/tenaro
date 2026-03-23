import { Link, useGetIdentity, useTranslation } from '@refinedev/core';
import type { MenuProps } from 'antd';
import { Grid, Layout as LayoutAntd } from 'antd';
import { type FC, useMemo } from 'react';

import { LogoutButton } from '@/auth/components/logout-button';

const { Header, Content, Footer } = LayoutAntd;
const { useBreakpoint } = Grid;

export type MenuItem = Required<MenuProps>['items'][number];
interface LayoutProps {
  children: React.ReactNode;
}

const AppLayout: FC<LayoutProps> = ({ children }) => {
  const screens = useBreakpoint();
  const identity = useGetIdentity<{
    id: string;
    user_metadata?: Record<string, unknown> | null;
  }>();
  const { translate, changeLocale, getLocale } = useTranslation();

  useMemo(() => {
    const userLanguage = identity.data?.user_metadata?.language as string;
    if (userLanguage && userLanguage !== getLocale()) {
      changeLocale(userLanguage);
    }
  }, [identity, changeLocale, getLocale]);

  return (
    <LayoutAntd style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: screens.sm ? '0 50px' : '0 16px',
        }}
      >
        <Link
          to="/"
          style={{ color: 'white', fontSize: '24px', marginRight: '20px' }}
        >
          <span>Vessel</span>
          <span style={{ color: '#1890ff' }}>Vigil</span>
        </Link>
        <Link
          to="/settings"
          style={{ color: 'white', marginRight: '20px', marginLeft: 'auto' }}
        >
          {translate('core.settings')}
        </Link>
        <LogoutButton />
      </Header>
      <Content>{children}</Content>
      <Footer style={{ textAlign: 'center' }}>
        &copy; {new Date().getFullYear()} VesselVigil created by
        <a style={{ marginLeft: 4 }} href="https://cballevre.net">
          Célestin
        </a>
      </Footer>
    </LayoutAntd>
  );
};

export { AppLayout };
