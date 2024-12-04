import * as React from 'react';
import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter, useMatch } from '@tanstack/react-router';
import {
  updateScoreMutationOptions,
  roundDetailsQueryOptions,
} from '../../../lib/api';

export const Route = createFileRoute(
  '/_authenticated/roundInProgress/$roundId'
)({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const match = useMatch({ from: '/_authenticated/roundInProgress/$roundId' });
  const { roundId } = match.params;

  const {
    data: roundDetails,
    isLoading: roundLoading,
    error: roundError,
  } = useQuery(roundDetailsQueryOptions(roundId));
  const [hole, setHole] = useState(1);
  const [scores, setScores] = useState<{ [userId: string]: string }>({});
  const [partners, setPartners] = useState<string[][][]>([]);
  const [currentPartnership, setCurrentPartnership] = useState<string[][]>([]);

  const updateScoreMutation = useMutation(updateScoreMutationOptions);
  const queryClient = useQueryClient();

  const totalHoles = 18;

  useEffect(() => {
    if (roundDetails?.round.players) {
      const players = roundDetails.round.players.map((p) => p.userId);

      const rotations: string[][][] = [];
      for (let i = 0; i < players.length; i++) {
        const rotated = players.slice(i).concat(players.slice(0, i));
        const rotation = [
          [rotated[0], rotated[1]],
          [rotated[2], rotated[3]],
        ];
        rotations.push(rotation);
      }

      setPartners(rotations);
      setCurrentPartnership(rotations[0]);
    }
  }, [roundDetails]);

  useEffect(() => {
    if (hole > 1 && hole % 6 === 1) {
      const rotationIndex = Math.floor((hole - 1) / 6) % partners.length;

      setCurrentPartnership(partners[rotationIndex]);
    }
  }, [hole, partners]);

  const handleScoreChange = (userId: string, score: string) => {
    setScores((prev) => ({ ...prev, [userId]: score }));
  };

  const handleNextHole = async () => {
    try {
      const partnershipScores = currentPartnership.map(([player1, player2]) => {
        const score1 = Number(scores[player1] || 0);
        const score2 = Number(scores[player2] || 0);
        return { player1, player2, totalScore: score1 + score2 };
      });

      const minScore = Math.min(...partnershipScores.map((p) => p.totalScore));
      const winningPartnerships = partnershipScores.filter(
        (p) => p.totalScore === minScore
      );

      const updatePromises: any[] = [];
      partnershipScores.forEach(({ player1, player2 }) => {
        const isWinner = winningPartnerships.some(
          (p) => p.player1 === player1 || p.player2 === player2
        );

        updatePromises.push(
          updateScoreMutation.mutateAsync({
            roundId,
            userId: player1,
            score: isWinner ? '1' : '0',
          }),
          updateScoreMutation.mutateAsync({
            roundId,
            userId: player2,
            score: isWinner ? '1' : '0',
          })
        );
      });

      await Promise.all(updatePromises);

      queryClient.invalidateQueries({ queryKey: ['round-details', roundId] });

      setScores({});
      setHole((prev) => prev + 1);

      if (hole === totalHoles) {
        router.navigate({
          to: '/roundSummary/$roundId',
          params: { roundId },
        });
      }
    } catch (error) {
      console.error('Error updating scores:', error);
    }
  };

  if (roundLoading) return <p>Loading round details...</p>;
  if (roundError) return <p>Error: {(roundError as Error).message}</p>;

  return (
    <div className='p-4 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg mt-4 mx-2 pb-12 relative'>
      <h1 className='text-2xl font-bold mb-4'>Round In Progress</h1>
      <p className='mb-4 text-xl'>
        Hole {hole} of {totalHoles}
      </p>

      <h2 className='text-xl font-semibold mb-2'>Current Partnerships</h2>
      <ul className='mb-4'>
        {currentPartnership.map(([player1, player2], index) => {
          const player1Details = roundDetails?.round.players.find(
            (p) => p.userId === player1
          );
          const player2Details = roundDetails?.round.players.find(
            (p) => p.userId === player2
          );

          return (
            <React.Fragment key={index}>
              <li className='flex items-center gap-2 justify-center text-xl'>
                {player1Details?.firstName} & {player2Details?.firstName}
              </li>
              {index < currentPartnership.length - 1 && (
                <li className='text-center text-lg font-bold'>vs.</li>
              )}
            </React.Fragment>
          );
        })}
      </ul>

      <h2 className='text-xl font-semibold mb-2'>Enter Scores</h2>
      <ul className='mb-8'>
        {currentPartnership.map(([player1, player2], index) => {
          const player1Details = roundDetails?.round.players.find(
            (p) => p.userId === player1
          );
          const player2Details = roundDetails?.round.players.find(
            (p) => p.userId === player2
          );

          return (
            <React.Fragment key={index}>
              <li className='flex items-center justify-between gap-4 mb-2 px-12'>
                <span className='flex-1 text-white font-semibold'>
                  {player1Details?.firstName} (Score:{' '}
                  {player1Details?.score || 0})
                </span>
                <input
                  type='number'
                  value={scores[player1] || ''}
                  onChange={(e) => handleScoreChange(player1, e.target.value)}
                  className='px-2 py-1 rounded border focus:outline-none focus:ring focus:border-green-500 text-black w-28'
                  min='1'
                />
              </li>
              <li className='flex items-center justify-between gap-4 mb-2 px-12'>
                <span className='flex-1 text-white font-semibold'>
                  {player2Details?.firstName} (Score:{' '}
                  {player2Details?.score || 0})
                </span>
                <input
                  type='number'
                  value={scores[player2] || ''}
                  onChange={(e) => handleScoreChange(player2, e.target.value)}
                  className='px-2 py-1 rounded border focus:outline-none focus:ring focus:border-green-500 text-black w-28'
                  min='1'
                />
              </li>
              {index < currentPartnership.length - 1 && (
                <li className='text-center text-lg font-bold mb-3'>vs.</li>
              )}
            </React.Fragment>
          );
        })}
      </ul>

      <div className='flex'>
        <button
          onClick={handleNextHole}
          className='px-4 py-2 bg-white text-green-600 rounded hover:bg-green-100 absolute right-5 bottom-5'
          disabled={Object.keys(scores).length < currentPartnership.length * 2}
        >
          {hole === totalHoles ? 'Finish Round' : 'Next'}
        </button>
      </div>
    </div>
  );
}
