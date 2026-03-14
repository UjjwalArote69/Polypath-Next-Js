'use server';

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function createJournalEntry(content:string, skillId?: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return {success:false, error: "Unauthorized"};
    };

    try {
        const user = await prisma.user.findUnique({
            where: {email: session.user.email}
        });

        if (!user) {
            return {success: false, error:"user not found"};
        };

        await prisma.journalEntry.create({
            data: {
                content,
                userId: user.id,
                skillId: skillId || null
            }
        });

        revalidatePath('/journal');
        return {success: true};
    } catch (error) {
        return {success: false,  error: "Failed to save entry"};
    };
}