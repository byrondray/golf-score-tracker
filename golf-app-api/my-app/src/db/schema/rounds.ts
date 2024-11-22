// docs: https://orm.drizzle.team/docs/sql-schema-declaration
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const rounds = sqliteTable('rounds', {
  id: text('id').primaryKey().notNull(),
  createdAt: text('created_at').default(sql`(current_timestamp)`),
});

export type Round = typeof rounds.$inferSelect;
export type RoundInsert = typeof rounds.$inferInsert;
