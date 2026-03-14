import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto border-b border-zinc-100 dark:border-zinc-900">
        <div className="text-lg font-semibold tracking-widest uppercase">Polypath</div>
        <div className="flex items-center space-x-6">
          
          <Link href="/signin" className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
            Log in
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-20 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-medium tracking-tight leading-tight">
          Master your disciplines. <br />
          <span className="text-zinc-400 dark:text-zinc-600">Track your multitudes.</span>
        </h1>
          
          <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed font-light ">
            A refined environment for the modern polymath. Log daily journal entries, visualize complex skill trees, and map the intersections of your knowledge.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/signup" className="w-full sm:w-auto dark:bg-zinc-100 dark:text-zinc-950 bg-zinc-900 text-white px-8 py-3.5 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors shadow-sm">
              Begin Tracking
            </Link>
            <Link href="#features" className="w-full sm:w-auto bg-transparent dark:bg-zinc-100 dark:text-zinc-950 text-zinc-900 border border-zinc-300 px-8 py-3.5 rounded-md text-sm font-medium hover:bg-zinc-100 transition-colors">
              Explore the System
            </Link>
          </div>
      </main>
    </div>
  );
}