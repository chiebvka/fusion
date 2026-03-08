import { useState } from 'react'
import { Link } from 'react-router'
import { Home, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from './theme-toggle'


export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <div>
      <nav className="flex fixed top-0 left-0 right-0 z-40 justify-center p-4 md:p-6 text-foreground">
        <div className="md:w-[85%] w-full flex justify-between items-center bg-background/80 backdrop-blur-md border px-6 py-2">
          <img src={''} alt="Logo" height={40} width={40} />

          <div className="hidden md:flex items-center bg-secondary/80 dark:bg-white/10 backdrop-blur-sm px-1 py-1">
            <Link
              to="/"
              className="nav-item flex items-center justify-center w-10 h-10 rounded-none bg-bexoni/30 dark:bg-bexoni/60 mx-1 hover:bounce-x"
            >
              <Home className="w-5 h-5 text-primary" />
            </Link>
            
            <Link to="/about" className="nav-item px-4 py-2 hover:text-primary transition-colors hover:bounce-x">
              About
            </Link>
            <Link to="/faqs" className="nav-item px-4 py-2 hover:text-primary transition-colors hover:bounce-x">
              FAQs
            </Link>
            <Link to="/blogs" className="nav-item px-4 py-2 hover:text-primary transition-colors hover:bounce-x">
              Blog
            </Link>
            <Link to="/tools" className="nav-item px-4 py-2 hover:text-primary transition-colors hover:bounce-x">
              Tools
            </Link>
            <Link to="/story" className="nav-item px-4 py-2 hover:text-primary transition-colors hover:bounce-x">
              Story
            </Link>
            <Link to="/contact" className="nav-item px-4 py-2 hover:text-primary transition-colors hover:bounce-x">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            <ThemeToggle />
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger>
                <button className="p-2">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
            <SheetContent
              side="right"
              className="border-r-primary-dark w-[85vw] sm:w-[400px] p-0"
            >
              <div className="h-full flex flex-col">
                <SheetHeader className="p-6 border-b border-white/10">
                  <SheetTitle className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-full p-1">
                      <img
                        src={''}
                        alt="Organization Logo"
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-lg font-semibold">Fusion</span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto">
                  <div className="p-6">
                    <nav className="flex flex-col space-y-1">
                      <MobileNavLink to="/" label="Home" onClick={() => setIsSheetOpen(false)} />
                      <MobileNavLink to="/about" label="About" onClick={() => setIsSheetOpen(false)} />
                      <MobileNavLink to="/story" label="Story" onClick={() => setIsSheetOpen(false)} />
                      <MobileNavLink to="/faqs" label="FAQs" onClick={() => setIsSheetOpen(false)} />
                      <MobileNavLink to="/blogs" label="Blog" onClick={() => setIsSheetOpen(false)} />
                      <MobileNavLink to="/tools" label="Tools" onClick={() => setIsSheetOpen(false)} />
                      <MobileNavLink to="/contact" label="Contact" onClick={() => setIsSheetOpen(false)} />
                    </nav>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          </div>
        </div>
      </nav>
    </div>
  )
}

function MobileNavLink({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between py-3 px-2 rounded-md transition-colors"
      onClick={onClick}
    >
      <span>{label}</span>
    </Link>
  )
}
