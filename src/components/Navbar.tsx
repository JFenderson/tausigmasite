import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Menu, X, ChevronDown } from 'lucide-react'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="font-bold text-xl">Tau Sigma</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Home</Link>
              <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">About</Link>
              <Link to="/events" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Events</Link>
              <DropdownMenu >
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    Membership <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem>
                    <Link to="/members" className="w-full">Members</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/active-members" className="w-full">Active Members</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/become-a-member" className="w-full">Become a Member</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/collegiate-chapter" className="w-full">Collegiate Chapter</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link to="/charity-foundation" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Tau Sigma Charity Foundation</Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    Programs <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem>
                    <Link to="/programs" className="w-full">All Programs</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/sigma-beta-club" className="w-full">Sigma Beta Club</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link to="/contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Contact</Link>
            </div>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">Home</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">About</Link>
            <Link to="/events" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">Events</Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">
                  Membership <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                  <Link to="/members" className="w-full">Members</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/active-members" className="w-full">Active Members</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/become-a-member" className="w-full">Become a Member</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/collegiate-chapter" className="w-full">Collegiate Chapter</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/charity-foundation" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">Tau Sigma Charity Foundation</Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">
                  Programs <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                  <Link to="/programs" className="w-full">All Programs</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/sigma-beta-club" className="w-full">Sigma Beta Club</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar