import { Card, Col, Grid, Row } from 'antd';
import type React from 'react';
import type { ReactNode } from 'react';

import { SettingsMenu } from '@/boats/components/settings-menu';
import { PageHeader } from '@/shared/components/page-header';

interface SettingsLayoutProps {
  children: ReactNode;
  title: string;
}

const { useBreakpoint } = Grid;

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children, title }) => {
  const screens = useBreakpoint();

  return (
    <Row gutter={[16, 16]} wrap={!screens.md}>
      <Col flex={screens.md ? '200px' : 'none'}>
        <SettingsMenu />
      </Col>
      <Col flex={'auto'}>
        <PageHeader title={title} />
        <Card>{children}</Card>
      </Col>
    </Row>
  );
};

export { SettingsLayout };
