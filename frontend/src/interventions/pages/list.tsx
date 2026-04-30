import { Link, useInfiniteList, useTranslation } from '@refinedev/core';
import { Button, List } from 'antd';
import { Fragment } from 'react/jsx-runtime';

import { useCurrentBoat } from '@/boats/hooks/use-current-boat';
import { PageContent } from '@/shared/components/page-content';
import { PageHeader } from '@/shared/components/page-header';
import { ResourceActionsMenu } from '@/shared/components/resource-actions-menu';
import type { Intervention } from '@/shared/types/models';

const InterventionList = () => {
  const { data: boat } = useCurrentBoat();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteList<Intervention>({
      resource: 'interventions',
      pagination: { pageSize: 50 },
      sorters: [{ field: 'date', order: 'desc' }],
    });

  const { getLocale, translate } = useTranslation();

  return (
    <>
      <PageHeader
        title={translate('interventions.list.title')}
        actions={
          <Link to={`/boats/${boat?.data.id}/interventions/add`}>
            <Button type="primary">
              {translate('interventions.list.add')}
            </Button>
          </Link>
        }
      />
      <PageContent>
        {data?.pages?.map(({ data }) => (
          <Fragment
            key={
              data.length > 0
                ? `interventions-page-${data[0].id}`
                : 'interventions-page-empty'
            }
          >
            {data.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(intervention) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <Link
                          to={`/boats/${boat?.data.id}/interventions/${intervention.id}`}
                        >
                          {intervention.title}
                        </Link>
                      }
                      description={
                        intervention.date
                          ? translate('interventions.list.subtitle', {
                              date: new Date(
                                intervention.date,
                              ).toLocaleDateString(getLocale(), {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              }),
                            })
                          : null
                      }
                    />
                    <ResourceActionsMenu
                      resource="interventions"
                      resourceId={intervention.id}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <p>{translate('interventions.list.empty')}</p>
            )}
          </Fragment>
        ))}
      </PageContent>
      {hasNextPage ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '16px',
          }}
        >
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage
              ? translate('common.loading_more')
              : translate('common.load_more')}
          </Button>
        </div>
      ) : null}
    </>
  );
};

export { InterventionList };
