import * as React from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { userQueryOptions } from '../lib/api';

const Login = () => {
  return (
    <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='p-6 bg-white rounded-lg shadow-lg text-center w-full max-w-sm mb-20 drop-shadow'>
        <h3 className='text-2xl font-bold text-green-600 mb-4'>
          Welcome Back!
        </h3>
        <p className='text-green-500 mb-6'>
          Please log in to access your account.
        </p>
        <a
          href='/api/login'
          className='inline-block px-6 py-2 text-white bg-green-500 rounded hover:bg-green-600 transition-colors w-64'
        >
          Login
        </a>
      </div>
    </div>
  );
};

const Component = () => {
  // Access user from the route context
  const routeContext = Route.useRouteContext() as { user: any };
  const { user } = routeContext;

  if (!user || !user.id) {
    // Render Login if user is not available or user.id is missing
    return <Login />;
  }

  return <Outlet />;
};

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;
    try {
      // Fetch the user data using the query client
      const user = await queryClient.fetchQuery(userQueryOptions);

      // Return the user data as part of the context
      return { user };
    } catch (error) {
      // If an error occurs (e.g., unauthenticated), return null for user
      return { user: null };
    }
  },
  component: Component,
});
