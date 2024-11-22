import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  friendsQueryOptions,
  addFriendMutationOptions,
  userQueryOptions,
} from '../../lib/api';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const Route = createFileRoute('/_authenticated/friends')({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    isPending: userPending,
    error: userError,
    data: user,
  } = useQuery(userQueryOptions);

  const {
    data: friends,
    isLoading,
    error,
  } = useQuery(friendsQueryOptions(user!.id));
  const addFriendMutation = useMutation(addFriendMutationOptions);
  const [friendEmail, setFriendEmail] = useState('');

  const handleAddFriend = () => {
    if (!friendEmail) return;
    addFriendMutation.mutate(
      { userId: user!.id, friendEmail },
      {
        onSuccess: () => {
          setfriendEmail('');
        },
      }
    );
  };

  if (isLoading || userPending) return <p>Loading...</p>;
  if (error || userError)
    return <p>Error: {error?.message ? error.message : userError?.message}</p>;

  return (
    <div className='p-4 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg'>
      <h1 className='text-2xl font-bold mb-4'>Friends List</h1>

      {/* Friends List */}
      <ul className='mb-4'>
        {friends?.success ? (
          friends.friends.map((friend) => (
            <li
              key={friend.id}
              className='bg-white text-green-600 px-4 py-2 rounded shadow mb-2'
            >
              {friend.friendEmail}
            </li>
          ))
        ) : (
          <p>No friends found. Start adding some!</p>
        )}
      </ul>

      {/* Add Friend Input */}
      <div className='flex gap-2'>
        <input
          type='text'
          className='flex-1 px-4 py-2 rounded border focus:outline-none focus:ring focus:border-green-500'
          placeholder='Enter Friend ID'
          value={friendEmail}
          onChange={(e) => setfriendEmail(e.target.value)}
        />
        <button
          onClick={handleAddFriend}
          className='px-4 py-2 bg-white text-green-600 rounded hover:bg-green-100'
          disabled={addFriendMutation.isLoading}
        >
          {addFriendMutation.isLoading ? 'Adding...' : 'Add Friend'}
        </button>
      </div>
    </div>
  );
}
