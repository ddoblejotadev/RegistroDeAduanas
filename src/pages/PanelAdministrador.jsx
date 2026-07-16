import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, FileText, Clock, CheckCircle, Eye, ArrowRight, AlertTriangle, BarChart3 } from "lucide-react";

const MOCK_USERS = [
  { id: 1, nombre: "Ana Martínez", email: "ana@aduana.cl", rol: "admin", activo: true },
  { id: 2, nombre: "Pedro González", email: "pedro@aduana.cl", rol: "funcionario", activo: true },
  { id: 3, nombre: "Laura Reyes", email: "laura@aduana.cl", rol: "funcionario", activo: false },
];

const ROL_CONFIG = {
  admin: { label: "Administrador", className: "bg-red-100 text-red-800 border-red-200" },
  funcionario: { label: "Funcionario", className: "bg-blue-100 text-blue-800 border-blue-200" },
  viajero: { label: "Viajero", className: "bg-green-100 text-green-800 border-green-200" },
};

export default function PanelAdministrador() {
  const { data: declarations = [], isLoading } = useQuery({
    queryKey: ["declarations-admin"],
    queryFn: () => base44.entities.Declaration.list("-created_date", 500),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  const total = declarations.length;
  const counts = {
    pendiente: declarations.filter((d) => d.estado === "pendiente").length,
    en_revision: declarations.filter((d) => d.estado === "en_revision").length,
    derivado_sag: declarations.filter((d) => d.estado === "derivado_sag").length,
    derivado_pdi: declarations.filter((d) => d.estado === "derivado_pdi").length,
    aprobado: declarations.filter((d) => d.estado === "aprobado").length,
    rechazado: declarations.filter((d) => d.estado === "rechazado").length,
  };

  const derivadoCounts = {
    SAG: declarations.filter((d) => d.derivado_a === "SAG").length,
    PDI: declarations.filter((d) => d.derivado_a === "PDI").length,
  };

  const statCards = [
    { title: "Total Declaraciones", value: total, icon: FileText, color: "text-primary", bg: "bg-primary/10" },
    { title: "Pendientes", value: counts.pendiente, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "En Revisión", value: counts.en_revision, icon: Eye, color: "text-sky-600", bg: "bg-sky-50" },
    { title: "Derivadas a SAG", value: counts.derivado_sag, icon: ArrowRight, color: "text-orange-600", bg: "bg-orange-50" },
    { title: "Derivadas a PDI", value: counts.derivado_pdi, icon: ArrowRight, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Aprobadas", value: counts.aprobado, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Rechazadas", value: counts.rechazado, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          Panel de Administración
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Gestión general del sistema y usuarios</p>
      </div>

      {/* Estadísticas */}
      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
          <BarChart3 className="w-5 h-5 text-primary" />
          Resumen de Declaraciones
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {statCards.map((card) => (
            <Card key={card.title} className="border shadow-sm">
              <CardContent className="p-4 flex flex-col gap-2">
                <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center`}>
                  <card.icon className={`w-4 h-4 ${card.color}`} />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                  <p className="text-xs text-muted-foreground leading-tight">{card.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Derivaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Declaraciones por Derivación</CardTitle>
            <CardDescription>Distribución de declaraciones derivadas a entidades externas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-sm font-medium">Derivadas a SAG</span>
                </div>
                <span className="text-lg font-bold text-orange-700">{derivadoCounts.SAG}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium">Derivadas a PDI</span>
                </div>
                <span className="text-lg font-bold text-purple-700">{derivadoCounts.PDI}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estado general */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Estado General del Sistema</CardTitle>
            <CardDescription>Resumen de actividad del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-muted-foreground">Total declaraciones</span>
                <span className="font-semibold">{total}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-muted-foreground">Porcentaje aprobadas</span>
                <span className="font-semibold">{total > 0 ? Math.round((counts.aprobado / total) * 100) : 0}%</span>
              </div>
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-muted-foreground">Porcentaje derivadas</span>
                <span className="font-semibold">{total > 0 ? Math.round(((counts.derivado_sag + counts.derivado_pdi) / total) * 100) : 0}%</span>
              </div>
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-muted-foreground">Tasa de rechazo</span>
                <span className="font-semibold">{total > 0 ? Math.round((counts.rechazado / total) * 100) : 0}%</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-muted-foreground">Usuarios registrados</span>
                <span className="font-semibold">3</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usuarios */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Usuarios del Sistema
          </CardTitle>
          <CardDescription>Usuarios registrados con roles de funcionario y administrador</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_USERS.map((user) => {
                const rolCfg = ROL_CONFIG[user.rol] || ROL_CONFIG.viajero;
                return (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.nombre}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge className={`${rolCfg.className} border text-xs`}>{rolCfg.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.activo ? "default" : "secondary"} className="text-xs">
                        {user.activo ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
