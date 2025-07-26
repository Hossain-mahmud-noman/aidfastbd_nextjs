'use client';

import { Modal, Button } from 'antd';
import { toast } from 'sonner';

const ContacTactModal = ({ contact, open, onClose }) => {
   const handleCopy = async () => {
      try {
         await navigator.clipboard.writeText(contact);
         toast.success('Number copied successfully!');
      } catch (err) {
         toast.error('Failed to copy');
      }
   };

   return (
      <Modal
         title="Contact Number"
         open={open}
         onCancel={onClose}
         footer={[
            <Button key="copy" onClick={
               () => {
                  handleCopy();
                  onClose();
               }
            }>
               Copy
            </Button>,
            <Button onClick={onClose} key="call" type="primary" href={`tel:${contact}`}>
               Call Now
            </Button>,
            <Button key="cancel" onClick={onClose}>
               Cancel
            </Button>,
         ]}
      >
         <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{contact}</p>
      </Modal>
   );
};

export default ContacTactModal;
