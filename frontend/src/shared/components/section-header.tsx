import { Typography } from 'antd';
import type { FC } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <header style={{ marginBottom: 16 }}>
      <Typography.Title
        level={2}
        style={{ marginBottom: 0, fontSize: 18, lineHeight: 1.5 }}
      >
        {title}
      </Typography.Title>
      {subtitle ? (
        <Typography.Text style={{ color: 'var(--text-secondary-color)' }}>
          {subtitle}
        </Typography.Text>
      ) : null}
    </header>
  );
};

export { SectionHeader };
