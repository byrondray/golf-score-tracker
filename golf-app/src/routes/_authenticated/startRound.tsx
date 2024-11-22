import * as React from 'react';
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  friendsQueryOptions,
  createRoundMutationOptions,
  userQueryOptions,
} from '../../lib/api';
import { createFileRoute, useRouter } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/startRound')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const {
    data: user,
    isPending: userIsPending,
    error: userError,
  } = useQuery(userQueryOptions);

  const {
    data: friends,
    isPending: friendsLoading,
    error: friendsError,
  } = useQuery({
    ...friendsQueryOptions(user?.id || ''),
    enabled: !!user?.id,
  });

  const createRoundMutation = useMutation(createRoundMutationOptions);

  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTogglePlayer = (playerId: string) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers((prev) => prev.filter((id) => id !== playerId));
    } else {
      if (selectedPlayers.length >= 3) {
        setErrorMessage('You can only select 3 players.');
      } else {
        setErrorMessage(null);
        setSelectedPlayers((prev) => [...prev, playerId]);
      }
    }
  };

  const handleStartRound = async () => {
    if (selectedPlayers.length !== 3) {
      setErrorMessage('You must select exactly 3 players.');
      return;
    }

    try {
      setErrorMessage(null);

      // Create a new round with the current user and selected players
      const response = await createRoundMutation.mutateAsync({
        players: [user!.id, ...selectedPlayers],
      });

      // Navigate to the round in progress page
      router.navigate({ to: `/rounds/${response.roundId}` });
    } catch (error) {
      setErrorMessage('Failed to start the round. Please try again.');
    }
  };

  if (userIsPending || friendsLoading) return <p>Loading...</p>;
  if (userError || friendsError)
    return <p>Error: {userError?.message || friendsError?.message}</p>;

  return (
    <div className='p-4 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg mt-4 mx-2'>
      <h1 className='text-2xl font-bold mb-4'>Start a New Round</h1>
      <p className='mb-2'>
        Add 3 friends to the round
      </p>
      <ul className='mb-4'>
        {friends?.friends?.map((friend) => (
          <li key={friend?.friends?.id || 'unknown'}>
            <label className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={
                  !!friend?.friends &&
                  selectedPlayers.includes(friend.friends.id)
                }
                onChange={() =>
                  friend?.friends && handleTogglePlayer(friend.friends.id)
                }
              />
              {friend?.friends?.firstName}
            </label>
          </li>
        ))}
      </ul>

      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}

      <button
        onClick={handleStartRound}
        className='px-4 py-2 bg-white text-green-600 rounded hover:bg-green-100'
        disabled={createRoundMutation.isPending}
      >
        {createRoundMutation.isPending ? 'Starting...' : 'Start Round'}
      </button>
    </div>
  );
}
