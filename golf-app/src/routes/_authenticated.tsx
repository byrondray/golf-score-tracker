import * as React from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { userQueryOptions } from '../lib/api';

const Login = () => {
  return (
    <div className='p-2'>
      <h3>Please login</h3>
      <a href='/api/login'>Login</a>
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
