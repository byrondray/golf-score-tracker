import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { userQueryOptions } from '../../lib/api';

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
});

function Profile() {
  const { isPending, error, data: user } = useQuery(userQueryOptions);

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className='p-4 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg mt-4 mx-2 relative'>
      <h1 className='text-2xl font-bold mb-4'>Profile</h1>
      <div className='mb-4'>
        <p>
          <span className='font-semibold'>Name:</span>{' '}
          {`${user!.given_name} ${user!.family_name}`}
        </p>
        <p>
          <span className='font-semibold'>Email:</span> {user!.email}
        </p>
      </div>
      <a
        href='/api/logout'
        className='px-4 py-2 bg-white text-green-600 rounded hover:bg-green-100 font-semibold absolute top-4 right-4'
      >
        Logout
      </a>
    </div>
  );
}
