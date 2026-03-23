import { Create, useForm } from '@refinedev/antd';
import { useGo, useTranslate } from '@refinedev/core';

import { useCurrentBoat } from '@/boats/hooks/use-current-boat';
import { InterventionForm } from '@/interventions/components/intervention-form';

interface InterventionFormValues {
  [key: string]: any;
}

const AddIntervention = () => {
  const { data: boat } = useCurrentBoat();
  const translate = useTranslate();
  const go = useGo();

  const { formProps, saveButtonProps, onFinish } = useForm({
    resource: 'interventions',
    action: 'create',
    redirect: false,
  });

  const handleOnFinish = (values: InterventionFormValues) => {
    onFinish({
      boat_id: boat?.data.id,
      ...values,
    });
    go({
      to: `/boats/${boat?.data.id}/interventions`,
      type: 'replace',
    });
  };

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title={translate('interventions.add.title')}
    >
      <InterventionForm formProps={formProps} handleOnFinish={handleOnFinish} />
    </Create>
  );
};

export { AddIntervention };
