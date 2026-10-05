import { PlusOutlined } from '@ant-design/icons';
import { Link, useList, useTranslate } from '@refinedev/core';
import { Card, Col, Row } from 'antd';

import { PageHeader } from '@/shared/components/page-header';
import { PageLayout } from '@/shared/components/page-layout';

const ListAsset = () => {
  const { data: assets } = useList({
    resource: 'assets',
  });

  console.log(assets);

  const translate = useTranslate();

  return (
    <PageLayout>
      <PageHeader title={translate('assets.dashboard.title')} />
      <Row gutter={[16, 16]}>
        {assets?.data?.map((asset) => (
          <Col xs={24} sm={12} md={6} key={asset.id}>
            <Link to={`/assets/${asset.id}/dashboard`}>
              <Card hoverable>
                <Card.Meta title={asset.name} description={asset.description} />
              </Card>
            </Link>
          </Col>
        ))}
        <Col xs={24} sm={12} md={6}>
          <Link to="/assets/add">
            <Card hoverable style={{ textAlign: 'center' }}>
              <PlusOutlined style={{ fontSize: 24 }} />
              <span style={{ marginLeft: 16 }}>
                {translate('assets.list.add')}
              </span>
            </Card>
          </Link>
        </Col>
      </Row>
    </PageLayout>
  );
};

export { ListAsset };
