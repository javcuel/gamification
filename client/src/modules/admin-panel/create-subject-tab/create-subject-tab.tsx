import React, { useState } from 'react';
import { Subject } from '../../shared/api/domain/subject';
import Button from '../../shared/components/ui/button';
import ErrorMsg from '../../shared/components/ui/error-msg';
import Input from '../../shared/components/ui/input';
import SuccessMsg from '../../shared/components/ui/success-msg';
import useCreateSubject from './hooks/use-create-subject';

import '../styles/admin-add-card.css';
import LoadingMsg from '../../shared/components/ui/loading-msg';

const CreateSubjectTab: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [img, setImg] = useState<string>('');
  const [imgBackground, setImgBackground] = useState<string>('');

  const { createSubject, error, success, loading } = useCreateSubject();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newSubject = new Subject(
      0,
      name,
      img,
      imgBackground,
      0,
      false,
      false
    );

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

      {error && <ErrorMsg message={error}></ErrorMsg>}
      {success && <SuccessMsg message={'Subject created!'}></SuccessMsg>}
      {loading && <LoadingMsg message="Creating new subject..."></LoadingMsg>}
    </form>
  );
};

export default CreateSubjectTab;
