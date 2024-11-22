import { client } from '../routes/_authenticated/index';
import { queryOptions } from '@tanstack/react-query';

export const api = client.api;

export const userQueryOptions = queryOptions({
  queryKey: ['get-current-user'],
  queryFn: fetchProfile,
  staleTime: Infinity,
});

async function fetchProfile() {
  const c = await api.me.$get();
  const d = await c.json();
  return d;
}

export const friendsQueryOptions = (userId: string) => ({
  queryKey: ['friends', userId],
  queryFn: async () => {
    const response = await api.friends.list[':userId'].$get({
      param: { userId },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch friends');
    }
    return response.json();
  },
  staleTime: Infinity,
});

export const addFriendMutationOptions = {
  mutationFn: async ({
    userId,
    friendId,
  }: {
    userId: string;
    friendId: string;
  }) => {
    const response = await api.friends.add.$post({
      json: { userId, friendId },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        'error' in errorData ? errorData.error : 'Failed to add friend'
      );
    }
    return response.json();
  },
};

export const getFriendByEmailQueryOptions = (email: string) => ({
  queryKey: ['friend-by-email', email],
  queryFn: async () => {
    const response = await api.friends['get-by-email'][':email'].$get({
      param: { email },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch friend by email');
    }
    return response.json();
  },
});

export const roundsQueryOptions = {
  queryKey: ['rounds'],
  queryFn: async () => {
    const response = await api.rounds.list.$get();
    if (!response.ok) {
      throw new Error('Failed to fetch rounds');
    }
    return response.json();
  },
  staleTime: 60000,
};

export const createRoundMutationOptions = {
  mutationFn: async ({
    players,
  }: {
    players: string[]; // Array of user IDs
  }) => {
    const response = await api.rounds.create.$post({
      json: { players },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        'error' in errorData ? errorData.error : 'Failed to create round'
      );
    }
    return response.json();
  },
};

// Update score for a single user
export const updateScoreMutationOptions = {
  mutationFn: async ({
    roundId,
    userId,
    score,
  }: {
    roundId: string;
    userId: string;
    score: string;
  }) => {
    const response = await api.rounds['update-score'].$post({
      json: { roundId, userId, score },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        'error' in errorData ? errorData.error : 'Failed to update score'
      );
    }
    return response.json();
  },
};