'use client';

import { useState } from "react";
import AddSkillModal from "./AddSkillModel";

export default function SkillsHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-medium tracking-tight">Skill Trees</h1>
          <p className="text-zinc-500 mt-1">Visualize your multidisciplinary growth.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="text-sm font-medium bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
        >
          + New Skill
        </button>
      </header>

      <AddSkillModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}