import { Edit, useForm } from '@refinedev/antd';
import { useBack, useTranslate } from '@refinedev/core';
import { useParams } from 'react-router';

import { InterventionForm } from '@/interventions/components/intervention-form';
import type { UpdateIntervention } from '@/shared/types/models';

const EditIntervention = () => {
  const { interventionId } = useParams<{ interventionId: string }>();
  const back = useBack();
  const { formProps, saveButtonProps, onFinish } = useForm<UpdateIntervention>({
    resource: 'interventions',
    action: 'edit',
    id: interventionId,
    redirect: false,
  });
  const translate = useTranslate();

  const handleOnFinish = (values: any) => {
    onFinish(values);
    back();
  };

  return (
    <Edit
      title={translate('interventions.edit.title')}
      saveButtonProps={saveButtonProps}
    >
      <InterventionForm formProps={formProps} handleOnFinish={handleOnFinish} />
    </Edit>
  );
};

export { EditIntervention };
