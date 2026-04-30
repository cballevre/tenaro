import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useTranslate } from '@refinedev/core';
import { Button, DatePicker, Form, Input, Space } from 'antd';
import dayjs from 'dayjs';
import type { FC } from 'react';
import { useState } from 'react';

import { MarkdownEditor } from '@/shared/components/markdown-editor';

interface InterventionFormProps {
  formProps: any;
  handleOnFinish: (values: any) => void;
}

const InterventionForm: FC<InterventionFormProps> = ({
  formProps,
  handleOnFinish,
}) => {
  const translate = useTranslate();
  const [isDetailedCost, setDetailedCost] = useState(false);

  return (
    <Form {...formProps} onFinish={handleOnFinish} layout="vertical">
      <Form.Item
        label={translate('interventions.form.labels.title')}
        name="title"
        rules={[
          {
            required: true,
            message: translate('interventions.form.validation.title_required'),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={translate('interventions.form.labels.date')}
        name="date"
        getValueProps={(value) => ({ value: value ? dayjs(value) : null })}
        rules={[
          {
            required: true,
            message: translate('interventions.form.validation.date_required'),
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label={translate('interventions.form.labels.description')}
        name="description"
      >
        <MarkdownEditor />
      </Form.Item>

      <Form.Item
        label={translate('interventions.form.labels.cost_group.title')}
        style={{ marginBottom: 0 }}
      >
        <div
          style={{
            border: '1px dashed #d9d9d9',
            padding: '16px',
            borderRadius: '8px',
          }}
        >
          <Space
            style={{ marginBottom: isDetailedCost ? 16 : 0 }}
            size="middle"
            align="end"
          >
            <Form.Item
              label={translate('interventions.form.labels.cost_group.total')}
              name="total_cost"
              style={{ marginBottom: 0 }}
            >
              <Input
                type="number"
                step="0.01"
                min={0}
                disabled={isDetailedCost}
              />
            </Form.Item>
            <Button
              icon={
                isDetailedCost ? <ArrowUpOutlined /> : <ArrowDownOutlined />
              }
              title={translate(
                `interventions.form.actions.${isDetailedCost ? 'simplify' : 'breakdown'}_costs`,
              )}
              onClick={() => setDetailedCost(!isDetailedCost)}
            />
          </Space>
          {isDetailedCost ? (
            <div>
              <Space size="middle">
                <Form.Item
                  label={translate(
                    'interventions.form.labels.cost_group.labor',
                  )}
                  name="labor_cost"
                  style={{ marginBottom: 0 }}
                >
                  <Input
                    type="number"
                    step="0.01"
                    min={0}
                    onChange={(e) => {
                      const labor = Number(e.target.value) || 0;
                      const supply =
                        Number(formProps.form.getFieldValue('supply_cost')) ||
                        0;
                      formProps.form.setFieldsValue({
                        total_cost: labor + supply,
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label={translate(
                    'interventions.form.labels.cost_group.supply',
                  )}
                  name="supply_cost"
                  style={{ marginBottom: 0 }}
                >
                  <Input
                    type="number"
                    step="0.01"
                    min={0}
                    onChange={(e) => {
                      const labor =
                        Number(formProps.form.getFieldValue('labor_cost')) || 0;
                      const supply = Number(e.target.value) || 0;
                      formProps.form.setFieldsValue({
                        total_cost: labor + supply,
                      });
                    }}
                  />
                </Form.Item>
              </Space>
            </div>
          ) : null}
        </div>
      </Form.Item>
    </Form>
  );
};

export { InterventionForm };
