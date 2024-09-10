import { Hono } from "hono";
import { db } from "../../../db/drizzle";
import { accounts, accountsInsertSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { randomUUID } from "crypto";

export const runtime = "edge";

const app = new Hono()

  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      throw new HTTPException(401, {
        res: c.json({ error: "Unauthorized" }, 401),
      });
    }

    const data = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts)
      .where(eq(accounts.userId, auth.userId));

    return c.json({ data });
  })
  .post(
    "/",
    zValidator(
      "json",
      accountsInsertSchema.pick({
        name: true,
      })
    ),
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);
      const value = c.req.valid("json");
      if (!auth?.userId) {
        throw new HTTPException(401, {
          res: c.json({ error: "Unauthorized" }, 401),
        });
      }

      const newAccount = await db.insert(accounts).values({
        id: randomUUID.toString,
        userId: auth.userId,
        ...value,
      }).returning();

      return c.json({ data: newAccount }, 201);
    }
  );

export default app;
