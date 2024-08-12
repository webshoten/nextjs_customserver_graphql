import { relations } from "drizzle-orm/relations";
import { user, reservation } from "./schema";

export const reservationRelations = relations(reservation, ({one}) => ({
	user: one(user, {
		fields: [reservation.sub],
		references: [user.sub]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	reservations: many(reservation),
}));