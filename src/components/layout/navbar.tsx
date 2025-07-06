import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, User, Moon, Sun } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import image from './pickleballoriginal.png';
const API = import.meta.env.VITE_API; // Use the environment variable for API URL
const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Athletes", href: "/athletes" },
  { label: "Ranking", href: "/ranking" },
  { label: "Tournaments", href: "/tournaments" },
  { label: "Clubs", href: "/clubs" },
  { label: "About us", href: "/contact" },
  { label: "Admin Login", href: "/adminlogin12345" },
  { label: "Admin Signup", href: "/adminsignup12345" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const checkLoginStatus = () => {
      const googleData = localStorage.getItem("googleData");
      const userData = localStorage.getItem("userData");

      if (googleData || userData) {
        setIsLoggedIn(true);
        try {
          const parsedData = JSON.parse(googleData || userData || "{}");
          setUserName(parsedData.name || "User");
        } catch (error) {
          console.error("Error parsing user data:", error);
          setUserName("User");
        }
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  async function handleLogout() {
    localStorage.removeItem("userData");
    localStorage.removeItem("googleData");
    localStorage.removeItem("adminData");

    try {
      await fetch(`${API}/auth/logout`, {
        method: "GET",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      window.location.href = "http://localhost:8080";
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isActiveLink = (href) => {
    return href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ height: "80px" }}>
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2 group">
              <div style={{ width: "50px", height: "50px" }}>
                <img
                  src={image}
                  alt="Pickleball Logo"
                  style={{ background: "white" }}
                  className="h-15 w-auto rounded-full p-1 transition-transform group-hover:scale-110 duration-300"
                />
              </div>
              <span className="text-foreground font-semibold text-lg hidden sm:block">
                PickleballOfficial
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`nav-item px-4 py-2 rounded-md text-lg font-semibold ${
                  isActiveLink(item.href)
                    ? "text-pickle"
                    : "text-foreground/80 hover:text-pickle transition-colors"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="icon"
              className="rounded-full relative overflow-hidden hover:scale-105 transition-transform"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-5 w-5 text-yellow-400 absolute inset-0 m-auto transition-all duration-500 rotate-0 opacity-100" />
                  <Moon className="h-5 w-5 text-slate-700 absolute inset-0 m-auto transition-all duration-500 rotate-90 opacity-0" />
                </>
              ) : (
                <>
                  <Sun className="h-5 w-5 text-yellow-400 absolute inset-0 m-auto transition-all duration-500 rotate-90 opacity-0" />
                  <Moon className="h-5 w-5 text-slate-700 absolute inset-0 m-auto transition-all duration-500 rotate-0 opacity-100" />
                </>
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="flex items-center text-lg font-semibold text-foreground/80 hover:text-pickle transition-colors"
                >
                  <User className="h-4 w-4 mr-1" />
                  <span className="hover:underline">{userName}</span>
                </Link>
                <Button onClick={handleLogout} variant="outline" className="btn-animated text-lg">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-lg hover:text-pickle hover:bg-pickle/10">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-pickle hover:bg-pickle-dark text-white btn-animated text-lg">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="icon"
              className="rounded-full relative overflow-hidden"
              aria-label="Toggle theme"
            >
              <div className="relative h-5 w-5">
                {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
              </div>
            </Button>
            <button
              className="text-foreground/80 hover:text-pickle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item, index) => (
              <Link
                key={item.label}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-lg font-semibold ${
                  isActiveLink(item.href)
                    ? "text-pickle bg-pickle/10"
                    : "text-foreground/80 hover:text-pickle hover:bg-pickle/5"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-border">
            <div className="px-2 space-y-1">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center text-foreground/80 hover:text-pickle block px-3 py-2 rounded-md text-lg font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </Link>
                  <button
                    className="flex items-center text-foreground/80 hover:text-pickle w-full text-left px-3 py-2 rounded-md text-lg font-semibold"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-foreground/80 hover:text-pickle block px-3 py-2 rounded-md text-lg font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-pickle text-white hover:bg-pickle-dark block px-3 py-2 rounded-md text-lg font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
