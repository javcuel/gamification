import { useState } from 'react';
import { Game } from '../../../shared/api/domain/game';
import { gameRepository } from '../../../shared/api/repository/game.repository';

/**
 * useExpandUnlinked hook
 * Manages the state for displaying games not yet linked to a subject.
 */
const useExpandUnlinked = (subjectId: number) => {
    const [unlinkedGames, setUnlinkedGames] = useState<Game[]>([]); 
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const toggleAddMode = async () => {
        const nextState = !isAdding;
        setIsAdding(nextState);
        if (nextState && unlinkedGames.length === 0) {
            setLoading(true);
            setError(null);
            try {
                const data = await gameRepository.getAvailableForSubject(subjectId);
                setUnlinkedGames(data);
            } catch (err: any) {
                setError(err.message || 'Error loading games');
            } finally {
                setLoading(false);
            }
        }
    };
	
    return { unlinkedGames, setUnlinkedGames, isAdding, loading, error, toggleAddMode };
};

export default useExpandUnlinked;