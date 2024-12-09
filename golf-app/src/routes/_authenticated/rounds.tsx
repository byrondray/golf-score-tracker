import * as React from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { roundsListQueryOptions } from '../../lib/api';

export const Route = createFileRoute('/_authenticated/rounds')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const {
    data: rounds,
    isLoading: roundsLoading,
    isFetching,
    error: roundsError,
  } = useQuery(roundsListQueryOptions);

  const handleNavigateToRoundSummary = (roundId: string) => {
    router.navigate({ to: '/roundSummary/$roundId', params: { roundId } });
  };

  const roundsList = rounds?.rounds ?? [];

  if (!roundsLoading && !isFetching && roundsList.length === 0) {
    return (
      <div className='p-4 flex flex-col items-center'>
        <div className='w-full max-w-lg'>
          <h1 className='text-2xl font-bold mb-6'>All Rounds</h1>
          <p>No rounds have been played yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-4 flex flex-col items-center'>
      <div className='w-full max-w-lg'>
        <h1 className='text-2xl font-bold mb-6'>All Rounds</h1>

        {roundsLoading || isFetching ? (
          <p>Loading rounds...</p>
        ) : roundsError ? (
          <p>Error: {roundsError.message}</p>
        ) : (
          <ul className='flex justify-center flex-col items-center w-full'>
            {roundsList.map((round) => (
              <li
                key={round.roundId}
                className='bg-white text-green-600 rounded-lg shadow-lg shadow-slate-400 mb-4 p-4 cursor-pointer hover:bg-green-100 w-full lg:max-w-96'
                onClick={() => handleNavigateToRoundSummary(round.roundId)}
              >
                <h3 className='text-lg font-bold mb-2'>Players:</h3>
                <ul>
                  {round.players.map((player) => (
                    <li
                      key={player.userId}
                      className='bg-green-100 px-4 py-2 rounded shadow mb-2'
                    >
                      {player.firstName} (Score: {player.score})
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
