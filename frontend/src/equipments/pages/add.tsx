import { Create, useForm } from '@refinedev/antd';
import { useGo, useTranslate } from '@refinedev/core';

import { useCurrentBoat } from '@/boats/hooks/use-current-boat';
import { EquipmentForm } from '@/equipments/components/equipment-form';
import type { InsertEquipment } from '@/shared/types/models';

interface EquipmentFormValues {
  [key: string]: any;
}

const AddEquipment = () => {
  const { data: boat } = useCurrentBoat();
  const translate = useTranslate();
  const go = useGo();

  const { formProps, saveButtonProps, onFinish } = useForm<InsertEquipment>({
    resource: 'equipments',
    action: 'create',
    redirect: false,
  });

  const handleOnFinish = (values: EquipmentFormValues) => {
    onFinish({
      boat_id: boat?.data.id,
      ...values,
    });
    go({
      to: `/boats/${boat?.data.id}/equipments`,
      type: 'replace',
    });
  };

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title={translate('equipments.add.title')}
    >
      <EquipmentForm formProps={formProps} handleOnFinish={handleOnFinish} />
    </Create>
  );
};

export { AddEquipment };
