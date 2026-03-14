import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  // Find the user first to get their ID
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || "" },
  });

  if (!user) return null;

  // Fetch stats and recent activity in parallel
  const [totalEntries, totalSkills, recentEntries] = await Promise.all([
    prisma.journalEntry.count({ where: { userId: user.id } }),
    prisma.skill.count({ where: { userId: user.id } }),
    prisma.journalEntry.findMany({
      where: { userId: user.id },
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { skill: true }
    })
  ]);

  const stats = [
    { 
      label: 'Total Entries', 
      value: totalEntries.toString(), 
      detail: 'Lifetime breakthroughs' 
    },
    { 
      label: 'Active Skills', 
      value: totalSkills.toString(), 
      detail: 'Current disciplines' 
    },
    { 
      label: 'Latest Level', 
      value: totalEntries > 0 ? 'Rising' : 'Novice', 
      detail: 'Activity status' 
    },
  ];

  return (
    <div className="max-w-5xl space-y-10">
      <header>
        <h1 className="text-3xl font-medium tracking-tight italic">
          Welcome back, {session?.user?.name || "Polymath"}
        </h1>
        <p className="text-zinc-500 mt-1">
          Here is the current state of your multidisciplinary system.
        </p>
      </header>

      {/* Dynamic Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 border border-zinc-100 rounded-xl bg-white shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{stat.label}</p>
            <p className="text-2xl font-semibold mt-2">{stat.value}</p>
            <p className="text-xs text-zinc-400 mt-1">{stat.detail}</p>
          </div>
        ))}
      </div>

      {/* Real-time Recent Activity */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
          Recent Breakthroughs
        </h2>
        <div className="border border-zinc-100 rounded-xl divide-y divide-zinc-100 bg-white shadow-sm">
          {recentEntries.length === 0 ? (
            <div className="p-10 text-center text-zinc-400 text-sm">
              No activity recorded yet. Head to the Journal to log your first win.
            </div>
          ) : (
            recentEntries.map((entry) => (
              <div key={entry.id} className="p-4 flex justify-between items-center hover:bg-zinc-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
                    {entry.skill?.name || "General"}
                  </span>
                  <span className="text-sm font-medium text-zinc-900 line-clamp-1 max-w-md">
                    {entry.content}
                  </span>
                </div>
                <span className="text-xs text-zinc-400 whitespace-nowrap ml-4">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}