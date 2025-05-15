import React, { useState } from 'react';
import { z } from 'zod';
import { GameUpdate } from '../../../shared/api/domain/game';
import Button from '../../../shared/components/ui/button';
import Dropdown from '../../../shared/components/ui/dropdown';
import Input from '../../../shared/components/ui/input';
import Toast from '../../../shared/components/ui/toast';
import '../../styles/edit-modal.css';
import useSubjectsTab from '../hooks/use-subjects-tab';

interface GameEditModalProps {
  data: GameUpdate;
  onClose: () => void;
  onSave: (data: GameUpdate) => void;
}

const GameEditModal: React.FC<GameEditModalProps> = ({
  data,
  onClose,
  onSave,
}) => {
  const [idSubject, setIdSubject] = useState(data.idSubject);
  const [name, setName] = useState(data.name);
  const [img, setImg] = useState(data.img);
  const [maxScore, setMaxScore] = useState<string>(String(data.maxScore));
  const [validationError, setValidationError] = useState<string | null>(null);

  const updateGameSchema = z.object({
    name: z.string().min(1, 'Game name is required'),
    img: z.string().min(1, 'Game image is required'),
    maxScore: z.number().min(1, 'Max score must be a positive number'),
  });

  const { subjects, error: subjectsError } = useSubjectsTab();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    setValidationError(null);

    const parsedScore = parseFloat(maxScore);
    if (isNaN(parsedScore)) {
      setValidationError('Max score must be a valid number');
      return;
    }

    const validationResult = updateGameSchema.safeParse({
      name,
      img,
      maxScore: parsedScore,
    });

    if (!validationResult.success) {
      const firstError =
        validationResult.error.errors[0]?.message || 'Unknown error';
      setValidationError(firstError);
      return;
    }

    // Submit
    onSave({ idSubject, name, img, maxScore: parsedScore });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="text-center mb-3">Edit Game</h3>
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
            placeholder="Max Score"
            type="text"
            value={maxScore}
            onChange={(e) => setMaxScore(e.target.value)}
          />
          <Dropdown
            options={subjects.map((s) => s.name)}
            placeholder="Select Subject"
            onChange={(selectedName) => {
              const selected = subjects.find((s) => s.name === selectedName);
              if (selected) setIdSubject(selected.id);
            }}
          />

          <div className="d-flex justify-content-between mt-3">
            <Button text="Cancel" onClick={onClose} />
            <Button text="Save" />

            {subjectsError && <Toast type="error" message={subjectsError} />}

            {validationError && (
              <Toast type="error" message={validationError} />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default GameEditModal;
