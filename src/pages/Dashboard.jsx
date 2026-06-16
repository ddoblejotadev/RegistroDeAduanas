import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3, FileCheck, FileX, Clock, FileSearch, Package, CalendarDays, TrendingUp, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { format, subDays, startOfDay, isToday, isYesterday } from "date-fns";
import { es } from "date-fns/locale";
import StatCard from "@/components/dashboard/StatCard";

const PIE_COLORS = ["hsl(217, 91%, 48%)", "hsl(160, 60%, 45%)", "hsl(0, 84%, 60%)", "hsl(43, 96%, 56%)"];

export default function Dashboard() {
  const { data: declarations = [], isLoading } = useQuery({
    queryKey: ["declarations-stats"],
    queryFn: () => base44.entities.Declaration.list("-created_date", 500),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80 rounded-xl" />
          <Skeleton className="h-80 rounded-xl" />
        </div>
      </div>
    );
  }

  const total = declarations.length;
  const pendientes = declarations.filter((d) => d.estado === "pendiente").length;
  const enRevision = declarations.filter((d) => d.estado === "en_revision").length;
  const aprobados = declarations.filter((d) => d.estado === "aprobado").length;
  const rechazados = declarations.filter((d) => d.estado === "rechazado").length;

  // Declarations per day (last 7 days)
  const dailyData = [];
  for (let i = 6; i >= 0; i--) {
    const day = startOfDay(subDays(new Date(), i));
    const dayEnd = new Date(day);
    dayEnd.setHours(23, 59, 59, 999);
    const count = declarations.filter((d) => {
      const created = new Date(d.created_date);
      return created >= day && created <= dayEnd;
    }).length;
    dailyData.push({
      dia: format(day, "EEE dd", { locale: es }),
      declaraciones: count,
    });
  }

  // Status distribution
  const statusData = [
    { name: "Pendiente", value: pendientes },
    { name: "En Revisión", value: enRevision },
    { name: "Aprobado", value: aprobados },
    { name: "Rechazado", value: rechazados },
  ].filter((d) => d.value > 0);

  // Most declared goods
  const goodsCounts = {};
  declarations.forEach((d) => {
    d.bienes?.forEach((b) => {
      if (b.tipo) goodsCounts[b.tipo] = (goodsCounts[b.tipo] || 0) + b.cantidad;
    });
  });
  const topGoods = Object.entries(goodsCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([tipo, cantidad]) => ({ tipo, cantidad }));

  const todayStart = startOfDay(new Date());
  const yesterdayStart = startOfDay(subDays(new Date(), 1));
  const weekStart = startOfDay(subDays(new Date(), 6));

  const hoy = declarations.filter((d) => new Date(d.created_date) >= todayStart).length;
  const ayer = declarations.filter((d) => {
    const t = new Date(d.created_date);
    return t >= yesterdayStart && t < todayStart;
  }).length;
  const semana = declarations.filter((d) => new Date(d.created_date) >= weekStart).length;
  const tendencia = hoy - ayer;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary" />
          Estadísticas
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Resumen general de declaraciones aduaneras</p>
      </div>

      {/* Actividad reciente */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
              <CalendarDays className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">{hoy}</p>
              <p className="text-sm text-muted-foreground">Declaraciones hoy</p>
              {tendencia !== 0 && (
                <p className={`text-xs font-medium flex items-center gap-1 mt-0.5 ${tendencia > 0 ? "text-emerald-600" : "text-red-500"}`}>
                  {tendencia > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {tendencia > 0 ? "+" : ""}{tendencia} vs ayer
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6 text-violet-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-violet-600">{ayer}</p>
              <p className="text-sm text-muted-foreground">Declaraciones ayer</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">{semana}</p>
              <p className="text-sm text-muted-foreground">Últimos 7 días</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Métricas por estado */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total" value={total} icon={FileSearch} color="bg-primary" subtitle="Declaraciones" />
        <StatCard title="Pendientes" value={pendientes} icon={Clock} color="bg-amber-500" subtitle="Por revisar" />
        <StatCard title="Aprobadas" value={aprobados} icon={FileCheck} color="bg-emerald-500" />
        <StatCard title="Rechazadas" value={rechazados} icon={FileX} color="bg-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Declaraciones por Día</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData}>
                  <XAxis dataKey="dia" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="declaraciones" fill="hsl(217, 91%, 48%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Status pie */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Distribución por Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              {statusData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      dataKey="value"
                      nameKey="name"
                      paddingAngle={3}
                    >
                      {statusData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                  Sin datos disponibles
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top goods */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Package className="w-4 h-4 text-primary" />
            Bienes Más Declarados
          </CardTitle>
        </CardHeader>
        <CardContent>
          {topGoods.length > 0 ? (
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topGoods} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="tipo" width={140} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="cantidad" fill="hsl(160, 60%, 45%)" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground text-sm">
              No hay bienes declarados aún
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}