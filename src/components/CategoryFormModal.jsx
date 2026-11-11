import { useState, useEffect } from 'react';

export default function CategoryFormModal({
  isOpen,
  onClose,
  initialCategory = null,
  onSave,
}) {
  const [nombre, setNombre] = useState('');
  const [grupoMuscular, setGrupoMuscular] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      setNombre(initialCategory.nombre || '');
      setGrupoMuscular(initialCategory.grupo_muscular || '');
      setDescripcion(initialCategory.descripcion || '');
    } else {
      setNombre('');
      setGrupoMuscular('');
      setDescripcion('');
    }
    setError('');
  }, [initialCategory, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await onSave({
        nombre,
        grupo_muscular: grupoMuscular,
        descripcion,
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Error al guardar la categoría.');
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
            {initialCategory ? 'Editar Categoría de Ejercicio' : 'Nueva Categoría de Ejercicio'}
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
          <input
            type="text"
            required
            placeholder="Nombre de la disciplina (ej. Fondos en Barras)"
            className="w-full bg-tertiary-container text-surface-container-highest font-body-md px-space-md py-space-sm rounded-DEFAULT focus:outline-none focus:bg-tertiary transition-colors"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="Grupo muscular (ej. Pectoral · Tríceps)"
            className="w-full bg-tertiary-container text-surface-container-highest font-body-md px-space-md py-space-sm rounded-DEFAULT focus:outline-none focus:bg-tertiary transition-colors"
            value={grupoMuscular}
            onChange={(e) => setGrupoMuscular(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="Descripción técnica"
            className="w-full bg-tertiary-container text-surface-container-highest font-body-md px-space-md py-space-sm rounded-DEFAULT focus:outline-none focus:bg-tertiary transition-colors"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <button
            type="submit"
            disabled={saving}
            className="mt-space-sm w-full py-space-md px-space-lg bg-secondary text-primary font-headline-sm text-headline-sm uppercase tracking-wider rounded-DEFAULT hover:bg-secondary-container active:bg-secondary-fixed transition-colors"
          >
            {saving
              ? 'Guardando...'
              : initialCategory
                ? 'Actualizar Categoría'
                : 'Agregar Categoría'}
          </button>
        </form>
      </div>
    </div>
  );
}
