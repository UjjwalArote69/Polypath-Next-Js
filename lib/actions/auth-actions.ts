'use server';

import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

// Define the shape of the data we expect to return to the client
export type ActionResponse = {
  success: boolean;
  error?: string;
};

export async function registerUser(formData: FormData): Promise<ActionResponse> {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !name || !password) {
      return { success: false, error: "Missing required fields." };
    }

    // 1. Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "An account with this email already exists." };
    }

    // 2. Hash password and save to database
    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return { success: true };

  } catch (error) {
    console.error("Registration Server Action Error:", error);
    return { success: false, error: "An internal error occurred." };
  }
}