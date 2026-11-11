import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function RecordFormModal({
  isOpen,
  onClose,
  categories = [],
  initialRecord = null,
  onSave,
}) {
  const { isAdmin } = useAuth();
  const [formData, setFormData] = useState({
    id_categoria: '',
    peso_levantado: '',
    repeticiones: 1,
    fecha: new Date().toISOString().split('T')[0],
    es_oficial: false,
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialRecord) {
      setFormData({
        id_categoria: initialRecord.id_categoria || categories[0]?.id_categoria || '',
        peso_levantado: initialRecord.peso_levantado || '',
        repeticiones: initialRecord.repeticiones || 1,
        fecha: (initialRecord.fecha || new Date().toISOString()).split('T')[0],
        es_oficial: Boolean(initialRecord.es_oficial),
      });
    } else {
      setFormData({
        id_categoria: categories[0]?.id_categoria || '',
        peso_levantado: '',
        repeticiones: 1,
        fecha: new Date().toISOString().split('T')[0],
        es_oficial: isAdmin,
      });
    }
    setError('');
  }, [initialRecord, categories, isOpen, isAdmin]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const payload = {
        id_categoria: Number(formData.id_categoria),
        peso_levantado: Number(formData.peso_levantado),
        repeticiones: Number(formData.repeticiones),
        fecha: formData.fecha,
      };
      if (isAdmin) {
        payload.es_oficial = Boolean(formData.es_oficial);
      }
      await onSave(payload);
      onClose();
    } catch (err) {
      setError(err.message || 'Error al guardar el récord.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-primary-container/80 flex flex-col justify-center items-center p-gutter-desktop"
      onClick={onClose}
    >
      <div
        className="w-full bg-primary-container text-surface-container rounded-lg p-space-xl max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-space-lg">
          <h2 className="font-headline-md text-headline-md text-surface-container-highest">
            {initialRecord ? 'Editar Récord' : 'Subir Nuevo Récord'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-on-primary-container hover:text-surface-container-lowest font-label-md uppercase"
          >
            [×]
          </button>
        </div>

        {error && (
          <div className="mb-space-md p-space-sm bg-error text-on-error font-label-md text-label-md rounded-DEFAULT">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
          <select
            className="w-full bg-tertiary-container text-surface-container-highest font-body-md px-space-md py-space-sm rounded-DEFAULT focus:outline-none focus:bg-tertiary transition-colors"
            required
            value={formData.id_categoria}
            onChange={(e) => setFormData({ ...formData, id_categoria: e.target.value })}
          >
            <option disabled value="">
              Selecciona Disciplina
            </option>
            {categories.map((cat) => (
              <option key={cat.id_categoria} value={cat.id_categoria}>
                {cat.nombre} ({cat.grupo_muscular})
              </option>
            ))}
          </select>

          <input
            type="number"
            step="0.5"
            min="1"
            max="1500"
            required
            placeholder="Peso levantado (kg)"
            className="w-full bg-tertiary-container text-surface-container-highest font-data-metric px-space-md py-space-sm rounded-DEFAULT focus:outline-none focus:bg-tertiary transition-colors"
            value={formData.peso_levantado}
            onChange={(e) => setFormData({ ...formData, peso_levantado: e.target.value })}
          />

          <input
            type="number"
            min="1"
            max="500"
            required
            placeholder="Repeticiones válidas"
            className="w-full bg-tertiary-container text-surface-container-highest font-data-metric px-space-md py-space-sm rounded-DEFAULT focus:outline-none focus:bg-tertiary transition-colors"
            value={formData.repeticiones}
            onChange={(e) => setFormData({ ...formData, repeticiones: e.target.value })}
          />

          <input
            type="date"
            required
            className="w-full bg-tertiary-container text-surface-container-highest font-body-md px-space-md py-space-sm rounded-DEFAULT focus:outline-none focus:bg-tertiary transition-colors"
            value={formData.fecha}
            onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
          />

          {isAdmin && (
            <label className="flex items-center gap-space-xs cursor-pointer select-none pt-space-xs">
              <input
                type="checkbox"
                checked={formData.es_oficial}
                onChange={(e) =>
                  setFormData({ ...formData, es_oficial: e.target.checked })
                }
                className="w-4 h-4 rounded-DEFAULT bg-tertiary-container text-secondary accent-secondary"
              />
              <span className="font-label-sm text-label-sm text-tertiary-fixed uppercase">
                Validar como récord oficial (Salón de la Fama)
              </span>
            </label>
          )}

          <button
            type="submit"
            disabled={saving}
            className="mt-space-sm w-full py-space-md px-space-lg bg-secondary text-primary font-headline-sm text-headline-sm uppercase tracking-wider rounded-DEFAULT hover:bg-secondary-container active:bg-secondary-fixed transition-colors flex items-center justify-center gap-space-xs disabled:opacity-60"
          >
            <span>{saving ? 'Guardando...' : initialRecord ? 'Guardar Cambios' : 'Registrar Marca'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
