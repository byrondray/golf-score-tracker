import { Hono } from 'hono';
import { getDB } from '../db/client';
import { friends, FriendInsert } from '../db/schema/friends';
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
  });

export default friendsRouter;
