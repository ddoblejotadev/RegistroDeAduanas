import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/MockAuthContext";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Package, Send, Loader2, ClipboardList, Clock, QrCode, Users, FileCheck } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import DatosPersonalesForm from "@/components/registro/DatosPersonalesForm";
import BienesForm from "@/components/registro/BienesForm";
import MenoresForm from "@/components/registro/MenoresForm";
import DocumentosForm from "@/components/registro/DocumentosForm";
import QRResult from "@/components/registro/QRResult";

const STATUS_CONFIG = {
  pendiente: { label: "Pendiente", className: "bg-amber-100 text-amber-800 border-amber-200" },
  en_revision: { label: "En Revisión", className: "bg-blue-100 text-blue-800 border-blue-200" },
  aprobado: { label: "Aprobado", className: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  rechazado: { label: "Rechazado", className: "bg-red-100 text-red-800 border-red-200" },
};

function generateCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "AD-";
  for (let i = 0; i < 8; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

const EMPTY_DATOS = {
  nombre_completo: "", rut: "", tipo_documento: "", nacionalidad: "",
  fecha_nacimiento: "", vuelo_llegada: "", pais_origen: "", fecha_llegada: ""
};

export default function PortalViajero() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("nuevo");
  const [step, setStep] = useState("form");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [datos, setDatos] = useState(EMPTY_DATOS);
  const [menores, setMenores] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [bienes, setBienes] = useState([]);

  const { data: misDeclaraciones = [], refetch } = useQuery({
    queryKey: ["mis-declaraciones", user?.id],
    queryFn: () => base44.entities.Declaration.filter({ created_by_id: user?.id }, "-created_date", 50),
    enabled: !!user?.id,
  });

  const canSubmit = datos.nombre_completo && datos.rut && datos.nacionalidad && datos.vuelo_llegada;

  const handleSubmit = async () => {
    if (!canSubmit) {
      toast({ title: "Complete todos los campos obligatorios", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const valorTotal = bienes.reduce((sum, b) => sum + (b.valor_estimado || 0) * (b.cantidad || 1), 0);
    const codigo = generateCode();
    const declaration = await base44.entities.Declaration.create({
      ...datos, menores_a_cargo: menores, documentos_presentados: documentos,
      bienes, valor_total: valorTotal, estado: "pendiente", codigo_qr: codigo,
    });
    setResult({ ...declaration, codigo_qr: codigo, ...datos, bienes, valor_total: valorTotal });
    setStep("result");
    setSubmitting(false);
    refetch();
  };

  const handleNewDeclaration = () => {
    setDatos(EMPTY_DATOS);
    setMenores([]);
    setDocumentos([]);
    setBienes([]);
    setResult(null);
    setStep("form");
    setActiveTab("nuevo");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold font-heading text-foreground">Portal del Viajero</h1>
        <p className="text-muted-foreground">Gestione sus declaraciones aduaneras</p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setStep("form"); }}>
        <TabsList className="w-full">
          <TabsTrigger value="nuevo" className="flex-1">
            <Plane className="w-4 h-4 mr-2" /> Nueva Declaración
          </TabsTrigger>
          <TabsTrigger value="mis" className="flex-1">
            <ClipboardList className="w-4 h-4 mr-2" /> Mis Declaraciones ({misDeclaraciones.length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {activeTab === "nuevo" && (
        <>
          {step === "result" && result ? (
            <QRResult declaration={result} onNewDeclaration={handleNewDeclaration} />
          ) : (
            <div className="space-y-4">
              {/* Sección 1: Datos Personales */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Plane className="w-5 h-5 text-primary" /> Datos del Viajero
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DatosPersonalesForm data={datos} onChange={setDatos} />
                </CardContent>
              </Card>

              {/* Sección 2: Menores de Edad */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="w-5 h-5 text-primary" /> Menores de Edad a Cargo
                    {menores.length > 0 && (
                      <Badge variant="secondary" className="ml-auto text-xs">{menores.length}</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MenoresForm menores={menores} onChange={setMenores} />
                </CardContent>
              </Card>

              {/* Sección 3: Documentos */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileCheck className="w-5 h-5 text-primary" /> Documentos a Presentar
                    {documentos.length > 0 && (
                      <Badge variant="secondary" className="ml-auto text-xs">{documentos.length}</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DocumentosForm documentos={documentos} onChange={setDocumentos} />
                </CardContent>
              </Card>

              {/* Sección 4: Bienes */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Package className="w-5 h-5 text-primary" /> Declaración de Bienes
                    {bienes.length > 0 && (
                      <Badge variant="secondary" className="ml-auto text-xs">{bienes.length}</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BienesForm bienes={bienes} onChange={setBienes} />
                </CardContent>
              </Card>

              <Button
                className="w-full h-12 text-base font-semibold"
                disabled={!canSubmit || submitting}
                onClick={handleSubmit}
              >
                {submitting
                  ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Enviando...</>
                  : <><Send className="w-5 h-5 mr-2" /> Enviar Declaración</>
                }
              </Button>
            </div>
          )}
        </>
      )}

      {activeTab === "mis" && (
        <div className="space-y-3">
          {misDeclaraciones.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <ClipboardList className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="font-medium">No tiene declaraciones aún</p>
                <p className="text-sm">Sus declaraciones aparecerán aquí una vez enviadas</p>
              </CardContent>
            </Card>
          ) : (
            misDeclaraciones.map((d) => {
              const status = STATUS_CONFIG[d.estado] || STATUS_CONFIG.pendiente;
              return (
                <Card key={d.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm">{d.vuelo_llegada}</span>
                          <Badge className={`${status.className} border text-xs`}>{status.label}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><QrCode className="w-3.5 h-3.5" /> {d.codigo_qr}</span>
                          <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5" /> {d.bienes?.length || 0} bienes</span>
                          {d.menores_a_cargo?.length > 0 && (
                            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {d.menores_a_cargo.length} menor(es)</span>
                          )}
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />
                            {d.created_date ? format(new Date(d.created_date), "dd MMM yyyy, HH:mm", { locale: es }) : "—"}
                          </span>
                        </div>
                        <p className="text-sm font-semibold">
                          Valor Total: <span className="text-primary">${d.valor_total?.toLocaleString("es-CL") || "0"} USD</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}