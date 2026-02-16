export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Week not found</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-red-600 text-white border-2 border-dashed border-white/30 hover:bg-red-700 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
