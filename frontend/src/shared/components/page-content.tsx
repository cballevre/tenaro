import type { FC, PropsWithChildren } from 'react';

const PageContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      style={{ padding: '0px 16px', background: '#fff', borderRadius: '8px' }}
    >
      {children}
    </div>
  );
};

export { PageContent };
