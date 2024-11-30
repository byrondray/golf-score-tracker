import { Hono } from 'hono';
import { getDB } from '../db/client';
import { v4 as uuid } from 'uuid';
import { rounds } from '../db/schema/rounds';
import { roundToUsers } from '../db/schema/roundsToUser';
import { and, eq, inArray, sql } from 'drizzle-orm';
import { users } from '../db/schema/user';

const db = getDB();

const roundRouter = new Hono()
  .post('/create', async (c) => {
    try {
      const rawBody = await c.req.text();
      const body = JSON.parse(rawBody);

      if (!body || !body.players || body.players.length !== 4) {
        return c.json({ error: 'Exactly 4 players are required' }, 400);
      }

      const { players } = body;

      const roundId = uuid();

      await db.insert(rounds).values({
        id: roundId,
      });

      const roundToUserData = players.map((userId: string) => ({
        id: uuid(),
        roundId,
        userId,
        score: '0',
      }));

      await db.insert(roundToUsers).values(roundToUserData);

      return c.json({ success: true, roundId });
    } catch (error) {
      console.error('Error creating round:', error);

      if (error instanceof SyntaxError) {
        return c.json({ error: 'Invalid JSON payload' }, 400);
      }

      return c.json({ error: 'Failed to create round' }, 500);
    }
  })
  .get('/list', async (c) => {
    try {
      const roundsData = await db.select().from(rounds);

      const roundIds = roundsData.map((round) => round.id);

      const playersData = await db
        .select({
          roundId: roundToUsers.roundId,
          userId: users.id,
          firstName: users.firstName,
          score: roundToUsers.score,
        })
        .from(roundToUsers)
        .innerJoin(users, eq(users.id, roundToUsers.userId))
        .where(inArray(roundToUsers.roundId, roundIds));

      const playersByRound: Record<
        string,
        { userId: string; firstName: string; score: string }[]
      > = playersData.reduce(
        (
          acc: Record<
            string,
            { userId: string; firstName: string; score: string }[]
          >,
          player
        ) => {
          if (!acc[player.roundId]) acc[player.roundId] = [];
          acc[player.roundId].push({
            userId: player.userId,
            firstName: player.firstName,
            score: player.score,
          });
          return acc;
        },
        {}
      );

      const roundsWithPlayers = roundsData.map((round) => ({
        roundId: round.id,
        createdAt: round.createdAt,
        players: playersByRound[round.id] || [],
      }));

      return c.json({ success: true, rounds: roundsWithPlayers });
    } catch (error) {
      console.error('Error fetching rounds:', error);
      return c.json({ error: 'Failed to fetch rounds' }, 500);
    }
  })

  .post('/update-score', async (c) => {
    try {
      const rawBody = await c.req.text();
      const body = JSON.parse(rawBody);

      if (!body || !body.roundId || !body.userId || !body.score) {
        return c.json(
          { error: 'roundId, userId, and score are required' },
          400
        );
      }

      const { roundId, userId, score } = body;

      const currentRecord = await db
        .select({ currentScore: roundToUsers.score })
        .from(roundToUsers)
        .where(
          and(
            eq(roundToUsers.roundId, roundId),
            eq(roundToUsers.userId, userId)
          )
        )
        .limit(1);

      if (currentRecord.length === 0) {
        return c.json({ error: 'No matching record found' }, 404);
      }

      const currentScore = Number(currentRecord[0].currentScore || 0);
      const newScore = currentScore + Number(score);

      const updatedRows = await db
        .update(roundToUsers)
        .set({ score: newScore.toString() })
        .where(
          and(
            eq(roundToUsers.roundId, roundId),
            eq(roundToUsers.userId, userId)
          )
        )
        .returning();

      if (updatedRows.length === 0) {
        return c.json({ error: 'No matching record found to update' }, 404);
      }

      return c.json({
        success: true,
        message: `Score updated for user ${userId} in round ${roundId}`,
      });
    } catch (error) {
      console.error('Error updating score:', error);

      if (error instanceof SyntaxError) {
        return c.json({ error: 'Invalid JSON payload' }, 400);
      }

      return c.json({ error: 'Failed to update score' }, 500);
    }
  })

  .get('/details/:roundId', async (c) => {
    try {
      const roundId = c.req.param('roundId');

      if (!roundId) {
        return c.json({ error: 'roundId is required' }, 400);
      }

      const round = await db
        .select()
        .from(rounds)
        .where(eq(rounds.id, roundId))
        .limit(1);

      if (round.length === 0) {
        return c.json({ error: 'Round not found' }, 404);
      }

      const players = await db
        .select({
          userId: users.id,
          firstName: users.firstName,
          score: roundToUsers.score,
        })
        .from(roundToUsers)
        .innerJoin(users, eq(users.id, roundToUsers.userId))
        .where(eq(roundToUsers.roundId, roundId));

      const roundDetails = {
        roundId: round[0].id,
        createdAt: round[0].createdAt,
        players,
      };

      return c.json({ success: true, round: roundDetails });
    } catch (error) {
      console.error('Error fetching round details:', error);
      return c.json({ error: 'Failed to fetch round details' }, 500);
    }
  });

export default roundRouter;
