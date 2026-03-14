import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-200">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl w-full mx-auto border-b border-zinc-200/60">
        <div className="text-lg font-semibold tracking-widest text-zinc-900 uppercase">
          Polypath
        </div>
        <div className="space-x-6 flex items-center">
          <Link href="/signin" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
            Log in
          </Link>
          <Link href="/signup" className="text-sm font-medium bg-zinc-900 text-white px-5 py-2.5 rounded-md hover:bg-zinc-800 transition-colors shadow-sm">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-4xl text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-zinc-900 leading-tight">
            Master your disciplines. <br className="hidden md:block" />
            <span className="text-zinc-400">Track your multitudes.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed font-light">
            A refined environment for the modern polymath. Log daily journal entries, visualize complex skill trees, and map the intersections of your knowledge.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/signup" className="w-full sm:w-auto bg-zinc-900 text-white px-8 py-3.5 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors shadow-sm">
              Begin Tracking
            </Link>
            <Link href="#features" className="w-full sm:w-auto bg-transparent text-zinc-900 border border-zinc-300 px-8 py-3.5 rounded-md text-sm font-medium hover:bg-zinc-100 transition-colors">
              Explore the System
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}