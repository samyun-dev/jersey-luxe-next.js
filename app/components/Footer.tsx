export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto flex justify-between items-center">
          <p>&copy; 2023 Jersey Luxe. All rights reserved.</p>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    )
  }