import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';
import { type ApiRoutes } from '../../../../golf-app-api/my-app/src/app';
import { hc } from 'hono/client';

export const client = hc<ApiRoutes>('/');

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
});

function Index() {
  const router = useRouter();

  const handleNavigateToStartRound = () => {
    router.navigate({ to: '/startRound' });
  };

  return (
    <div className='p-2'>
      <h3>Welcome Home!</h3>
      <button
        onClick={handleNavigateToStartRound}
        className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
      >
        Start New Round
      </button>
    </div>
  );
}
