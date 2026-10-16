import { Modal } from 'antd';
import type { FC } from 'react';

interface AddAccessProps {
  open: boolean;
  onCancel: () => void;
}

const AddAccess: FC<AddAccessProps> = ({ open, onCancel }) => {
  const handleOk = () => {
    // Handle the OK action here
    console.log('OK clicked');
    onCancel(); // Close the modal after action
  };

  return (
    <Modal
      title="Basic Modal"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export { AddAccess };
