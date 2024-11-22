import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/rounds')({
  component: RouteComponent,
});

function RouteComponent() {
  return 'Hello /_authenticated/rounds!';
}
