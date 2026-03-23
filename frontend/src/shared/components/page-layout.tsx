import { Grid } from 'antd';
import type { FC, PropsWithChildren } from 'react';

const { useBreakpoint } = Grid;

const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  const screens = useBreakpoint();

  return (
    <div
      style={{
        paddingLeft: screens.sm ? '48px' : '16px',
        paddingRight: screens.sm ? '48px' : '16px',
        marginTop: screens.sm ? '24px' : '16px',
      }}
    >
      {children}
    </div>
  );
};

export { PageLayout };
