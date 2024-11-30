import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useMatch } from '@tanstack/react-router';
import { roundDetailsQueryOptions } from '../../../lib/api';

export const Route = createFileRoute('/_authenticated/roundSummary/$roundId')({
  component: RouteComponent,
});

function RouteComponent() {
  const match = useMatch({ from: '/_authenticated/roundSummary/$roundId' });
  const { roundId } = match.params;

  const {
    data: roundDetails,
    isLoading,
    error,
  } = useQuery(roundDetailsQueryOptions(roundId));

  if (isLoading) return <p>Loading round details...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  const sortedPlayers = roundDetails?.round.players.sort(
    (a, b) => Number(b.score) - Number(a.score)
  );

  return (
    <div className='p-4 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg mt-4 mx-2'>
      <h1 className='text-2xl font-bold mb-4'>Round Summary</h1>

      <h2 className='text-xl font-semibold mb-2'>Players</h2>
      <ul className='mb-4'>
        {sortedPlayers?.map((player, index) => (
          <li
            key={player.userId}
            className={`flex justify-between items-center p-2 rounded ${
              index === 0
                ? 'bg-yellow-500 text-black'
                : 'bg-white text-green-600'
            } mb-2`}
          >
            <span>{player.firstName}</span>
            <span>Total Score: {player.score}</span>
          </li>
        ))}
      </ul>

      <div className='flex justify-end'>
        <button
          className='px-4 py-2 bg-white text-green-600 rounded hover:bg-green-100'
          onClick={() => alert('Navigate to home or another page.')}
        >
          Finish
        </button>
      </div>
    </div>
  );
}
