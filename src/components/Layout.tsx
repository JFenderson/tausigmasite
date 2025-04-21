import React from 'react';
import Navbar from './Navbar';
// import { Link } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-6">
        {children}
      </main>
{/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Tau Sigma Fraternity</h3>
              <p className="text-sm">Empowering leaders since 1950</p>
            </div>
            {/* <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-white text-sm hover:underline">About Us</Link></li>
                <li><Link to="/events" className="text-sm hover:underline">Events</Link></li>
                <li><Link to="/members" className="text-sm hover:underline">Members</Link></li>
                <li><Link to="/contact" className="text-sm hover:underline">Contact</Link></li>
              </ul>
            </div> */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                  <span className="sr-only">Facebook</span>
                
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                  <span className="sr-only">Twitter</span>
             
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                  <span className="sr-only">Instagram</span>
        
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-sm">&copy; 2023 Tau Sigma Fraternity. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
