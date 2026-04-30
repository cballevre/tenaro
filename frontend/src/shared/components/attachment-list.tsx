import {
  DeleteOutlined,
  DownloadOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';
import { useCreate, useDelete, useList, useTranslate } from '@refinedev/core';
import {
  Button,
  Card,
  Col,
  Empty,
  List,
  Row,
  Upload,
  type UploadProps,
} from 'antd';
import type { FC } from 'react';

import { useCurrentBoat } from '@/boats/hooks/use-current-boat';
import { SectionHeader } from '@/shared/components/section-header';
import type { EquipmentAttachment } from '@/shared/types/models';
import { sanitizeFileName } from '@/shared/utils/sanitize-file-name';

export type AttachmentListProps = {
  resource: 'intervention' | 'equipment';
  resourceId?: string;
  type: 'photo' | 'document';
};

const AttachmentList: FC<AttachmentListProps> = ({
  resource,
  resourceId,
  type,
}) => {
  const translate = useTranslate();
  const { data: boat } = useCurrentBoat();

  const attachmentResource = `${resource}_attachments`;
  const boatAttachmentBucket = 'boat_attachments';
  const resourceForeignKey = `${resource}_id`;

  const { data: attachments } = useList<EquipmentAttachment>({
    resource: attachmentResource,
    filters: [
      { field: resourceForeignKey, operator: 'eq', value: resourceId },
      { field: 'type', operator: 'eq', value: type },
    ],
  });

  const { mutate: createAttachment } = useCreate({
    resource: attachmentResource,
  });

  const { mutate: deleteAttachment } = useDelete();

  const upload: UploadProps['customRequest'] = async ({
    file,
    onSuccess,
    onError,
  }) => {
    /* @TODO: Implement upload attachment */
    throw "Upload not implemented";

    /* try {
      const uploadedFile = file as File;
      const safeName = sanitizeFileName(uploadedFile.name);
      const filePath = `${boat?.data?.id}/${resource}s/${resourceId}/attachments/${Date.now()}_${safeName}`;

      

      if (uploadError) {
        throw new Error(`Error uploading file: ${uploadError.message}`);
      }

      createAttachment({
        values: {
          [resourceForeignKey]: resourceId,
          file_name: uploadedFile.name,
          file_path: filePath,
          file_type: uploadedFile.type,
          type,
        },
      });
      onSuccess?.('File uploaded successfully!'); 
    } catch (error) {
      console.error('Upload failed:', error);
      onError?.(error as Error);
    } */
  };

  const onDownload = async (attachment: EquipmentAttachment) => {
    /* @TODO: Implement download attachment */
    throw "Download not implemented";

    /* if (error) {
      console.error(`Error creating signed URL: ${error.message}`);
      return;
    }

    if (data?.signedUrl) {
      const link = document.createElement('a');
      link.href = data.signedUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } */
  };

  const onDelete = async (attachment: EquipmentAttachment) => {
    /* @TODO: Implement delete equiment attachment */
    throw "Delete not implemented";
  };

  if (attachments?.data.length === 0) {
    return (
      <section>
        <SectionHeader title={translate(`shared.attachments.${type}.title`)} />
        <Card>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={translate(`shared.attachments.${type}.empty`)}
          >
            <Upload
              accept={type === 'photo' ? 'image/*' : 'application/pdf'}
              showUploadList={false}
              customRequest={upload}
            >
              <Button>{translate(`shared.attachments.${type}.add`)}</Button>
            </Upload>
          </Empty>
        </Card>
      </section>
    );
  }

  return (
    <section>
      <SectionHeader title={translate(`shared.attachments.${type}.title`)} />
      <List
        grid={{ gutter: 8, column: 1 }}
        itemLayout="horizontal"
        dataSource={attachments?.data || []}
        renderItem={(item) => (
          <List.Item>
            <Card style={{ width: '100%' }} size="small">
              <Row align="middle">
                <Col flex="auto">
                  <List.Item.Meta title={item.file_name} />
                </Col>
                <Col flex="none">
                  <Button
                    title={translate('shared.attachments.download')}
                    icon={<DownloadOutlined />}
                    onClick={() => onDownload(item)}
                  />
                  <Button
                    title={translate('shared.attachments.delete')}
                    icon={<DeleteOutlined />}
                    onClick={() => onDelete(item)}
                    style={{ marginLeft: '8px' }}
                    danger
                  />
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
      <Upload
        accept={type === 'photo' ? 'image/*' : 'application/pdf'}
        showUploadList={false}
        customRequest={upload}
      >
        <Button type="link" icon={<PaperClipOutlined />}>
          {translate(`shared.attachments.${type}.add`)}
        </Button>
      </Upload>
    </section>
  );
};

export { AttachmentList };
