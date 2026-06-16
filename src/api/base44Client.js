import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

// If Base44 environment is provided, use real SDK; otherwise export a local mock client
let _base44;
if (import.meta.env.VITE_BASE44_APP_BASE_URL || appId) {
  _base44 = createClient({
    appId,
    token,
    functionsVersion,
    serverUrl: '',
    requiresAuth: false,
    appBaseUrl
  });
} else {
  // Minimal mock implementation to allow the app to run locally for demos
  const mockDeclarations = [];
  let idCounter = 1;

  _base44 = {
    auth: {
      async me() {
        return { id: 'user1', email: 'demo@example.com', name: 'Demo User' };
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
          return mockDeclarations.slice(0, limit);
        },
        async filter(_query, _sort = '-created_date', limit = 50) {
          return mockDeclarations.slice(0, limit);
        },
        async create(data) {
          const item = { id: String(idCounter++), ...data, created_date: new Date().toISOString() };
          mockDeclarations.unshift(item);
          return item;
        },
        async update(id, patch) {
          const i = mockDeclarations.find(x => x.id === String(id));
          if (i) Object.assign(i, patch);
          return i;
        }
      }
    }
  };

  // Seed demo data
  mockDeclarations.push({ id: '1', titulo: 'Declaración demo', estado: 'pendiente', created_date: new Date().toISOString(), created_by_id: 'user1' });
}

export const base44 = _base44;
