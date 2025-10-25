import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  Users, 
  MessageCircle, 
  User, 
  Settings,
  Sparkles,
  LogOut,
  ShoppingBag
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Find Mentors", href: "/mentors", icon: Users },
    { name: "Community", href: "/community", icon: MessageCircle },
    { name: "Marketplace", href: "/marketplace", icon: ShoppingBag },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Admin", href: "/admin", icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SheRise
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarFallback className="bg-primary/10 text-primary">SJ</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" onClick={() => window.location.href = "/"}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <nav className="space-y-1 sticky top-20">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link key={item.name} to={item.href}>
                    <Button
                      variant={active ? "secondary" : "ghost"}
                      className={`w-full justify-start ${
                        active ? "bg-primary/10 text-primary hover:bg-primary/20" : ""
                      }`}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="flex justify-around p-2">
          {navigation.slice(0, 4).map((item) => {
            const active = isActive(item.href);
            return (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={active ? "secondary" : "ghost"}
                  size="icon"
                  className={active ? "bg-primary/10 text-primary" : ""}
                >
                  <item.icon className="h-5 w-5" />
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default DashboardLayout;
