import React, { useState } from 'react';
import Button from '../../../shared/components/ui/button';
import Input from '../../../shared/components/ui/input';
import '../../styles/edit-modal.css';
import { Subject } from '../../../shared/api/domain/subject';

interface SubjectEditModalProps {
  data: Subject;
  onClose: () => void;
  onSave: (data: { name: string; img: string; imgBackground: string }) => void;
}

const SubjectEditModal: React.FC<SubjectEditModalProps> = ({
  data,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(data.name);
  const [img, setImg] = useState(data.img);
  const [imgBackground, setImgBackground] = useState(data.imgBackground);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, img, imgBackground });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="text-center mb-3">Edit Subject</h3>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <Input
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Image"
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />

          <Input
            placeholder="Background Image"
            type="text"
            value={imgBackground}
            onChange={(e) => setImgBackground(e.target.value)}
          />
          <div className="d-flex justify-content-between mt-3">
            <Button text="Cancel" onClick={onClose} />
            <Button text="Save" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectEditModal;
