import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Download, QrCode, Car, MapPin, Flag, ArrowLeftRight } from "lucide-react";
import { motion } from "framer-motion";

const TIPO_VIAJE_LABEL = { ingreso: "Ingreso a Chile", salida: "Salida de Chile" };

export default function QRResult({ declaration, onNewDeclaration }) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    `ADUANA-DIGITAL|${declaration.codigo_qr}|${declaration.nombre_completo}|${declaration.rut}|${declaration.paso_fronterizo}|${declaration.pais_destino}`
  )}`;

  const vehiculo = declaration.vehiculo;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="max-w-md mx-auto overflow-hidden">
        <div className="bg-primary px-6 py-8 text-center text-primary-foreground">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-2xl font-bold font-heading">¡Registro Exitoso!</h2>
          <p className="text-sm text-white/80 mt-1">Su declaración ha sido registrada correctamente</p>
        </div>

        <CardContent className="p-6 text-center space-y-5">
          <div className="inline-block p-4 bg-white rounded-2xl shadow-md border">
            <img
              src={qrUrl}
              alt="Código QR de declaración"
              className="w-48 h-48 mx-auto"
            />
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Código de Declaración</p>
            <p className="text-lg font-mono font-bold text-foreground">{declaration.codigo_qr}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 rounded-lg bg-muted">
              <p className="text-xs text-muted-foreground">Viajero</p>
              <p className="font-semibold truncate">{declaration.nombre_completo}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> Paso</p>
              <p className="font-semibold truncate">{declaration.paso_fronterizo}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <p className="text-xs text-muted-foreground flex items-center gap-1"><Flag className="w-3 h-3" /> Destino</p>
              <p className="font-semibold">{declaration.pais_destino}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <p className="text-xs text-muted-foreground flex items-center gap-1"><ArrowLeftRight className="w-3 h-3" /> Viaje</p>
              <p className="font-semibold">{TIPO_VIAJE_LABEL[declaration.tipo_viaje] || declaration.tipo_viaje}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <p className="text-xs text-muted-foreground">Bienes</p>
              <p className="font-semibold">{declaration.bienes?.length || 0} items</p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <p className="text-xs text-muted-foreground">Valor Total</p>
              <p className="font-semibold">${declaration.valor_total?.toLocaleString("es-CL")}</p>
            </div>
          </div>

          {vehiculo && (
            <div className="p-3 rounded-lg bg-muted space-y-1.5">
              <p className="text-xs text-muted-foreground flex items-center gap-1"><Car className="w-3 h-3" /> Vehículo</p>
              <p className="font-semibold text-sm">{vehiculo.patente} — {vehiculo.tipo_permiso}</p>
              {vehiculo.plazo_dias && (
                <p className="text-xs text-muted-foreground">Plazo: {vehiculo.plazo_dias} días</p>
              )}
            </div>
          )}

          {declaration.derivado_a && (
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
              <p className="text-xs font-medium text-amber-700">
                Derivado a: {declaration.derivado_a}
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" asChild>
              <a href={qrUrl} download={`qr-${declaration.codigo_qr}.png`} target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4 mr-2" /> Descargar QR
              </a>
            </Button>
            <Button className="flex-1" onClick={onNewDeclaration}>
              <QrCode className="w-4 h-4 mr-2" /> Nueva Declaración
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
