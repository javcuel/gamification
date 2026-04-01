// use-content-actions.ts
import { useState } from 'react';
import { contentRepository } from '../../../shared/api/repository/content.repository';

interface ContentActionsProps {
    onLinkSuccess?: (gameId: number) => void;
    onUnlinkSuccess?: (gameId: number) => void;
}

const useContentActions = ({ onLinkSuccess, onUnlinkSuccess }: ContentActionsProps = {}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const linkGame = async (subjectId: number, gameId: number) => {
        setLoading(true);
        setError(null);
        try {
            await contentRepository.link(subjectId, gameId);
            if (onLinkSuccess) onLinkSuccess(gameId);
        } catch (err: any) {
            setError(err.message || 'Error linking game');
        } finally {
            setLoading(false);
        }
    };

    const unlinkGame = async (subjectId: number, gameId: number) => {
        setLoading(true);
        setError(null);
        try {
            await contentRepository.unlink(subjectId, gameId);
            if (onUnlinkSuccess) onUnlinkSuccess(gameId);
        } catch (err: any) {
            setError(err.message || 'Error unlinking game');
        } finally {
            setLoading(false);
        }
    };

    return { linkGame, unlinkGame, loading, error };
};

export default useContentActions;