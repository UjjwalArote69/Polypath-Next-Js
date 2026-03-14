'use server';

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export type SkillResponse = {
  success: boolean;
  error?: string;
};


export async function createSkill(formData: FormData): Promise<SkillResponse> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return { success: false, error: "Authentication required." };
  }

  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const levelInput = formData.get("level") as string;
  
  // Convert input string to integer, defaulting to 1 if something goes wrong
  const level = parseInt(levelInput, 10) || 1;

  if (!name || name.trim() === "") {
    return { success: false, error: "Skill name cannot be empty." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { success: false, error: "User profile not found." };
    }

    await prisma.skill.create({
      data: {
        name: name.trim(),
        category: category?.trim() || "General",
        userId: user.id,
        level: level, // Uses the level provided by the user
      },
    });

    revalidatePath("/skills");
    revalidatePath("/dashboard");
    
    return { success: true };
  } catch (error) {
    console.error("Skill Action Error:", error);
    return { success: false, error: "Failed to initialize new discipline." };
  }
}

export async function deleteSkill(skillId: string): Promise<SkillResponse> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return { success: false, error: "Unauthorized." };
  }

  try {
    await prisma.skill.delete({
      where: { id: skillId },
    });

    revalidatePath("/skills");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Could not remove the discipline." };
  }
}