import { FileCheck, Info } from "lucide-react";

const DOCUMENTOS = [
  { id: "Cédula de Identidad", label: "Cédula de Identidad", desc: "Documento de identificación nacional" },
  { id: "Pasaporte", label: "Pasaporte", desc: "Requerido para viajeros extranjeros" },
  { id: "Permiso de Circulación", label: "Permiso de Circulación", desc: "Para vehículos nacionales" },
  { id: "Seguro del Automóvil", label: "Seguro del Automóvil", desc: "SOAP o seguro fronterizo vigente" },
  { id: "Certificado de Vacunación", label: "Certificado de Vacunación", desc: "Según normativas sanitarias vigentes" },
  { id: "Permiso de Menor", label: "Permiso Notarial de Menor", desc: "Solo si viaja con menores sin ambos padres presentes" },
  { id: "Declaración Jurada de Alimentos", label: "Declaración Jurada de Alimentos", desc: "Para ingreso de productos alimenticios" },
  { id: "Documentación del Vehículo", label: "Documentación del Vehículo", desc: "Padrón, título o autorización de uso" },
];

export default function DocumentosForm({ documentos, onChange }) {
  const toggle = (docId) => {
    if (documentos.includes(docId)) {
      onChange(documentos.filter((d) => d !== docId));
    } else {
      onChange([...documentos, docId]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 border border-blue-200">
        <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
        <p className="text-xs text-blue-700">
          Seleccione los documentos que presentará al llegar. Marque solo los que apliquen a su situación de viaje.
        </p>
      </div>

      <div className="space-y-2">
        {DOCUMENTOS.map((doc) => {
          const checked = documentos.includes(doc.id);
          return (
            <label
              key={doc.id}
              className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                checked ? "bg-primary/5 border-primary/40" : "bg-muted/20 border-border hover:border-primary/20"
              }`}
            >
              <input
                type="checkbox"
                className="mt-0.5 accent-primary"
                checked={checked}
                onChange={() => toggle(doc.id)}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <FileCheck className={`w-3.5 h-3.5 ${checked ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="text-sm font-medium">
                    {doc.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{doc.desc}</p>
              </div>
            </label>
          );
        })}
      </div>

      {documentos.length > 0 && (
        <p className="text-xs text-primary font-medium pt-1">
          ✓ {documentos.length} documento{documentos.length > 1 ? "s" : ""} seleccionado{documentos.length > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
