import { useAuth } from "@/lib/MockAuthContext";
import { Navigate } from "react-router-dom";
import { Shield } from "lucide-react";

export default function RoleGuard({ allowedRoles, redirectTo, children }) {
  const { user } = useAuth();
  const role = user?.role || "viajero";

  if (!allowedRoles.includes(role)) {
    if (redirectTo) return <Navigate to={redirectTo} replace />;
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <Shield className="w-8 h-8 text-destructive" />
        </div>
        <h2 className="text-xl font-bold font-heading">Acceso Denegado</h2>
        <p className="text-muted-foreground max-w-sm">
          No tienes permisos para acceder a esta sección. Esta área es exclusiva para funcionarios aduaneros.
        </p>
      </div>
    );
  }

  return children;
}