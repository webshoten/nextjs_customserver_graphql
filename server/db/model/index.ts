import { relations } from "drizzle-orm";
import { pgTable, varchar, timestamp, foreignKey, unique, serial, integer } from "drizzle-orm/pg-core"

export const todo = pgTable('todo', {
taskId: varchar('taskId', { length: 256 }).primaryKey(),
contents: varchar('contents', { length: 256 }),
})

export const user = pgTable("user", {
	sub: varchar("sub", { length: 256 }).primaryKey().notNull(),
	name: varchar("name", { length: 256 }).notNull(),
	provider: varchar("provider", { length: 20 }).notNull(),
	userType: varchar("userType", { length: 20 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	email: varchar("email", { length: 256 }).notNull(),
});

export const reservation = pgTable("reservation", {
	reservationId: serial("reservationId").primaryKey().notNull(),
	day: integer("day").notNull(),
	time: integer("time").notNull(),
	sub: varchar("sub").references(() => user.sub),
	reservationType: varchar("reservationType", { length: 20 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		dayTime: unique("day_time").on(table.day, table.time),
	}
});

