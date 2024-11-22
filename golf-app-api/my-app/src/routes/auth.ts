import { Hono } from 'hono';
import { kindeClient, sessionManager } from '../kinde';
import { getUser } from '../kinde';
import { getDB } from '../db/client';
import { users } from '../db/schema/user';
import { eq } from 'drizzle-orm';

const db = getDB();

const auth = new Hono()
  .get('/login', async (c) => {
    const loginUrl = await kindeClient.login(sessionManager(c));
    return c.redirect(loginUrl.toString());
  })
  .get('/register', async (c) => {
    const registerUrl = await kindeClient.register(sessionManager(c));
    return c.redirect(registerUrl.toString());
  })
  .get('/callback', async (c) => {
    const url = new URL(`${c.req.url}`);
    await kindeClient.handleRedirectToApp(sessionManager(c), url);
    return c.redirect('/');
  })
  .get('/logout', async (c) => {
    const logoutUrl = await kindeClient.logout(sessionManager(c));
    return c.redirect(logoutUrl.toString());
  })
  .get('/me', getUser, async (c) => {
    const user = c.var.user;

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, user.id));

    if (existingUser.length === 0) {
      await db.insert(users).values({
        id: user.id,
        email: user.email,
        firstName: user.given_name,
      });
    }

    return c.json(user);
  });

export default auth;
