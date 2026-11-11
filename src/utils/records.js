const COUNTRY_CODES = {
  'méxico': 'MX',
  'mexico': 'MX',
  'mx': 'MX',
  'españa': 'ES',
  'espana': 'ES',
  'es': 'ES',
  'argentina': 'AR',
  'ar': 'AR',
  'colombia': 'CO',
  'co': 'CO',
  'chile': 'CL',
  'cl': 'CL',
  'estados unidos': 'US',
  'usa': 'US',
  'us': 'US',
  'perú': 'PE',
  'peru': 'PE',
  'pe': 'PE',
  'brasil': 'BR',
  'br': 'BR',
};

const COUNTRY_LABELS = {
  MX: 'MX (México)',
  ES: 'ES (España)',
  AR: 'AR (Argentina)',
  CO: 'CO (Colombia)',
  CL: 'CL (Chile)',
  US: 'US (Estados Unidos)',
  PE: 'PE (Perú)',
  BR: 'BR (Brasil)',
  OT: 'OT (Internacional)',
};

const CATEGORY_CODES = {
  'sentadilla libre': 'SQ',
  'sentadilla': 'SQ',
  'press de banca': 'BP',
  'peso muerto': 'DL',
  'dominadas en barra': 'PU',
  'dominadas': 'PU',
  'fondos en barras': 'DP',
  'fondos': 'DP',
  'press militar': 'OHP',
};

/**
 * Filtra una lista de récords por ID de categoría.
 */
export function filterRecordsByCategory(records = [], categoryId = null) {
  if (!Array.isArray(records)) return [];
  if (categoryId === null || categoryId === undefined || categoryId === '') {
    return [...records];
  }
  const targetId = Number(categoryId);
  return records.filter((rec) => Number(rec.id_categoria) === targetId);
}

/**
 * Ordena récords de mayor a menor peso levantado.
 */
export function sortRecordsByWeightDesc(records = []) {
  if (!Array.isArray(records)) return [];
  return [...records].sort((a, b) => {
    const weightDiff = Number(b.peso_levantado || 0) - Number(a.peso_levantado || 0);
    if (weightDiff !== 0) return weightDiff;
    return Number(b.id_record || 0) - Number(a.id_record || 0);
  });
}

/**
 * Formatea el peso en kg (sin decimales innecesarios si es entero).
 */
export function formatWeightKg(weight) {
  const num = Number(weight);
  if (Number.isNaN(num)) return '0 kg';
  const formatted = Number.isInteger(num) ? String(num) : num.toFixed(1).replace(/\.0$/, '');
  return `${formatted} kg`;
}

/**
 * Formatea una fecha ISO (YYYY-MM-DD) al estilo "14 Oct 2024".
 */
export function formatShortDate(dateInput) {
  if (!dateInput) return 'N/A';
  const raw = String(dateInput).split('T')[0];
  const parts = raw.split('-');
  if (parts.length !== 3) return String(dateInput);

  const months = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
  ];
  const year = parts[0];
  const monthIdx = parseInt(parts[1], 10) - 1;
  const day = parts[2].padStart(2, '0');
  const monthName = months[monthIdx] || parts[1];
  return `${day} ${monthName} ${year}`;
}

/**
 * Obtiene el código corto de país (ej. MX, ES, AR).
 */
export function getCountryCode(pais = '') {
  if (!pais) return 'INT';
  const clean = String(pais).trim();
  const mapped = COUNTRY_CODES[clean.toLowerCase()];
  if (mapped) return mapped;
  return clean.slice(0, 2).toUpperCase();
}

/**
 * Obtiene etiqueta de país para el podio (ej. "MX (México)").
 */
export function getCountryDisplay(pais = '') {
  const code = getCountryCode(pais);
  if (COUNTRY_LABELS[code]) return COUNTRY_LABELS[code];
  return `${code} (${pais})`;
}

/**
 * Obtiene las siglas de 2 letras de una categoría (SQ, BP, DL, PU, DP).
 */
export function getCategoryAbbreviation(nombre = '') {
  if (!nombre) return 'EX';
  const clean = String(nombre).trim().toLowerCase();
  if (CATEGORY_CODES[clean]) return CATEGORY_CODES[clean];

  const words = clean.split(/\s+/).filter((w) => !['de', 'en', 'con', 'la', 'el'].includes(w));
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
}

/**
 * Calcula un coeficiente estimado de fuerza relativa (estilo Wilks/DOTS simplificado).
 */
export function calculateStrengthCoefficient(pesoLevantado, pesoCorporal = 80) {
  const lifted = Number(pesoLevantado) || 0;
  const bw = Number(pesoCorporal) > 30 ? Number(pesoCorporal) : 80;
  if (lifted <= 0) return '0.0';
  const coeff = (lifted / Math.pow(bw, 0.67)) * 12.2;
  return coeff.toFixed(1);
}

/**
 * Genera el identificador de juez reglamentario a partir del id_record.
 */
export function getRefereeCode(idRecord = 1) {
  const num = (Number(idRecord) || 1) * 103;
  return `REF-${String(100 + (num % 899)).padStart(3, '0')}`;
}

