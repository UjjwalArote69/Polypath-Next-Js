/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { createJournalEntry } from '@/lib/actions/journal-actions';
import { Loader2 } from 'lucide-react';

export default function JournalForm({ skills }: { skills: any[] }) {
  const [content, setContent] = useState('');
  const [selectedSkillId, setSelectedSkillId] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSaving(true);
    const result = await createJournalEntry(content, selectedSkillId);
    
    if (result.success) {
      toast.success("Breakthrough documented.");
      setContent('');
      setSelectedSkillId('');
    } else {
      toast.error(result.error);
    }
    setIsSaving(false);
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
      <form onSubmit={handleSave} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Daily Log</label>
            
            {/* Skill Selector */}
            <select 
              value={selectedSkillId}
              onChange={(e) => setSelectedSkillId(e.target.value)}
              className="text-[10px] uppercase font-bold bg-zinc-50 border-none rounded px-2 py-1 outline-none text-zinc-500 hover:text-zinc-900 cursor-pointer"
            >
              <option value="">General Entry</option>
              {skills.map(skill => (
                <option key={skill.id} value={skill.id}>{skill.name}</option>
              ))}
            </select>
          </div>
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What discipline did you master today?"
            className="w-full h-32 p-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:ring-1 focus:ring-zinc-900 transition-all text-sm leading-relaxed"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving || !content.trim()}
            className="flex items-center space-x-2 bg-zinc-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-all disabled:opacity-50"
          >
            {isSaving && <Loader2 className="w-3 h-3 animate-spin" />}
            <span>Post Breakthrough</span>
          </button>
        </div>
      </form>
    </div>
  );
}