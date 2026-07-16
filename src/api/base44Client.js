// Mock-only Base44 client for local demo (no external dependency)
const STORAGE_KEY = 'mock_auth_user';
let idCounter = 1;

function getCurrentUserId() {
  try {
    const s = sessionStorage.getItem(STORAGE_KEY);
    if (!s) return null;
    const u = JSON.parse(s);
    return u?.id || null;
  } catch { return null; }
}

const mockDeclarations = [];

function makeDeclaration(overrides = {}) {
  const now = new Date().toISOString();
  return {
    id: String(idCounter++),
    nombre_completo: overrides.nombre_completo || 'Juan Pérez',
    rut: overrides.rut || '11.111.111-1',
    codigo_qr: overrides.codigo_qr || `AD-${Math.random().toString(36).slice(2,10).toUpperCase()}`,
    paso_fronterizo: overrides.paso_fronterizo || 'Paso Los Libertadores',
    pais_destino: overrides.pais_destino || 'Argentina',
    tipo_viaje: overrides.tipo_viaje || 'ingreso',
    vehiculo: overrides.vehiculo || null,
    alimentos_o_mascotas: overrides.alimentos_o_mascotas || false,
    derivado_a: overrides.derivado_a || null,
    bienes: overrides.bienes || [{ tipo: 'Electrónica', descripcion: 'Teléfono', cantidad: 1, valor_estimado: 300, requiere_sag: false }],
    menores_a_cargo: overrides.menores_a_cargo || [],
    documentos_presentados: overrides.documentos_presentados || [],
    valor_total: overrides.valor_total || 300,
    estado: overrides.estado || 'pendiente',
    created_date: overrides.created_date || now,
    created_by_id: overrides.created_by_id || getCurrentUserId() || 'mock-viajero-001',
    titulo: overrides.titulo || 'Declaración demo'
  };
}

// Seed demo data — land border scenarios
mockDeclarations.push(makeDeclaration({
  nombre_completo: 'Juan Pérez', rut: '12.345.678-9',
  paso_fronterizo: 'Paso Los Libertadores', pais_destino: 'Argentina', tipo_viaje: 'salida',
  estado: 'pendiente', created_by_id: 'mock-viajero-001'
}));
mockDeclarations.push(makeDeclaration({
  nombre_completo: 'María López', rut: '98.765.432-1',
  paso_fronterizo: 'Paso Los Libertadores', pais_destino: 'Chile', tipo_viaje: 'ingreso',
  vehiculo: { patente: 'ABC-1234', tipo_permiso: 'Temporal', plazo_dias: 30, pais_origen: 'Argentina' },
  estado: 'en_revision', created_by_id: 'mock-admin-001'
}));
mockDeclarations.push(makeDeclaration({
  nombre_completo: 'Carlos Ruiz', rut: '22.333.444-5',
  paso_fronterizo: 'Paso Los Libertadores', pais_destino: 'Chile', tipo_viaje: 'ingreso',
  alimentos_o_mascotas: true,
  estado: 'aprobado', created_by_id: 'mock-admin-001'
}));

export const base44 = {
  auth: {
    async me() {
      try {
        const s = sessionStorage.getItem(STORAGE_KEY);
        if (s) return JSON.parse(s);
      } catch {}
      return { id: 'mock-viajero-001', email: 'viajero@test.cl', full_name: 'Juan Pérez' };
    },
    async resetPasswordRequest(email) { return {}; },
    async resetPassword({ resetToken, newPassword }) { return {}; },
    async register({ email, password }) { return { access_token: 'mocktoken' }; },
    async verifyOtp({ email, otpCode }) { return { access_token: 'mocktoken' }; },
    setToken() {},
    logout() {},
    loginWithProvider(provider, redirect) { window.location.href = redirect || '/'; },
    redirectToLogin() { window.location.href = '/login'; }
  },
  entities: {
    Declaration: {
      async list(_sort = '-created_date', limit = 50) {
        return mockDeclarations.slice().sort((a,b) => new Date(b.created_date) - new Date(a.created_date)).slice(0, limit);
      },
      async filter(query = {}, _sort = '-created_date', limit = 50) {
        let results = mockDeclarations.slice();
        if (query && query.created_by_id) {
          results = results.filter(d => String(d.created_by_id) === String(query.created_by_id));
        }
        if (query && query.estado) {
          results = results.filter(d => d.estado === query.estado);
        }
        return results.slice(0, limit);
      },
      async create(data) {
        const item = makeDeclaration({ ...data, created_by_id: data.created_by_id || getCurrentUserId() || 'mock-viajero-001' });
        mockDeclarations.unshift(item);
        return item;
      },
      async update(id, patch) {
        const i = mockDeclarations.find(x => x.id === String(id));
        if (i) Object.assign(i, patch);
        return i;
      },
      async derivar(id, entidad) {
        const i = mockDeclarations.find(x => x.id === String(id));
        if (!i) return null;
        if (entidad === 'SAG') {
          i.derivado_a = 'SAG';
          i.estado = 'derivado_sag';
        } else if (entidad === 'PDI') {
          i.derivado_a = 'PDI';
          i.estado = 'derivado_pdi';
        }
        return i;
      }
    }
  }
};
