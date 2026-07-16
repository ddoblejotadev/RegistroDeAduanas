import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Package } from "lucide-react";

const TIPOS_BIENES = [
  "Electrónica", "Ropa y Calzado", "Alimentos y Bebidas", "Joyería y Accesorios",
  "Perfumes y Cosméticos", "Equipaje Personal", "Medicamentos", "Instrumentos Musicales",
  "Artículos Deportivos", "Libros y Revistas", "Tabaco y Alcohol", "Otro"
];

export default function BienesForm({ bienes, onChange }) {
  const addBien = () => {
    onChange([...bienes, { tipo: "", cantidad: 1, valor_estimado: 0, requiere_sag: false }]);
  };

  const removeBien = (index) => {
    onChange(bienes.filter((_, i) => i !== index));
  };

  const updateBien = (index, field, value) => {
    const updated = [...bienes];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const valorTotal = bienes.reduce((sum, b) => sum + (b.valor_estimado || 0) * (b.cantidad || 1), 0);

  return (
    <div className="space-y-4">
      {bienes.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Package className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No ha declarado bienes aún</p>
        </div>
      )}

      {bienes.map((bien, index) => (
        <div key={index} className="p-4 rounded-xl border bg-muted/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-primary">Bien #{index + 1}</span>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeBien(index)}>
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Tipo de Bien</Label>
            <Select value={bien.tipo} onValueChange={(v) => updateBien(index, "tipo", v)}>
              <SelectTrigger><SelectValue placeholder="Seleccione tipo" /></SelectTrigger>
              <SelectContent>
                {TIPOS_BIENES.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs">Cantidad</Label>
              <Input
                type="number"
                min="1"
                value={bien.cantidad || ""}
                onChange={(e) => updateBien(index, "cantidad", parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Valor Estimado (USD)</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={bien.valor_estimado || ""}
                onChange={(e) => updateBien(index, "valor_estimado", parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Checkbox
              id={`sag-${index}`}
              checked={bien.requiere_sag || false}
              onCheckedChange={(checked) => updateBien(index, "requiere_sag", checked)}
            />
            <Label htmlFor={`sag-${index}`} className="text-xs cursor-pointer">
              Requiere SAG
            </Label>
            {bien.requiere_sag && (
              <Badge variant="outline" className="text-[10px] h-5 bg-amber-50 text-amber-700 border-amber-300 ml-1">
                Requiere SAG
              </Badge>
            )}
          </div>
        </div>
      ))}

      <Button variant="outline" className="w-full border-dashed" onClick={addBien}>
        <Plus className="w-4 h-4 mr-2" /> Agregar Bien
      </Button>

      {bienes.length > 0 && (
        <div className="flex justify-between items-center pt-3 border-t">
          <span className="text-sm font-medium text-muted-foreground">Valor Total Declarado</span>
          <span className="text-lg font-bold text-primary">${valorTotal.toLocaleString("es-CL", { minimumFractionDigits: 2 })}</span>
        </div>
      )}
    </div>
  );
}
