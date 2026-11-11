const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const FALLBACK_CATEGORIES = [
  { id_categoria: 1, nombre: 'Sentadilla Libre', grupo_muscular: 'Tren Inferior · Cuádriceps', descripcion: 'Sentadilla libre con barra olímpica.' },
  { id_categoria: 2, nombre: 'Press de Banca', grupo_muscular: 'Pectoral · Tríceps', descripcion: 'Press de banca plano reglamentario.' },
  { id_categoria: 3, nombre: 'Peso Muerto', grupo_muscular: 'Cadena Posterior', descripcion: 'Levantamiento de peso muerto desde plataforma.' },
  { id_categoria: 4, nombre: 'Dominadas en Barra', grupo_muscular: 'Dorsales · Bíceps', descripcion: 'Dominadas estrictas o lastradas en barra fija.' },
];

const FALLBACK_RECORDS = [
  {
    id_record: 1,
    id_categoria: 1,
    nombre_categoria: 'Sentadilla Libre',
    grupo_muscular: 'Tren Inferior · Cuádriceps',
    id_atleta: 1,
    nombre_atleta: 'Mateo Morales',
    pais: 'MX',
    peso_corporal: 82.5,
    peso_levantado: 195,
    repeticiones: 1,
    fecha: '2024-10-14',
    es_oficial: true,
  },
  {
    id_record: 2,
    id_categoria: 2,
    nombre_categoria: 'Press de Banca',
    grupo_muscular: 'Pectoral · Tríceps',
    id_atleta: 2,
    nombre_atleta: 'Sofia Valenzuela',
    pais: 'ES',
    peso_corporal: 64.0,
    peso_levantado: 150,
    repeticiones: 1,
    fecha: '2024-11-02',
    es_oficial: true,
  },
  {
    id_record: 3,
    id_categoria: 3,
    nombre_categoria: 'Peso Muerto',
    grupo_muscular: 'Cadena Posterior',
    id_atleta: 3,
    nombre_atleta: 'Carlos Quintana',
    pais: 'AR',
    peso_corporal: 90.0,
    peso_levantado: 240,
    repeticiones: 1,
    fecha: '2024-11-18',
    es_oficial: true,
  },
  {
    id_record: 4,
    id_categoria: 1,
    nombre_categoria: 'Sentadilla Libre',
    grupo_muscular: 'Tren Inferior · Cuádriceps',
    id_atleta: 4,
    nombre_atleta: 'Diego Hernández',
    pais: 'MX',
    peso_corporal: 78.0,
    peso_levantado: 182.5,
    repeticiones: 2,
    fecha: '2024-11-21',
    es_oficial: false,
  },
];

function getAuthHeaders(token) {
  const jwt = token || localStorage.getItem('fitnessy_token');
  const headers = { 'Content-Type': 'application/json' };
  if (jwt) {
    headers.Authorization = `Bearer ${jwt}`;
  }
  return headers;
}

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const errorMsg =
      data.message ||
      (Array.isArray(data.errors) && data.errors[0]?.msg) ||
      'Error en la comunicación con el servidor.';
    throw new Error(errorMsg);
  }
  return data;
}

export const apiService = {
  // AUTH
  async login({ correo, password }) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ correo, password }),
    });
    return handleResponse(res);
  },

  async register(payload) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  async getMe(token) {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: getAuthHeaders(token),
    });
    return handleResponse(res);
  },

  // CATEGORIAS
  async getCategories() {
    try {
      const res = await fetch(`${API_URL}/categorias`);
      if (!res.ok) throw new Error('Fallback categories');
      const data = await res.json();
      return Array.isArray(data) && data.length > 0 ? data : FALLBACK_CATEGORIES;
    } catch {
      return FALLBACK_CATEGORIES;
    }
  },

  async createCategory(payload) {
    const res = await fetch(`${API_URL}/categorias`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  async updateCategory(id, payload) {
    const res = await fetch(`${API_URL}/categorias/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  async deleteCategory(id) {
    const res = await fetch(`${API_URL}/categorias/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  // RECORDS
  async getRecords({ id_categoria = null, es_oficial = null, search = '', page = 1, limit = 3 } = {}) {
    try {
      const params = new URLSearchParams();
      if (id_categoria !== null && id_categoria !== undefined && id_categoria !== '') {
        params.set('id_categoria', String(id_categoria));
      }
      if (es_oficial !== null && es_oficial !== undefined && es_oficial !== '') {
        params.set('es_oficial', String(es_oficial));
      }
      if (search && String(search).trim() !== '') {
        params.set('search', String(search).trim());
      }
      params.set('page', String(page));
      params.set('limit', String(limit));

      const res = await fetch(`${API_URL}/records?${params.toString()}`);
      if (!res.ok) throw new Error('Fallback records');
      const data = await res.json();
      const list = data.records || data.data || (Array.isArray(data) ? data : []);
      const total = data.total ?? list.length;
      const totalPages = data.totalPages || data.pagination?.totalPages || Math.max(1, Math.ceil(total / limit));
      return {
        records: list,
        total,
        page: Number(data.page || page),
        limit: Number(data.limit || limit),
        totalPages,
      };
    } catch {
      let filtered = [...FALLBACK_RECORDS];
      if (id_categoria !== null && id_categoria !== '') {
        filtered = filtered.filter((r) => Number(r.id_categoria) === Number(id_categoria));
      }
      if (es_oficial !== null && es_oficial !== '') {
        const targetBool = es_oficial === true || es_oficial === 'true';
        filtered = filtered.filter((r) => Boolean(r.es_oficial) === targetBool);
      }
      if (search && String(search).trim() !== '') {
        const q = String(search).trim().toLowerCase();
        filtered = filtered.filter(
          (r) =>
            r.nombre_atleta.toLowerCase().includes(q) ||
            r.nombre_categoria.toLowerCase().includes(q) ||
            r.pais.toLowerCase().includes(q)
        );
      }
      return {
        records: filtered.slice(0, limit),
        total: filtered.length,
        page: 1,
        limit,
        totalPages: 1,
      };
    }
  },

  async getTop3() {
    try {
      const res = await fetch(`${API_URL}/records/top`);
      if (!res.ok) throw new Error('Fallback top3');
      const data = await res.json();
      return Array.isArray(data) && data.length > 0
        ? data
        : FALLBACK_RECORDS.filter((r) => r.es_oficial).slice(0, 3);
    } catch {
      return FALLBACK_RECORDS.filter((r) => r.es_oficial).slice(0, 3);
    }
  },

  async getStats() {
    try {
      const res = await fetch(`${API_URL}/records/stats`);
      if (!res.ok) throw new Error('Fallback stats');
      const data = await res.json();
      return {
        total_records_oficiales: Number(data.total_records_oficiales ?? 1420),
        total_atletas: Number(data.total_atletas ?? 850),
      };
    } catch {
      return {
        total_records_oficiales: 1420,
        total_atletas: 850,
      };
    }
  },

  async createRecord(payload) {
    const res = await fetch(`${API_URL}/records`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  async updateRecord(id, payload) {
    const res = await fetch(`${API_URL}/records/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  async updateRecordStatus(id, es_oficial) {
    const res = await fetch(`${API_URL}/records/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ es_oficial: Boolean(es_oficial) }),
    });
    return handleResponse(res);
  },

  async deleteRecord(id) {
    const res = await fetch(`${API_URL}/records/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },
};
