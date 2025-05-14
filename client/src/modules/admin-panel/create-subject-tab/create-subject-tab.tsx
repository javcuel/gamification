import React, { useState } from 'react';
import { SubjectCreate } from '../../shared/api/domain/subject';
import Button from '../../shared/components/ui/button';
import Toast from '../../shared/components/ui/toast';
import Input from '../../shared/components/ui/input';
import useCreateSubject from './hooks/use-create-subject';

import '../styles/admin-add-card.css';
import LoadingMsg from '../../shared/components/ui/loading-msg';
import { z } from 'zod';

const CreateSubjectTab: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [img, setImg] = useState<string>('');
  const [imgBackground, setImgBackground] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const { createSubject, error, success, loading } = useCreateSubject();

  const createSubjectSchema = z.object({
    name: z.string().min(1, 'Subject name is required'),
    img: z.string().min(1, 'Subject image is required'),
    imgBackground: z.string().min(1, 'Subject background image is required'),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation

    setValidationError(null);
    const validationResult = createSubjectSchema.safeParse({
      name,
      img,
      imgBackground,
    });

    if (!validationResult.success) {
      const firstError =
        validationResult.error.errors[0]?.message || 'Unknown error';
      setValidationError(firstError);
      return;
    }

    // Submit
    const newSubject = new SubjectCreate(name, img, imgBackground);

    await createSubject(newSubject);

    setName('');
    setImg('');
    setImgBackground('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column align-items-center justify-content-center gap-3 mx-auto"
      style={{ width: '100%' }}
    >
      <h3 className="text-center mb-4">Create Subject</h3>
      <Input
        placeholder="Subject Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Subject Img"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Subject Back Img"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Button text="Create" />

      {error && <Toast type="error" message={error} />}
      {validationError && <Toast type="error" message={validationError} />}
      {success && <Toast type="success" message={'Subject created!'} />}
      {loading && <LoadingMsg message="Creating new subject..." />}
    </form>
  );
};

export default CreateSubjectTab;
