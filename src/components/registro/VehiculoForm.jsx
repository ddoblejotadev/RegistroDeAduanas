import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Car, Plus, Trash2 } from "lucide-react";

const TIPOS_PERMISO = ["Temporal", "Definitivo", "Tránsito"];

export default function VehiculoForm({ vehiculo, onChange }) {
  if (!vehiculo) {
    return (
      <Button variant="outline" className="w-full border-dashed" onClick={() => onChange({ patente: "", tipo_permiso: "", plazo_dias: 7, pais_origen: "" })}>
        <Plus className="w-4 h-4 mr-2" /> Agregar Vehículo
      </Button>
    );
  }

  const update = (field, value) => onChange({ ...vehiculo, [field]: value });

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-primary flex items-center gap-2">
            <Car className="w-4 h-4" /> Datos del Vehículo
          </span>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => onChange(null)}>
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Patente <span className="text-destructive">*</span></Label>
            <Input
              placeholder="Ej: ABC-1234"
              value={vehiculo.patente || ""}
              onChange={(e) => update("patente", e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Tipo de Permiso <span className="text-destructive">*</span></Label>
            <Select value={vehiculo.tipo_permiso || ""} onValueChange={(v) => update("tipo_permiso", v)}>
              <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Seleccione" /></SelectTrigger>
              <SelectContent>
                {TIPOS_PERMISO.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Plazo (días)</Label>
            <Input
              type="number"
              min="1"
              value={vehiculo.plazo_dias || ""}
              onChange={(e) => update("plazo_dias", parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">País de Origen</Label>
            <Input
              placeholder="Ej: Argentina"
              value={vehiculo.pais_origen || ""}
              onChange={(e) => update("pais_origen", e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
