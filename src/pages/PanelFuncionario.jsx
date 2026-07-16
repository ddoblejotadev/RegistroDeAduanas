import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, Search, Inbox, Clock, CheckCircle, Eye, CalendarDays, TrendingUp, ArrowRight } from "lucide-react";
import DeclarationCard from "@/components/panel/DeclarationCard";
import { startOfDay, subDays } from "date-fns";

const TABS = [
  { value: "todos", label: "Todos" },
  { value: "pendiente", label: "Pendiente" },
  { value: "en_revision", label: "En Revisión" },
  { value: "derivado_sag", label: "Derivado SAG" },
  { value: "derivado_pdi", label: "Derivado PDI" },
  { value: "aprobado", label: "Aprobado" },
  { value: "rechazado", label: "Rechazado" },
];

export default function PanelFuncionario() {
  const [activeTab, setActiveTab] = useState("todos");
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const { data: declarations = [], isLoading } = useQuery({
    queryKey: ["declarations"],
    queryFn: () => base44.entities.Declaration.list("-created_date", 200),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, estado }) => base44.entities.Declaration.update(id, { estado }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["declarations"] }),
  });

  const derivarMutation = useMutation({
    mutationFn: ({ id, entidad }) => base44.entities.Declaration.derivar(id, entidad),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["declarations"] }),
  });

  const notasMutation = useMutation({
    mutationFn: ({ id, notas }) => base44.entities.Declaration.update(id, { notas_funcionario: notas }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["declarations"] }),
  });

  const handleStatusChange = (id, estado) => {
    updateMutation.mutate({ id, estado });
  };

  const handleDerivar = (id, entidad) => {
    derivarMutation.mutate({ id, entidad });
  };

  const handleNotasChange = (id, notas) => {
    notasMutation.mutate({ id, notas });
  };

  const filtered = declarations.filter((d) => {
    const matchTab = activeTab === "todos" || d.estado === activeTab;
    const matchSearch =
      !search ||
      d.nombre_completo?.toLowerCase().includes(search.toLowerCase()) ||
      d.rut?.toLowerCase().includes(search.toLowerCase()) ||
      d.codigo_qr?.toLowerCase().includes(search.toLowerCase()) ||
      d.derivado_a?.toLowerCase().includes(search.toLowerCase()) ||
      d.paso_fronterizo?.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const counts = {
    todos: declarations.length,
    pendiente: declarations.filter((d) => d.estado === "pendiente").length,
    en_revision: declarations.filter((d) => d.estado === "en_revision").length,
    derivado_sag: declarations.filter((d) => d.estado === "derivado_sag").length,
    derivado_pdi: declarations.filter((d) => d.estado === "derivado_pdi").length,
    aprobado: declarations.filter((d) => d.estado === "aprobado").length,
    rechazado: declarations.filter((d) => d.estado === "rechazado").length,
  };

  const todayStart = startOfDay(new Date());
  const yesterdayStart = startOfDay(subDays(new Date(), 1));
  const weekStart = startOfDay(subDays(new Date(), 6));

  const hoy = declarations.filter((d) => new Date(d.created_date) >= todayStart).length;
  const ayer = declarations.filter((d) => {
    const t = new Date(d.created_date);
    return t >= yesterdayStart && t < todayStart;
  }).length;
  const semana = declarations.filter((d) => new Date(d.created_date) >= weekStart).length;

  const summaryCards = [
    { label: "Hoy", value: hoy, icon: CalendarDays, color: "text-primary", bg: "bg-primary/10" },
    { label: "Ayer", value: ayer, icon: TrendingUp, color: "text-violet-600", bg: "bg-violet-50" },
    { label: "Últimos 7 días", value: semana, icon: ClipboardList, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Pendientes", value: counts.pendiente, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "En Revisión", value: counts.en_revision, icon: Eye, color: "text-sky-600", bg: "bg-sky-50" },
    { label: "Derivadas", value: counts.derivado_sag + counts.derivado_pdi, icon: ArrowRight, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Aprobadas", value: counts.aprobado, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-primary" />
            Panel de Declaraciones
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{declarations.length} declaraciones registradas</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, RUT, código..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.label} className="border shadow-sm">
              <CardContent className="p-4 flex flex-col gap-2">
                <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${card.color}`} />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                  <p className="text-xs text-muted-foreground leading-tight">{card.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full sm:w-auto overflow-x-auto flex-nowrap">
          {TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="text-xs sm:text-sm flex-shrink-0">
              {tab.label} ({counts[tab.value]})
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Inbox className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No hay declaraciones</p>
          <p className="text-sm">No se encontraron resultados para los filtros actuales</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((d) => (
            <DeclarationCard
              key={d.id}
              declaration={d}
              onStatusChange={handleStatusChange}
              onDerivar={handleDerivar}
              onNotasChange={handleNotasChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
