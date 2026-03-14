import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import JournalForm from "@/components/features/journal/JournalForm";

export default async function JournalPage() {
  const session = await getServerSession(authOptions);
  
  // Parallel fetch for better performance
  const [entries, skills] = await Promise.all([
    prisma.journalEntry.findMany({
      where: { user: { email: session?.user?.email } },
      orderBy: { createdAt: 'desc' },
      include: { skill: true } // Joins the skill data so we can see the category
    }),
    prisma.skill.findMany({
      where: { user: { email: session?.user?.email } },
      orderBy: { name: 'asc' }
    })
  ]);

  return (
    <div className="max-w-3xl space-y-12">
      <header>
        <h1 className="text-3xl font-medium tracking-tight">Journal</h1>
        <p className="text-zinc-500 mt-1">Document the evolution of your multitudes.</p>
      </header>

      <JournalForm skills={skills} />

      <div className="space-y-6">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">Past Logs</h2>
        {entries.length === 0 ? (
          <p className="text-zinc-400 text-sm italic">The archives are empty. Document your first step above.</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="p-6 bg-white border border-zinc-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold text-zinc-400">
                  {new Date(entry.createdAt).toLocaleDateString('en-US', { 
                    month: 'short', day: 'numeric', year: 'numeric' 
                  })}
                </span>
                {entry.skill && (
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded">
                    {entry.skill.name}
                  </span>
                )}
              </div>
              <p className="text-zinc-800 text-sm leading-relaxed whitespace-pre-wrap">
                {entry.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}