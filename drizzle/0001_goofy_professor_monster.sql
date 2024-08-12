CREATE TABLE IF NOT EXISTS "reservation" (
	"reservationId" serial PRIMARY KEY NOT NULL,
	"day" integer NOT NULL,
	"time" integer NOT NULL,
	"sub" varchar,
	"reservationType" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "day_time" UNIQUE("day","time")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"sub" varchar(256) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"provider" varchar(20) NOT NULL,
	"userType" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"email" varchar(256) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservation" ADD CONSTRAINT "reservation_sub_user_sub_fk" FOREIGN KEY ("sub") REFERENCES "public"."user"("sub") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
