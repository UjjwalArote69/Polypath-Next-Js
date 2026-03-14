"use client";

import { useState } from "react";
import { createSkill } from "@/lib/actions/skill-actions";
import { toast } from "sonner";

export default function AddSkillModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 w-full max-w-md rounded-2xl p-8 shadow-2xl">
        <h2 className="text-xl font-semibold mb-6">
          Initiate New Discipline
        </h2>

        <form
          action={async (formData) => {
            const result = await createSkill(formData);
            if (result.success) {
              toast.success("New discipline initiated.");
              onClose();
            } else {
              toast.error(result.error);
            }
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
              Skill Name
            </label>
            <input
              name="name"
              placeholder="e.g. Quantum Physics"
              required
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg outline-none focus:ring-1 focus:ring-zinc-900 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                Category
              </label>
              <input
                name="category"
                placeholder="e.g. Science"
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg outline-none focus:ring-1 focus:ring-zinc-900 text-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                Starting Level (1-10)
              </label>
              <input
                name="level"
                type="number"
                min="1"
                max="10"
                defaultValue="1"
                required
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg outline-none focus:ring-1 focus:ring-zinc-900 text-zinc-900 dark:text-zinc-100"
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 text-white px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
            >
              Create Skill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}