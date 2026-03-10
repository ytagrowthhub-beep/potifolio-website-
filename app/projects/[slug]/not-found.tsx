import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-display font-bold text-wine-500 mb-4">404</h1>
        <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
          Project Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The project you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/#projects"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-wine-500 text-white font-semibold rounded-lg hover:bg-wine-600 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Projects</span>
        </Link>
      </div>
    </div>
  )
}
