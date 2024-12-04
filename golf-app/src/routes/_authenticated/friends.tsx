import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  friendsQueryOptions,
  addFriendMutationOptions,
  userQueryOptions,
  getFriendByEmailQueryOptions,
} from '../../lib/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const Route = createFileRoute('/_authenticated/friends')({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    isLoading: userPending,
    error: userError,
    data: user,
  } = useQuery(userQueryOptions);

  const {
    data: friends,
    isLoading: friendsLoading,
    error: friendsError,
  } = useQuery(friendsQueryOptions(user?.id || ''));

  const queryClient = useQueryClient();

  const addFriendMutation = useMutation(addFriendMutationOptions);

  const [friendEmail, setFriendEmail] = useState('');
  const [addFriendError, setAddFriendError] = useState<string | null>(null);

  const {
    data: friendInfo,
    isLoading: fetchingFriend,
    error: emailError,
  } = useQuery({
    ...getFriendByEmailQueryOptions(friendEmail),
    enabled: !!friendEmail,
  });

  const handleAddFriend = () => {
    if (!friendInfo?.user || !user?.id) {
      setAddFriendError(
        'Please enter a valid email or ensure the user is logged in.'
      );
      return;
    }

    addFriendMutation.mutate(
      { userId: user.id, friendId: friendInfo.user.id },
      {
        onSuccess: () => {
          setFriendEmail('');
          setAddFriendError(null); // Clear error on success
          queryClient.invalidateQueries({ queryKey: ['friends', user.id] });
        },
        onError: (error) => {
          if (error instanceof Error) {
            console.error('Error adding friend:', error.message);
            setAddFriendError(error.message); // Set the error message
          } else {
            console.error('Unknown error occurred:', error);
            setAddFriendError('An unknown error occurred.');
          }
        },
      }
    );
  };

  if (userPending || friendsLoading) return <p>Loading...</p>;
  if (userError || friendsError)
    return <p>Error: {userError?.message || friendsError?.message}</p>;

  return (
    <div className='flex justify-center my-8'>
      <div className='p-4 bg-white text-green-600 rounded-lg shadow-lg shadow-slate-400 w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Friends List</h1>

        <ul className='mb-4'>
          {friends?.success ? (
            friends.friends.map((friend) => (
              <li
                key={friend.friends?.id}
                className='bg-green-100 px-4 py-2 rounded shadow mb-2'
              >
                {friend.friends?.firstName}
              </li>
            ))
          ) : (
            <p>No friends found. Start adding some!</p>
          )}
        </ul>

        <div className='flex flex-col gap-2'>
          <div className='flex gap-2'>
            <input
              type='text'
              className='flex-1 px-4 py-2 rounded border focus:outline-none focus:ring focus:border-green-500 text-black'
              placeholder='Enter Friend Email'
              value={friendEmail}
              onChange={(e) => setFriendEmail(e.target.value)}
            />
            <button
              onClick={handleAddFriend}
              className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
              disabled={
                !friendInfo || fetchingFriend || addFriendMutation.isPending
              }
            >
              {addFriendMutation.isPending ? 'Adding...' : 'Add Friend'}
            </button>
          </div>

          {emailError && <p className='text-red-500'>{emailError.message}</p>}

          {fetchingFriend && <p>Fetching friend info...</p>}
          {friendInfo && (
            <div className='bg-green-100 px-4 py-2 rounded shadow'>
              <p>Friend: {friendInfo.user?.firstName}</p>
            </div>
          )}
          {addFriendError && <p className='text-red-500'>{addFriendError}</p>}
        </div>
      </div>
    </div>
  );
}
