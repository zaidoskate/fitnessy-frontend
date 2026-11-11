import { describe, it, expect } from 'vitest';
import {
  filterRecordsByCategory,
  sortRecordsByWeightDesc,
  formatWeightKg,
  formatShortDate,
  getCountryCode,
  getCategoryAbbreviation,
  calculateStrengthCoefficient,
} from './records';

const mockRecords = [
  { id_record: 1, id_categoria: 1, nombre_categoria: 'Sentadilla Libre', peso_levantado: 195, repeticiones: 1, fecha: '2024-10-14', pais: 'México' },
  { id_record: 2, id_categoria: 2, nombre_categoria: 'Press de Banca', peso_levantado: 150, repeticiones: 1, fecha: '2024-11-02', pais: 'España' },
  { id_record: 3, id_categoria: 3, nombre_categoria: 'Peso Muerto', peso_levantado: 240, repeticiones: 1, fecha: '2024-11-18', pais: 'Argentina' },
  { id_record: 4, id_categoria: 1, nombre_categoria: 'Sentadilla Libre', peso_levantado: 210.5, repeticiones: 1, fecha: '2024-11-20', pais: 'MX' },
];

describe('Utilidades de Récords Fitnessy (records.js)', () => {
  it('filtra correctamente los récords por id_categoria', () => {
    const squatRecords = filterRecordsByCategory(mockRecords, 1);
    expect(squatRecords).toHaveLength(2);
    expect(squatRecords.every((r) => r.id_categoria === 1)).toBe(true);

    const allRecords = filterRecordsByCategory(mockRecords, null);
    expect(allRecords).toHaveLength(4);
  });

  it('ordena los récords de mayor a menor peso levantado', () => {
    const sorted = sortRecordsByWeightDesc(mockRecords);
    expect(sorted[0].peso_levantado).toBe(240);
    expect(sorted[1].peso_levantado).toBe(210.5);
    expect(sorted[2].peso_levantado).toBe(195);
    expect(sorted[3].peso_levantado).toBe(150);
  });

  it('formatea el peso levantado en kg y las fechas cortas correctamente', () => {
    expect(formatWeightKg(195)).toBe('195 kg');
    expect(formatWeightKg(210.5)).toBe('210.5 kg');
    expect(formatShortDate('2024-10-14')).toBe('14 Oct 2024');
  });

  it('obtiene abreviaturas de categorías, códigos de país y coeficiente Wilks', () => {
    expect(getCategoryAbbreviation('Sentadilla Libre')).toBe('SQ');
    expect(getCategoryAbbreviation('Press de Banca')).toBe('BP');
    expect(getCategoryAbbreviation('Peso Muerto')).toBe('DL');
    expect(getCategoryAbbreviation('Dominadas en Barra')).toBe('PU');
    expect(getCountryCode('México')).toBe('MX');
    expect(getCountryCode('España')).toBe('ES');
    expect(Number(calculateStrengthCoefficient(195, 82))).toBeGreaterThan(100);
  });
});

