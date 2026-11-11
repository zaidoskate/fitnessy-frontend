import { getCategoryAbbreviation } from '../utils/records';

export default function CategoriesSidebar({
  categories = [],
  selectedCategoryId = null,
  onSelectCategory,
  isAdmin = false,
  onOpenNewCategory,
  onEditCategory,
  onDeleteCategory,
}) {
  return (
    <aside id="categories" className="lg:col-span-5 flex flex-col gap-space-md">
      <div className="flex items-center justify-between pb-space-xs">
        <span className="font-label-md text-label-md uppercase tracking-wider text-primary-container font-bold">
          {isAdmin ? 'Gestión de Categorías' : 'Filtro de Disciplinas'}
        </span>
        <div className="flex items-center gap-space-sm">
          <span className="font-label-sm text-label-sm text-on-surface-variant font-mono uppercase">
            {categories.length} MODALIDADES
          </span>
          {isAdmin && (
            <button
              type="button"
              onClick={onOpenNewCategory}
              className="bg-primary-container text-tertiary-fixed font-label-sm text-label-sm uppercase px-space-sm py-0.5 rounded-DEFAULT hover:bg-tertiary-container transition-colors font-bold"
            >
              + Categoría
            </button>
          )}
        </div>
      </div>

      {categories.map((cat) => {
        const isSelected = Number(selectedCategoryId) === Number(cat.id_categoria);
        return (
          <div
            key={cat.id_categoria}
            onClick={() =>
              onSelectCategory(isSelected ? null : cat.id_categoria)
            }
            className={`p-space-md rounded-DEFAULT flex items-center justify-between gap-space-md cursor-pointer transition-colors ${
              isSelected
                ? 'bg-secondary-container'
                : 'bg-surface-container hover:bg-surface-container-high'
            }`}
          >
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-12 h-12 shrink-0 bg-primary-container text-secondary-fixed flex items-center justify-center font-headline-sm font-bold rounded-DEFAULT">
                {getCategoryAbbreviation(cat.nombre)}
              </div>
              <div className="min-w-0 flex flex-col">
                <span className="font-headline-sm text-body-lg font-bold text-primary-container truncate">
                  {cat.nombre}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  {cat.grupo_muscular}
                </span>
              </div>
            </div>

            {isAdmin ? (
              <div className="flex items-center gap-space-xs shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditCategory?.(cat);
                  }}
                  className="bg-primary-container hover:bg-tertiary-container text-tertiary-fixed font-label-sm text-label-sm font-bold uppercase px-space-sm py-space-xs rounded-DEFAULT transition-colors"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCategory?.(cat.id_categoria);
                  }}
                  className="bg-primary-container hover:bg-error text-surface-variant hover:text-on-error font-label-sm text-label-sm font-bold uppercase px-space-sm py-space-xs rounded-DEFAULT transition-colors"
                >
                  Eliminar
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-space-xs shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCategory(cat.id_categoria);
                  }}
                  className="bg-secondary-fixed hover:bg-tertiary-fixed text-primary-container font-label-sm text-label-sm font-bold uppercase px-space-sm py-space-xs rounded-DEFAULT transition-colors"
                >
                  Hombres
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCategory(cat.id_categoria);
                  }}
                  className="bg-secondary-fixed hover:bg-tertiary-fixed text-primary-container font-label-sm text-label-sm font-bold uppercase px-space-sm py-space-xs rounded-DEFAULT transition-colors"
                >
                  Mujeres
                </button>
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}
