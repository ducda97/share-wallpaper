import Link from "next/link"

export default function Header() {
  return (
    <header className="snap-section fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <h1 className="text-xl font-bold text-white">Nature in Motion</h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#" className="text-white/90 hover:text-white transition-colors duration-300 font-medium">
              Home
            </Link>
            <Link href="#" className="text-white/90 hover:text-white transition-colors duration-300 font-medium">
              Categories
            </Link>
            <Link href="#" className="text-white/90 hover:text-white transition-colors duration-300 font-medium">
              Upload
            </Link>
            <Link href="#" className="text-white/90 hover:text-white transition-colors duration-300 font-medium">
              About
            </Link>
          </nav>

          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
