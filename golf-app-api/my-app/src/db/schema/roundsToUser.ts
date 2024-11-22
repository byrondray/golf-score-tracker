// docs: https://orm.drizzle.team/docs/sql-schema-declaration
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { rounds } from './rounds';
import { users } from './user';

export const roundToUsers = sqliteTable('roundToUsers', {
  id: text('id').primaryKey().notNull(),
  roundId: text('round_id')
    .references(() => rounds.id, { onDelete: 'cascade' })
    .notNull(),
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  score: text('score').notNull(),
  createdAt: text('created_at').default(sql`(current_timestamp)`),
});

export type RoundToUser = typeof roundToUsers.$inferSelect;
export type RoundToUserInsert = typeof roundToUsers.$inferInsert;
