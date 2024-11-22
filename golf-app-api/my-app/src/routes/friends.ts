import { Hono } from 'hono';
import { getDB } from '../db/client';
import { friends, FriendInsert } from '../db/schema/friends';
import { users } from '../db/schema/user';
import { eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';

const db = getDB();

const friendsRouter = new Hono()
  .post('/add', async (c) => {
    const body = await c.req.json<{ userId: string; friendId: string }>();
    const { userId, friendId } = body;

    if (!userId || !friendId) {
      return c.json({ error: 'userId and friendId are required' }, 400);
    }

    try {
      await db.insert(friends).values([
        {
          id: uuid(),
          userId,
          friendId,
        },
        {
          id: uuid(),
          userId: friendId,
          friendId: userId,
        },
      ] satisfies FriendInsert[]);

      return c.json({ success: true, message: 'Friend added successfully' });
    } catch (error) {
      console.error('Error adding friend:', error);
      return c.json({ error: 'Failed to add friend' }, 500);
    }
  })
  .get('/list/:userId', async (c) => {
    const userId = c.req.param('userId');

    if (!userId) {
      return c.json({ error: 'userId is required' }, 400);
    }

    try {
      const userFriends = await db
        .select()
        .from(friends)
        .where(eq(friends.userId, userId));

      return c.json({ success: true, friends: userFriends });
    } catch (error) {
      console.error('Error fetching friends:', error);
      return c.json({ error: 'Failed to fetch friends' }, 500);
    }
  })
  .get('/get-by-email/:email', async (c) => {
    const email = c.req.param('email');

    if (!email) {
      return c.json({ error: 'email is required' }, 400);
    }

    try {
      const friendByEmail = await db
        .select({ user: users })
        .from(friends)
        .leftJoin(users, eq(users.id, friends.friendId))
        .where(eq(users.email, email));

      if (!friendByEmail) {
        return c.json({ error: 'No friend found with this email' }, 404);
      }

      return c.json({ success: true, friend: friendByEmail });
    } catch (error) {
      console.error('Error fetching friend by email:', error);
      return c.json({ error: 'Failed to fetch friend by email' }, 500);
    }
  });

export default friendsRouter;
