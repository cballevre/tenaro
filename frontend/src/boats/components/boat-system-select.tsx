import { useTranslate } from '@refinedev/core';
import { Select } from 'antd';
import type { FC } from 'react';

import { boatSystemList } from '@/boats/utils/boat-system';

interface BoatSystemSelectProps {
  value?: string;
  name?: string;
  onChange?: (value: string) => void;
}

const BoatSystemSelect: FC<BoatSystemSelectProps> = ({ value, onChange }) => {
  const translate = useTranslate();

  const options = boatSystemList.map((key) => ({
    value: key,
    label: translate(`boats.systems.list.${key}.name`),
  }));

  return (
    <Select
      showSearch
      placeholder={translate('boats.systems.select.placeholder')}
      optionFilterProp="label"
      value={value}
      onChange={onChange}
      options={options}
    />
  );
};

export { BoatSystemSelect };
