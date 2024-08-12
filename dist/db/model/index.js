"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservation = exports.user = exports.todo = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.todo = (0, pg_core_1.pgTable)('todo', {
    taskId: (0, pg_core_1.varchar)('taskId', { length: 256 }).primaryKey(),
    contents: (0, pg_core_1.varchar)('contents', { length: 256 }),
});
exports.user = (0, pg_core_1.pgTable)("user", {
    sub: (0, pg_core_1.varchar)("sub", { length: 256 }).primaryKey().notNull(),
    name: (0, pg_core_1.varchar)("name", { length: 256 }).notNull(),
    provider: (0, pg_core_1.varchar)("provider", { length: 20 }).notNull(),
    userType: (0, pg_core_1.varchar)("userType", { length: 20 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: 'string' }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: 'string' }).defaultNow().notNull(),
    deletedAt: (0, pg_core_1.timestamp)("deleted_at", { mode: 'string' }),
    email: (0, pg_core_1.varchar)("email", { length: 256 }).notNull(),
});
exports.reservation = (0, pg_core_1.pgTable)("reservation", {
    reservationId: (0, pg_core_1.serial)("reservationId").primaryKey().notNull(),
    day: (0, pg_core_1.integer)("day").notNull(),
    time: (0, pg_core_1.integer)("time").notNull(),
    sub: (0, pg_core_1.varchar)("sub").references(() => exports.user.sub),
    reservationType: (0, pg_core_1.varchar)("reservationType", { length: 20 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: 'string' }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => {
    return {
        dayTime: (0, pg_core_1.unique)("day_time").on(table.day, table.time),
    };
});
