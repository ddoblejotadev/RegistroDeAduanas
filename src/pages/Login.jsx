import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Lock, Loader2, Shield, Mail, User, UserPlus } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { mockLogin, mockRegister } from "@/lib/MockAuthContext";

export default function Login() {
  const [tab, setTab] = useState("login"); // "login" | "register"

  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = mockLogin(email, password);
      window.location.href = (user.role === "funcionario" || user.role === "admin") ? "/panel" : "/";
    } catch (err) {
      setError(err.message || "Credenciales incorrectas.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (regPassword !== regConfirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (regPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setLoading(true);
    try {
      mockRegister(regEmail, regPassword, regName);
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (type) => {
    setTab("login");
    setError("");
    if (type === "admin") {
      setEmail("admin@aduana.cl");
      setPassword("admin123");
    } else {
      setEmail("viajero@test.cl");
      setPassword("viajero123");
    }
  };

  return (
    <AuthLayout
      icon={Shield}
      title="Aduana Digital"
      subtitle="Sistema de Pre-Registro Aduanero"
      footer={null}
    >
      {/* Tabs */}
      <div className="flex rounded-lg bg-muted p-1 mb-5">
        <button
          onClick={() => { setTab("login"); setError(""); }}
          className={`flex-1 text-sm font-medium py-2 rounded-md transition-colors ${tab === "login" ? "bg-white shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          <LogIn className="w-3.5 h-3.5 inline mr-1.5" />
          Iniciar Sesión
        </button>
        <button
          onClick={() => { setTab("register"); setError(""); }}
          className={`flex-1 text-sm font-medium py-2 rounded-md transition-colors ${tab === "register" ? "bg-white shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          <UserPlus className="w-3.5 h-3.5 inline mr-1.5" />
          Registrarse
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {tab === "login" ? (
        <>
          {/* Cuentas demo */}
          <div className="mb-5 p-4 rounded-xl bg-muted/60 border border-border space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cuentas de prueba</p>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" className="flex-1 text-xs" onClick={() => fillCredentials("admin")}>
                <Shield className="w-3.5 h-3.5 mr-1.5 text-primary" /> Administrador
              </Button>
              <Button type="button" variant="outline" size="sm" className="flex-1 text-xs" onClick={() => fillCredentials("viajero")}>
                <User className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" /> Viajero
              </Button>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><span className="font-medium">Admin:</span> admin@aduana.cl / admin123</p>
              <p><span className="font-medium">Viajero:</span> viajero@test.cl / viajero123</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" autoComplete="email" autoFocus placeholder="usuario@ejemplo.cl"
                  value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="password" type="password" autoComplete="current-password" placeholder="••••••••"
                  value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 h-12" required />
              </div>
            </div>
            <Button type="submit" className="w-full h-12 font-medium" disabled={loading}>
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Ingresando...</> : <><LogIn className="w-4 h-4 mr-2" /> Ingresar</>}
            </Button>
          </form>
        </>
      ) : (
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reg-name">Nombre completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="reg-name" type="text" autoFocus placeholder="Juan Pérez"
                value={regName} onChange={(e) => setRegName(e.target.value)} className="pl-10 h-12" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reg-email">Correo electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="reg-email" type="email" autoComplete="email" placeholder="correo@ejemplo.cl"
                value={regEmail} onChange={(e) => setRegEmail(e.target.value)} className="pl-10 h-12" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reg-password">Contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="reg-password" type="password" placeholder="Mínimo 6 caracteres"
                value={regPassword} onChange={(e) => setRegPassword(e.target.value)} className="pl-10 h-12" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reg-confirm">Confirmar contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="reg-confirm" type="password" placeholder="Repite tu contraseña"
                value={regConfirm} onChange={(e) => setRegConfirm(e.target.value)} className="pl-10 h-12" required />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Las cuentas nuevas se registran con rol de <span className="font-medium">Viajero</span>.
          </p>
          <Button type="submit" className="w-full h-12 font-medium" disabled={loading}>
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Registrando...</> : <><UserPlus className="w-4 h-4 mr-2" /> Crear cuenta</>}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}