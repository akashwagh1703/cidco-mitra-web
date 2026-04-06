import { Loader } from 'lucide-react'

export default function Loading({ fullScreen = false, message = 'Loading...' }) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 font-semibold">{message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <Loader className="w-10 h-10 animate-spin text-primary mx-auto mb-3" />
        <p className="text-gray-600 dark:text-gray-400">{message}</p>
      </div>
    </div>
  )
}
