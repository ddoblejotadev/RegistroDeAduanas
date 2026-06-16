import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/MockAuthContext";
import { Shield, Plane, BarChart3, ClipboardList, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = user?.role || "viajero";
  const isFuncionario = role === "funcionario" || role === "admin";

  const navItems = isFuncionario
    ? [
        { path: "/panel", label: "Declaraciones", icon: ClipboardList },
        { path: "/estadisticas", label: "Estadísticas", icon: BarChart3 },
      ]
    : [
        { path: "/", label: "Mi Portal", icon: Plane },
      ];

  const handleLogout = () => {
    // Use the auth context logout so both mock and real SDK flows are handled
    logout();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold tracking-tight font-heading">Aduana Digital</h1>
                <p className="text-xs text-white/70 -mt-0.5">Sistema de Pre-Registro</p>
              </div>
              <h1 className="sm:hidden text-lg font-bold font-heading">Aduana Digital</h1>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant="ghost"
                      className={`text-white/80 hover:text-white hover:bg-white/15 ${active ? "bg-white/20 text-white" : ""}`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-semibold">
                  {user?.full_name?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-white/90 font-medium">{user?.full_name || "Usuario"}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="text-white/80 hover:text-white hover:bg-white/15">
                <LogOut className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden text-white/80" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-white/20 pb-3 px-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}>
                  <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mt-1 ${active ? "bg-white/20" : "hover:bg-white/10"}`}>
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}