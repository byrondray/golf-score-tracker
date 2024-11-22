import { Hono } from 'hono';
import courses from './routes/courses';
import auth from './routes/auth';
import friendsRouter from './routes/friends';

const app = new Hono();

app.get('/', (c) => {
  return c.json('Hello Hono!');
});

const apiRoutes = app
  .basePath('/api')
  .route('/courses', courses)
  .route('/', auth)
  .route('/friends', friendsRouter);

export type ApiRoutes = typeof apiRoutes;

export default app;
