import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, CreditCard, Globe, Plane, Calendar, MapPin } from "lucide-react";

const NACIONALIDADES = [
  "Chile", "Argentina", "Brasil", "Colombia", "México", "Perú", "Ecuador", "Bolivia",
  "Venezuela", "Uruguay", "Paraguay", "España", "Estados Unidos", "Canadá", "Alemania",
  "Francia", "Italia", "Reino Unido", "China", "Japón", "Corea del Sur", "Otra"
];

const TIPOS_DOCUMENTO = ["RUT", "Pasaporte", "Cédula de Identidad", "Otro"];

export default function DatosPersonalesForm({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2 space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <User className="w-4 h-4 text-primary" /> Nombre Completo <span className="text-destructive">*</span>
          </Label>
          <Input
            placeholder="Ingrese su nombre completo"
            value={data.nombre_completo || ""}
            onChange={(e) => update("nombre_completo", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Tipo de Documento <span className="text-destructive">*</span></Label>
          <Select value={data.tipo_documento || ""} onValueChange={(v) => update("tipo_documento", v)}>
            <SelectTrigger><SelectValue placeholder="Seleccione tipo" /></SelectTrigger>
            <SelectContent>
              {TIPOS_DOCUMENTO.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-primary" /> N° Documento <span className="text-destructive">*</span>
          </Label>
          <Input
            placeholder="Ej: 12.345.678-9"
            value={data.rut || ""}
            onChange={(e) => update("rut", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" /> Nacionalidad <span className="text-destructive">*</span>
          </Label>
          <Select value={data.nacionalidad || ""} onValueChange={(v) => update("nacionalidad", v)}>
            <SelectTrigger><SelectValue placeholder="Seleccione su nacionalidad" /></SelectTrigger>
            <SelectContent>
              {NACIONALIDADES.map((n) => (
                <SelectItem key={n} value={n}>{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" /> Fecha de Nacimiento
          </Label>
          <Input
            type="date"
            value={data.fecha_nacimiento || ""}
            onChange={(e) => update("fecha_nacimiento", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Plane className="w-4 h-4 text-primary" /> N° Vuelo de Llegada <span className="text-destructive">*</span>
          </Label>
          <Input
            placeholder="Ej: LA-402"
            value={data.vuelo_llegada || ""}
            onChange={(e) => update("vuelo_llegada", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" /> País de Procedencia
          </Label>
          <Select value={data.pais_origen || ""} onValueChange={(v) => update("pais_origen", v)}>
            <SelectTrigger><SelectValue placeholder="País de origen del vuelo" /></SelectTrigger>
            <SelectContent>
              {NACIONALIDADES.map((n) => (
                <SelectItem key={n} value={n}>{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" /> Fecha de Llegada
          </Label>
          <Input
            type="date"
            value={data.fecha_llegada || ""}
            onChange={(e) => update("fecha_llegada", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}