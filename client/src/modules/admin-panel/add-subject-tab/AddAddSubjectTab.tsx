import React, { useState } from 'react';
import Input from '../../shared/components/ui/input';
import Button from '../../shared/components/ui/button';
import ErrorMsg from '../../shared/components/ui/error-msg';
import SuccessMsg from '../../shared/components/ui/success-msg';
import useAddSubject from './hooks/use-add-subject';

import '../styles/AdminAddCard.css';

const AdminAddSubjectTab: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [img, setImg] = useState<string>('');
  const [imgBackground, setImgBackground] = useState<string>('');

  const { addSubject, error, success } = useAddSubject();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      img,
      imgBackground,
    };

    await addSubject(payload);

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
      <h3 className="text-center mb-4"> Add Subject</h3>
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

      <Button text="Add Subject" />

      {error && <ErrorMsg message={error}></ErrorMsg>}
      {success && <SuccessMsg message={'Subject created'}></SuccessMsg>}
    </form>
  );
};

export default AdminAddSubjectTab;
