
export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} AMS - All rights reserved.</p>
        <div className="flex space-x-4 mt-3 sm:mt-0">
          <a href="/about" className="hover:text-green-600">
            About
          </a>
          <a href="/contact" className="hover:text-green-600">
            Contact
          </a>
          <a href="/privacy" className="hover:text-green-600">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
