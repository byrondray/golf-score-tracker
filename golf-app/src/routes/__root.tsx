import * as React from 'react';
import { QueryClient, useQuery } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { userQueryOptions } from '../lib/api';

interface MyRouterContext {
  queryClient: QueryClient;
}

// Define the root route with context
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

function Root() {
  return (
    <>
      <NavBar />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}

function NavBar() {
  const { data: user, isLoading, error } = useQuery(userQueryOptions);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className='p-4 flex gap-4 items-center bg-gradient-to-r from-green-400 to-green-600 text-white'>
        {user && user.id ? (
          <>
            <Link
              to='/'
              className='[&.active]:font-bold flex items-center gap-2 hover:underline'
            >
              <span>🏠</span>
              Home
            </Link>
            <Link
              to='/friends'
              className='[&.active]:font-bold flex items-center gap-2 hover:underline'
            >
              <span>👫</span>
              Friends
            </Link>
            <Link
              to='/rounds'
              className='[&.active]:font-bold flex items-center gap-2 hover:underline'
            >
              <span>⛳</span>
              Rounds
            </Link>
            <Link
              to='/profile'
              className='[&.active]:font-bold flex items-center gap-2 hover:underline'
            >
              <span>👤</span>
              Profile
            </Link>
          </>
        ) : (
          <a
            href='/api/login'
            className='font-bold px-4 py-2 bg-white text-green-600 rounded hover:bg-green-100'
          >
            Login
          </a>
        )}
      </div>
      <hr className='border-green-500' />
    </>
  );
}
