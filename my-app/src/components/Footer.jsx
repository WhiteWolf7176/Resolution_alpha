export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-4 sm:py-6 mt-auto">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gray-600 text-xs sm:text-sm">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </p>
      </div>
    </footer>
  );
} 