import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';
import { type ApiRoutes } from '../../../../golf-app-api/my-app/src/app';
import { hc } from 'hono/client';
import { useQuery } from '@tanstack/react-query';
import { roundsListQueryOptions } from '../../lib/api';

export const client = hc<ApiRoutes>('/');

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
});

function Index() {
  const router = useRouter();

  const {
    data: rounds,
    isLoading: roundsLoading,
    error: roundsError,
  } = useQuery(roundsListQueryOptions);

  const handleNavigateToStartRound = () => {
    router.navigate({ to: '/startRound' });
  };

  const handleNavigateToFriends = () => {
    router.navigate({ to: '/friends' });
  };

  const mostRecentRound =
    rounds?.rounds && rounds.rounds.length > 0 ? rounds.rounds.pop() : null;

  return (
    <div className='p-4 flex justify-center my-8'>
      <div className='w-full max-w-md'>
        <div className='p-4 bg-white text-green-600 rounded-lg shadow-lg shadow-slate-400 mb-6'>
          <h1 className='text-2xl font-bold mb-4'>Welcome Home!</h1>
          <div className='flex justify-start'>
            <button
              onClick={handleNavigateToStartRound}
              className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mr-4'
            >
              Start New Round
            </button>
            <button
              onClick={handleNavigateToFriends}
              className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
            >
              Friends
            </button>
          </div>
        </div>

        <div className='p-4 bg-white text-green-600 rounded-lg shadow-lg shadow-slate-400'>
          <h2 className='text-xl font-bold mb-4'>Most Recent Round</h2>

          {roundsLoading ? (
            <p>Loading recent round...</p>
          ) : roundsError ? (
            <p>Error: {roundsError.message}</p>
          ) : mostRecentRound ? (
            <div className='mb-4'>
              <h3 className='text-lg font-bold mt-4 mb-4'>Players:</h3>
              <ul className='mb-4'>
                {mostRecentRound.players.map((player: any) => (
                  <li
                    key={player.userId}
                    className='bg-green-100 px-4 py-2 rounded shadow mb-2'
                  >
                    {player.firstName} (Score: {player.score})
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No recent rounds found. Start one now!</p>
          )}
        </div>
      </div>
    </div>
  );
}
