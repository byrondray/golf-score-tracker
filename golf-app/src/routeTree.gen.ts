/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index'
import { Route as AuthenticatedStartRoundImport } from './routes/_authenticated/startRound'
import { Route as AuthenticatedRoundsImport } from './routes/_authenticated/rounds'
import { Route as AuthenticatedProfileImport } from './routes/_authenticated/profile'
import { Route as AuthenticatedFriendsImport } from './routes/_authenticated/friends'
import { Route as AuthenticatedRoundSummaryRoundIdImport } from './routes/_authenticated/roundSummary/$roundId'
import { Route as AuthenticatedRoundInProgressRoundIdImport } from './routes/_authenticated/roundInProgress/$roundId'

// Create/Update Routes

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedStartRoundRoute = AuthenticatedStartRoundImport.update({
  id: '/startRound',
  path: '/startRound',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedRoundsRoute = AuthenticatedRoundsImport.update({
  id: '/rounds',
  path: '/rounds',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedProfileRoute = AuthenticatedProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedFriendsRoute = AuthenticatedFriendsImport.update({
  id: '/friends',
  path: '/friends',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedRoundSummaryRoundIdRoute =
  AuthenticatedRoundSummaryRoundIdImport.update({
    id: '/roundSummary/$roundId',
    path: '/roundSummary/$roundId',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedRoundInProgressRoundIdRoute =
  AuthenticatedRoundInProgressRoundIdImport.update({
    id: '/roundInProgress/$roundId',
    path: '/roundInProgress/$roundId',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/friends': {
      id: '/_authenticated/friends'
      path: '/friends'
      fullPath: '/friends'
      preLoaderRoute: typeof AuthenticatedFriendsImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/profile': {
      id: '/_authenticated/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AuthenticatedProfileImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/rounds': {
      id: '/_authenticated/rounds'
      path: '/rounds'
      fullPath: '/rounds'
      preLoaderRoute: typeof AuthenticatedRoundsImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/startRound': {
      id: '/_authenticated/startRound'
      path: '/startRound'
      fullPath: '/startRound'
      preLoaderRoute: typeof AuthenticatedStartRoundImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/': {
      id: '/_authenticated/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/roundInProgress/$roundId': {
      id: '/_authenticated/roundInProgress/$roundId'
      path: '/roundInProgress/$roundId'
      fullPath: '/roundInProgress/$roundId'
      preLoaderRoute: typeof AuthenticatedRoundInProgressRoundIdImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/roundSummary/$roundId': {
      id: '/_authenticated/roundSummary/$roundId'
      path: '/roundSummary/$roundId'
      fullPath: '/roundSummary/$roundId'
      preLoaderRoute: typeof AuthenticatedRoundSummaryRoundIdImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
  AuthenticatedFriendsRoute: typeof AuthenticatedFriendsRoute
  AuthenticatedProfileRoute: typeof AuthenticatedProfileRoute
  AuthenticatedRoundsRoute: typeof AuthenticatedRoundsRoute
  AuthenticatedStartRoundRoute: typeof AuthenticatedStartRoundRoute
  AuthenticatedIndexRoute: typeof AuthenticatedIndexRoute
  AuthenticatedRoundInProgressRoundIdRoute: typeof AuthenticatedRoundInProgressRoundIdRoute
  AuthenticatedRoundSummaryRoundIdRoute: typeof AuthenticatedRoundSummaryRoundIdRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedFriendsRoute: AuthenticatedFriendsRoute,
  AuthenticatedProfileRoute: AuthenticatedProfileRoute,
  AuthenticatedRoundsRoute: AuthenticatedRoundsRoute,
  AuthenticatedStartRoundRoute: AuthenticatedStartRoundRoute,
  AuthenticatedIndexRoute: AuthenticatedIndexRoute,
  AuthenticatedRoundInProgressRoundIdRoute:
    AuthenticatedRoundInProgressRoundIdRoute,
  AuthenticatedRoundSummaryRoundIdRoute: AuthenticatedRoundSummaryRoundIdRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof AuthenticatedRouteWithChildren
  '/friends': typeof AuthenticatedFriendsRoute
  '/profile': typeof AuthenticatedProfileRoute
  '/rounds': typeof AuthenticatedRoundsRoute
  '/startRound': typeof AuthenticatedStartRoundRoute
  '/': typeof AuthenticatedIndexRoute
  '/roundInProgress/$roundId': typeof AuthenticatedRoundInProgressRoundIdRoute
  '/roundSummary/$roundId': typeof AuthenticatedRoundSummaryRoundIdRoute
}

export interface FileRoutesByTo {
  '/friends': typeof AuthenticatedFriendsRoute
  '/profile': typeof AuthenticatedProfileRoute
  '/rounds': typeof AuthenticatedRoundsRoute
  '/startRound': typeof AuthenticatedStartRoundRoute
  '/': typeof AuthenticatedIndexRoute
  '/roundInProgress/$roundId': typeof AuthenticatedRoundInProgressRoundIdRoute
  '/roundSummary/$roundId': typeof AuthenticatedRoundSummaryRoundIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/_authenticated/friends': typeof AuthenticatedFriendsRoute
  '/_authenticated/profile': typeof AuthenticatedProfileRoute
  '/_authenticated/rounds': typeof AuthenticatedRoundsRoute
  '/_authenticated/startRound': typeof AuthenticatedStartRoundRoute
  '/_authenticated/': typeof AuthenticatedIndexRoute
  '/_authenticated/roundInProgress/$roundId': typeof AuthenticatedRoundInProgressRoundIdRoute
  '/_authenticated/roundSummary/$roundId': typeof AuthenticatedRoundSummaryRoundIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/friends'
    | '/profile'
    | '/rounds'
    | '/startRound'
    | '/'
    | '/roundInProgress/$roundId'
    | '/roundSummary/$roundId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/friends'
    | '/profile'
    | '/rounds'
    | '/startRound'
    | '/'
    | '/roundInProgress/$roundId'
    | '/roundSummary/$roundId'
  id:
    | '__root__'
    | '/_authenticated'
    | '/_authenticated/friends'
    | '/_authenticated/profile'
    | '/_authenticated/rounds'
    | '/_authenticated/startRound'
    | '/_authenticated/'
    | '/_authenticated/roundInProgress/$roundId'
    | '/_authenticated/roundSummary/$roundId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authenticated"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/friends",
        "/_authenticated/profile",
        "/_authenticated/rounds",
        "/_authenticated/startRound",
        "/_authenticated/",
        "/_authenticated/roundInProgress/$roundId",
        "/_authenticated/roundSummary/$roundId"
      ]
    },
    "/_authenticated/friends": {
      "filePath": "_authenticated/friends.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/profile": {
      "filePath": "_authenticated/profile.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/rounds": {
      "filePath": "_authenticated/rounds.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/startRound": {
      "filePath": "_authenticated/startRound.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/": {
      "filePath": "_authenticated/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/roundInProgress/$roundId": {
      "filePath": "_authenticated/roundInProgress/$roundId.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/roundSummary/$roundId": {
      "filePath": "_authenticated/roundSummary/$roundId.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
