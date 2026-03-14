import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SkillsHeader from "@/components/features/skills/SkillsHeader";

export default async function SkillsPage() {
  const session = await getServerSession(authOptions);
  
  // Fetch real skills for the logged-in user from MongoDB
  const skills = await prisma.skill.findMany({
    where: {
      user: { email: session?.user?.email }
    },
    orderBy: { level: 'desc' }
  });

  return (
    <div className="max-w-5xl space-y-8">
      <SkillsHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.length === 0 ? (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-zinc-100 rounded-2xl">
            <p className="text-zinc-400">No disciplines initiated yet. Start by adding your first skill.</p>
          </div>
        ) : (
          skills.map((skill) => (
            <div key={skill.id} className="p-6 bg-white border border-zinc-100 rounded-xl shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">{skill.category}</span>
                  <h3 className="text-lg font-semibold text-zinc-900">{skill.name}</h3>
                </div>
                <span className="text-sm font-medium text-zinc-500">Lvl {skill.level}</span>
              </div>
              
              {/* Progress Bar mapped to 1-10 level system */}
              <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-zinc-900 transition-all duration-500" 
                  style={{ width: `${(skill.level / 10) * 100}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}