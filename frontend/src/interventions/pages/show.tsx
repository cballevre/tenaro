import { Link, useOne, useTranslate } from '@refinedev/core';
import { Button, Card, Typography } from 'antd';
import { useParams } from 'react-router';

import { useCurrentBoat } from '@/boats/hooks/use-current-boat';
import { AttachmentList } from '@/shared/components/attachment-list';
import { MarkdownRender } from '@/shared/components/markdown-render';
import { PageHeader } from '@/shared/components/page-header';
import { getCostCalculationString } from '../utils/cost';

const ShowIntervention = () => {
  const { data: boat } = useCurrentBoat();
  const { interventionId } = useParams();
  const { data: intervention } = useOne({
    resource: 'interventions',
    id: interventionId as string,
  });

  const translate = useTranslate();

  return (
    <>
      <PageHeader
        title={translate('interventions.show.title')}
        actions={
          <Link
            to={`/boats/${boat?.data.id}/interventions/${interventionId}/edit`}
          >
            <Button type="primary">
              {translate('interventions.show.edit')}
            </Button>
          </Link>
        }
        back={translate('interventions.show.back')}
      />
      <Card>
        <Typography.Paragraph>
          <strong>{translate('interventions.form.labels.title')}: </strong>
          {intervention?.data.title}
        </Typography.Paragraph>
        {intervention?.data.total_cost ? (
          <>
            <Typography.Paragraph style={{ marginBottom: 0 }}>
              <strong>{translate('interventions.show.total_cost')}: </strong>
              {intervention.data.total_cost} €
            </Typography.Paragraph>
            <Typography.Paragraph type="secondary">
              {getCostCalculationString({
                supplyCost: intervention.data.supply_cost,
                laborCost: intervention.data.labor_cost,
                totalCost: intervention.data.total_cost,
                translate,
              })}
            </Typography.Paragraph>
          </>
        ) : null}
        {intervention?.data.description ? (
          <>
            <Typography.Title level={5}>
              {translate('interventions.form.labels.description')}:
            </Typography.Title>
            <MarkdownRender content={intervention.data.description} />
          </>
        ) : null}
      </Card>
      <AttachmentList
        resource="intervention"
        resourceId={interventionId}
        type="photo"
      />
      <AttachmentList
        resource="intervention"
        resourceId={interventionId}
        type="document"
      />
    </>
  );
};

export { ShowIntervention };
