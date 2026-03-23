import { Edit, useForm } from '@refinedev/antd';
import { useTranslate } from '@refinedev/core';
import { useParams } from 'react-router';

import { EquipmentForm } from '@/equipments/components/equipment-form';
import type { UpdateEquipment } from '@/shared/types/models';

const EditEquipment = () => {
  const { equipmentId } = useParams<{ equipmentId: string }>();
  const translate = useTranslate();
  const { formProps, saveButtonProps, onFinish } = useForm<UpdateEquipment>({
    resource: 'equipments',
    action: 'edit',
    id: equipmentId,
  });

  return (
    <Edit
      title={translate('equipments.edit.title')}
      saveButtonProps={saveButtonProps}
    >
      <EquipmentForm formProps={formProps} handleOnFinish={onFinish} />
    </Edit>
  );
};

export { EditEquipment };
