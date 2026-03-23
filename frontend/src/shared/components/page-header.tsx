import { ArrowLeftOutlined } from '@ant-design/icons';
import { useBack } from '@refinedev/core';
import { Button, Grid, Typography } from 'antd';
import type { FC } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  back?: string;
}

const { useBreakpoint } = Grid;

const PageHeader: FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
  back,
}) => {
  const screens = useBreakpoint();
  const backFn = useBack();

  return (
    <header style={{ marginBottom: '24px' }}>
      {back ? (
        <Button
          type="link"
          style={{ marginBottom: '16px' }}
          onClick={() => backFn()}
          icon={<ArrowLeftOutlined />}
        >
          {back}
        </Button>
      ) : null}
      <div
        style={{
          display: 'flex',
          flexDirection: screens.sm ? 'row' : 'column',
          justifyContent: 'space-between',
          alignItems: screens.sm ? 'center' : 'flex-start',
        }}
      >
        <div>
          <Typography.Title
            level={1}
            style={{
              marginBlockStart: 0,
              fontSize: '20px',
              lineHeight: 1.4,
              marginBlockEnd: 0,
            }}
          >
            {title}
          </Typography.Title>
          {subtitle ? (
            <Typography.Text style={{ color: '#555555' }}>
              {subtitle}
            </Typography.Text>
          ) : null}
        </div>
        {actions ? (
          <div style={{ marginTop: screens.sm ? 0 : '16px' }}>{actions}</div>
        ) : null}
      </div>
    </header>
  );
};

export { PageHeader };
