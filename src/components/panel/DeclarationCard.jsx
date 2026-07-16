import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { User, MapPin, Car, Package, Clock, QrCode, Users, FileCheck, ChevronDown, ChevronUp, CreditCard, Utensils, PawPrint, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const STATUS_CONFIG = {
  pendiente: { label: "Pendiente", className: "bg-amber-100 text-amber-800 border-amber-200" },
  en_revision: { label: "En Revisión", className: "bg-blue-100 text-blue-800 border-blue-200" },
  derivado_sag: { label: "Derivado a SAG", className: "bg-orange-100 text-orange-800 border-orange-200" },
  derivado_pdi: { label: "Derivado a PDI", className: "bg-purple-100 text-purple-800 border-purple-200" },
  aprobado: { label: "Aprobado", className: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  rechazado: { label: "Rechazado", className: "bg-red-100 text-red-800 border-red-200" },
};

function SectionBlock({ icon: Icon, title, children }) {
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5" /> {title}
      </h4>
      {children}
    </div>
  );
}

function DataRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex justify-between items-start gap-2 text-sm">
      <span className="text-muted-foreground shrink-0">{label}:</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

function ViajeIcon({ tipo }) {
  if (!tipo) return null;
  return (
    <span className="text-xs uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-muted">
      {tipo === "ingreso" ? "Ingreso" : "Salida"}
    </span>
  );
}

export default function DeclarationCard({ declaration, onStatusChange, onDerivar, onNotasChange }) {
  const [expanded, setExpanded] = useState(false);
  const [notas, setNotas] = useState(declaration.notas_funcionario || "");
  const status = STATUS_CONFIG[declaration.estado] || STATUS_CONFIG.pendiente;
  const valorTotal = declaration.valor_total || declaration.bienes?.reduce((s, b) => s + (b.valor_estimado || 0) * (b.cantidad || 1), 0) || 0;
  const canDerivarSAG = declaration.estado === "en_revision" && (
    declaration.alimentos_o_mascotas || declaration.bienes?.some(b => b.requiere_sag)
  );
  const canDerivarPDI = declaration.estado === "en_revision";

  const handleNotasBlur = () => {
    if (onNotasChange && notas !== declaration.notas_funcionario) {
      onNotasChange(declaration.id, notas);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        {/* Header siempre visible */}
        <div className="p-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-sm truncate">{declaration.nombre_completo}</p>
                <Badge className={`${status.className} border text-xs shrink-0`}>{status.label}</Badge>
                {declaration.alimentos_o_mascotas && (
                  <Badge className="bg-teal-100 text-teal-800 border-teal-200 text-xs shrink-0 flex items-center gap-1">
                    <Utensils className="w-3 h-3" /> Alimentos/Mascotas
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground mt-0.5">
                <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" /> {declaration.rut}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {declaration.paso_fronterizo}</span>
                <ViajeIcon tipo={declaration.tipo_viaje} />
                <span className="flex items-center gap-1"><QrCode className="w-3 h-3" /> {declaration.codigo_qr}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />
                  {declaration.created_date ? format(new Date(declaration.created_date), "dd MMM yyyy, HH:mm", { locale: es }) : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Resumen rápido de badges */}
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <div className="flex gap-1.5">
              {declaration.vehiculo && (
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Car className="w-3 h-3" /> {declaration.vehiculo.patente}
                </span>
              )}
              {declaration.bienes?.length > 0 && (
                <span className="text-xs bg-muted px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Package className="w-3 h-3" /> {declaration.bienes.length}
                </span>
              )}
              {declaration.menores_a_cargo?.length > 0 && (
                <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Users className="w-3 h-3" /> {declaration.menores_a_cargo.length}
                </span>
              )}
              {declaration.documentos_presentados?.length > 0 && (
                <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <FileCheck className="w-3 h-3" /> {declaration.documentos_presentados.length}
                </span>
              )}
              {declaration.derivado_a && (
                <Badge className={
                  declaration.derivado_a === "SAG"
                    ? "bg-orange-100 text-orange-800 border-orange-200"
                    : "bg-purple-100 text-purple-800 border-purple-200"
                }>
                  Derivado a {declaration.derivado_a}
                </Badge>
              )}
            </div>
            <p className="text-sm font-bold text-primary">${valorTotal.toLocaleString("es-CL")} USD</p>
          </div>
        </div>

        {/* Toggle expandir */}
        <div className="border-t">
          <button
            className="w-full px-4 py-2 flex items-center justify-between text-xs text-muted-foreground hover:bg-muted/40 transition-colors"
            onClick={() => setExpanded(!expanded)}
          >
            <span>{expanded ? "Ocultar detalle" : "Ver detalle completo"}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Detalle expandido */}
        {expanded && (
          <div className="border-t p-4 space-y-5 bg-muted/20">
            {/* Datos personales */}
            <SectionBlock icon={User} title="Datos del Viajero">
              <div className="bg-card rounded-lg p-3 space-y-1.5 border">
                <DataRow label="Nombre" value={declaration.nombre_completo} />
                <DataRow label="Documento" value={declaration.tipo_documento ? `${declaration.tipo_documento}: ${declaration.rut}` : declaration.rut} />
                <DataRow label="Nacionalidad" value={declaration.nacionalidad} />
                <DataRow label="Fecha Nacimiento" value={declaration.fecha_nacimiento} />
              </div>
            </SectionBlock>

            {/* Viaje - actualizado con campos terrestres */}
            <SectionBlock icon={MapPin} title="Información de Viaje">
              <div className="bg-card rounded-lg p-3 space-y-1.5 border">
                <DataRow label="Paso Fronterizo" value={declaration.paso_fronterizo} />
                <DataRow label="País Destino" value={declaration.pais_destino} />
                <DataRow label="Tipo Viaje" value={declaration.tipo_viaje === "ingreso" ? "Ingreso" : "Salida"} />
                <DataRow label="Código QR" value={declaration.codigo_qr} />
              </div>
            </SectionBlock>

            {/* Vehículo (opcional) */}
            {declaration.vehiculo && (
              <SectionBlock icon={Car} title="Vehículo">
                <div className="bg-card rounded-lg p-3 space-y-1.5 border">
                  <DataRow label="Patente" value={declaration.vehiculo.patente} />
                  <DataRow label="Tipo Permiso" value={declaration.vehiculo.tipo_permiso} />
                  {declaration.vehiculo.plazo_dias && (
                    <DataRow label="Plazo" value={`${declaration.vehiculo.plazo_dias} días`} />
                  )}
                  {declaration.vehiculo.pais_origen && (
                    <DataRow label="País Origen" value={declaration.vehiculo.pais_origen} />
                  )}
                </div>
              </SectionBlock>
            )}

            {/* Alimentos o Mascotas */}
            {declaration.alimentos_o_mascotas && (
              <SectionBlock icon={declaration.alimentos_o_mascotas ? Utensils : PawPrint} title="Alimentos / Mascotas">
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 text-sm text-teal-900 flex items-center gap-2">
                  <Utensils className="w-4 h-4" />
                  Esta declaración incluye alimentos o mascotas
                </div>
              </SectionBlock>
            )}

            {/* Derivado a badge contextual */}
            {declaration.derivado_a && (
              <SectionBlock icon={ArrowRight} title="Derivación">
                <div className={`rounded-lg p-3 text-sm border flex items-center gap-2 ${
                  declaration.derivado_a === "SAG"
                    ? "bg-orange-50 border-orange-200 text-orange-900"
                    : "bg-purple-50 border-purple-200 text-purple-900"
                }`}>
                  <ArrowRight className="w-4 h-4" />
                  Derivado a {declaration.derivado_a === "SAG" ? "Servicio Agrícola y Ganadero" : "Policía de Investigaciones"}
                </div>
              </SectionBlock>
            )}

            {/* Menores */}
            {declaration.menores_a_cargo?.length > 0 && (
              <SectionBlock icon={Users} title={`Menores a Cargo (${declaration.menores_a_cargo.length})`}>
                <div className="space-y-2">
                  {declaration.menores_a_cargo.map((m, i) => (
                    <div key={i} className="bg-card rounded-lg p-3 border space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{m.nombre_completo || "—"}</span>
                        {m.parentesco && <Badge variant="outline" className="text-xs">{m.parentesco}</Badge>}
                      </div>
                      <div className="text-xs text-muted-foreground space-y-0.5">
                        {m.tipo_documento && m.documento && <p>{m.tipo_documento}: {m.documento}</p>}
                        {m.fecha_nacimiento && <p>Nacimiento: {m.fecha_nacimiento}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </SectionBlock>
            )}

            {/* Documentos */}
            {declaration.documentos_presentados?.length > 0 && (
              <SectionBlock icon={FileCheck} title="Documentos a Presentar">
                <div className="bg-card rounded-lg p-3 border flex flex-wrap gap-2">
                  {declaration.documentos_presentados.map((doc, i) => (
                    <Badge key={i} variant="outline" className="text-xs border-emerald-300 text-emerald-700 bg-emerald-50">
                      <FileCheck className="w-3 h-3 mr-1" /> {doc}
                    </Badge>
                  ))}
                </div>
              </SectionBlock>
            )}

            {/* Bienes */}
            {declaration.bienes?.length > 0 && (
              <SectionBlock icon={Package} title={`Bienes Declarados (${declaration.bienes.length})`}>
                <div className="space-y-1.5">
                  {declaration.bienes.map((b, i) => (
                    <div key={i} className="bg-card rounded-lg p-3 border flex items-center justify-between gap-2">
                      <div>
                        <span className="text-sm font-medium">{b.tipo}</span>
                        {b.descripcion && <p className="text-xs text-muted-foreground">{b.descripcion}</p>}
                      </div>
                      <div className="text-right text-xs text-muted-foreground shrink-0">
                        <p>x{b.cantidad}</p>
                        <p className="font-semibold text-foreground">${(b.valor_estimado * (b.cantidad || 1)).toLocaleString("es-CL")} USD</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-1 px-1">
                    <span className="text-sm text-muted-foreground">Valor Total</span>
                    <span className="text-base font-bold text-primary">${valorTotal.toLocaleString("es-CL")} USD</span>
                  </div>
                </div>
              </SectionBlock>
            )}

            {/* Notas funcionario */}
            <SectionBlock icon={User} title="Notas del Funcionario">
              <Textarea
                placeholder="Agregar notas sobre esta declaración..."
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                onBlur={handleNotasBlur}
                className="min-h-[80px] text-sm"
              />
            </SectionBlock>
          </div>
        )}

        {/* Acciones */}
        <div className="border-t p-3 flex items-center gap-3 bg-muted/10 flex-wrap">
          <span className="text-xs text-muted-foreground shrink-0">Cambiar estado:</span>
          <Select value={declaration.estado} onValueChange={(value) => onStatusChange(declaration.id, value)}>
            <SelectTrigger className="text-xs h-8 flex-1 max-w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="en_revision">En Revisión</SelectItem>
              <SelectItem value="derivado_sag">Derivado a SAG</SelectItem>
              <SelectItem value="derivado_pdi">Derivado a PDI</SelectItem>
              <SelectItem value="aprobado">Aprobado</SelectItem>
              <SelectItem value="rechazado">Rechazado</SelectItem>
            </SelectContent>
          </Select>
          {onDerivar && canDerivarSAG && (
            <Button
              size="sm"
              variant="outline"
              className="text-xs text-orange-700 border-orange-300 hover:bg-orange-50"
              onClick={() => onDerivar(declaration.id, "SAG")}
            >
              Derivar a SAG
            </Button>
          )}
          {onDerivar && canDerivarPDI && (
            <Button
              size="sm"
              variant="outline"
              className="text-xs text-purple-700 border-purple-300 hover:bg-purple-50"
              onClick={() => onDerivar(declaration.id, "PDI")}
            >
              Derivar a PDI
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
