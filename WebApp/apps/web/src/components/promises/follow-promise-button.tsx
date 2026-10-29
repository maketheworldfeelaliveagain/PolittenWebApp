import { Heart } from 'lucide-react';
import { useFollowedPromises } from '@/hooks/use-followed-promises';

export function FollowPromiseButton({ promiseId, compact = false }: { promiseId: string; compact?: boolean }) {
  const { followedIds, isReady, toggleFollow } = useFollowedPromises();
  const isFollowing = followedIds.includes(promiseId);

  return (
    <button
      className={`follow-button${isFollowing ? ' is-following' : ''}${compact ? ' follow-button-compact' : ''}`}
      type="button"
      aria-pressed={isFollowing}
      aria-label={isFollowing ? 'Nebesekti pažado' : 'Sekti pažadą'}
      disabled={!isReady}
      onClick={() => toggleFollow(promiseId)}
    >
      <Heart size={16} fill={isFollowing ? 'currentColor' : 'none'} />
      {!compact && (isFollowing ? 'Sekamas' : 'Sekti pažadą')}
    </button>
  );
}
