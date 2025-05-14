import React, { useState } from 'react';
import { SubjectUpdate } from '../../../shared/api/domain/subject';
import Button from '../../../shared/components/ui/button';
import Input from '../../../shared/components/ui/input';
import '../../styles/edit-modal.css';
import { z } from 'zod';
import Toast from '../../../shared/components/ui/toast';

interface SubjectEditModalProps {
  data: SubjectUpdate;
  onClose: () => void;
  onSave: (data: SubjectUpdate) => void;
}

const SubjectEditModal: React.FC<SubjectEditModalProps> = ({
  data,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(data.name);
  const [img, setImg] = useState(data.img);
  const [imgBackground, setImgBackground] = useState(data.imgBackground);
  const [validationError, setValidationError] = useState<string | null>(null);

  const updateSubjectSchema = z.object({
    name: z.string().min(1, 'Subject name is required'),
    img: z.string().min(1, 'Subject image is required'),
    imgBackground: z.string().min(1, 'Subject background image is required'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    setValidationError(null);
    const validationResult = updateSubjectSchema.safeParse([
      name,
      img,
      imgBackground,
    ]);

    if (!validationResult.success) {
      const firstError =
        validationResult.error.errors[0]?.message || 'Unknown error';
      setValidationError(firstError);
      return;
    }

    // Submit
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
            {validationError && (
              <Toast type="error" message={validationError} />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectEditModal;
