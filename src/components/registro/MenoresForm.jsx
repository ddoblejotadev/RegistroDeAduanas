import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Users } from "lucide-react";

const PARENTESCOS = ["Hijo/a", "Sobrino/a", "Nieto/a", "Otro familiar", "Tutor legal"];
const TIPOS_DOC = ["RUT", "Pasaporte", "Cédula de Identidad"];

export default function MenoresForm({ menores, onChange }) {
  const addMenor = () => {
    onChange([...menores, { nombre_completo: "", tipo_documento: "", documento: "", fecha_nacimiento: "", parentesco: "", autorizacion_notarial: false }]);
  };

  const removeMenor = (index) => {
    onChange(menores.filter((_, i) => i !== index));
  };

  const updateMenor = (index, field, value) => {
    const updated = [...menores];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {menores.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground border-2 border-dashed rounded-xl">
          <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p className="text-sm font-medium">No ha agregado menores de edad</p>
          <p className="text-xs mt-1">Si viaja con menores a su cargo, agrégelos aquí</p>
        </div>
      ) : (
        menores.map((menor, index) => (
          <div key={index} className="p-4 rounded-xl border bg-muted/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-primary flex items-center gap-2">
                <Users className="w-4 h-4" /> Menor #{index + 1}
              </span>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeMenor(index)}>
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2 space-y-1.5">
                <Label className="text-xs">Nombre Completo</Label>
                <Input
                  placeholder="Nombre completo del menor"
                  value={menor.nombre_completo || ""}
                  onChange={(e) => updateMenor(index, "nombre_completo", e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Tipo de Documento</Label>
                <Select value={menor.tipo_documento || ""} onValueChange={(v) => updateMenor(index, "tipo_documento", v)}>
                  <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Tipo doc." /></SelectTrigger>
                  <SelectContent>
                    {TIPOS_DOC.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">N° Documento</Label>
                <Input
                  placeholder="Número de documento"
                  value={menor.documento || ""}
                  onChange={(e) => updateMenor(index, "documento", e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Fecha de Nacimiento</Label>
                <Input
                  type="date"
                  value={menor.fecha_nacimiento || ""}
                  onChange={(e) => updateMenor(index, "fecha_nacimiento", e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Parentesco</Label>
                <Select value={menor.parentesco || ""} onValueChange={(v) => updateMenor(index, "parentesco", v)}>
                  <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Seleccione" /></SelectTrigger>
                  <SelectContent>
                    {PARENTESCOS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Checkbox
                id={`autorizacion-${index}`}
                checked={menor.autorizacion_notarial || false}
                onCheckedChange={(checked) => updateMenor(index, "autorizacion_notarial", checked)}
              />
              <Label htmlFor={`autorizacion-${index}`} className="text-xs cursor-pointer">
                ¿Tiene autorización notarial?
              </Label>
            </div>
          </div>
        ))
      )}

      <Button variant="outline" className="w-full border-dashed" onClick={addMenor}>
        <Plus className="w-4 h-4 mr-2" /> Agregar Menor de Edad
      </Button>
    </div>
  );
}
