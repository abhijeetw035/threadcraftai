import { db } from "./dbConfig";
import { eq, sql, desc } from "drizzle-orm";
import { Users, GeneratedContent } from "./schema";
import { sendWelcomeEmail } from "../mailtrap";

export async function saveGeneratedContent(
  userId: string,
  content: string,
  prompt: string,
  contentType: string
) {
  try {
    const [savedContent] = await db
      .insert(GeneratedContent)
      .values({
        userId: sql`(SELECT id FROM ${Users} WHERE stripe_customer_id = ${userId})`,
        content,
        prompt,
        contentType,
      })
      .returning()
      .execute();
    return savedContent;
  } catch (error) {
    console.error("Error saving generated content:", error);
    return null;
  }
}

export async function getGeneratedContentHistory(
  userId: string,
  limit: number = 10
) {
  try {
    const history = await db
      .select({
        id: GeneratedContent.id,
        content: GeneratedContent.content,
        prompt: GeneratedContent.prompt,
        contentType: GeneratedContent.contentType,
        createdAt: GeneratedContent.createdAt,
      })
      .from(GeneratedContent)
      .where(
        eq(
          GeneratedContent.userId,
          sql`(SELECT id FROM ${Users} WHERE stripe_customer_id = ${userId})`
        )
      )
      .orderBy(desc(GeneratedContent.createdAt))
      .limit(limit)
      .execute();
    return history;
  } catch (error) {
    console.error("Error fetching generated content history:", error);
    return [];
  }
}

export async function createOrUpdateUser(
  clerkUserId: string,
  email: string,
  name: string
) {
  try {
    const [existingUser] = await db
      .select()
      .from(Users)
      .where(eq(Users.stripeCustomerId, clerkUserId))
      .limit(1)
      .execute();
    // what is use of eq - eq is used to compare two values
    // but why we can't use === - because we are comparing two objects

    if (existingUser) {
      const [updatedUser] = await db
        .update(Users)
        .set({ name, email })
        .where(eq(Users.stripeCustomerId, clerkUserId))
        .returning()
        .execute();
      console.log("Updated user:", updatedUser);
      return updatedUser;
    }

    const [newUser] = await db
      .insert(Users)
      .values({
        email,
        name,
        stripeCustomerId: clerkUserId,
        points: 50,
      })
      .returning()
      .execute();
    console.log("Created user:", newUser);

    // send welcome email to new user
    sendWelcomeEmail(email, name);
  } catch (error) {
    console.error("Error: Could not create/update user:", error);
  }
}
