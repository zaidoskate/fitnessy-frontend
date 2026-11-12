import {
  formatWeightKg,
  formatShortDate,
  getCountryCode,
  getRefereeCode,
} from '../utils/records';

export default function RecordsSection({
  records = [],
  page = 1,
  totalPages = 1,
  selectedCategoryName = null,
  onClearCategory,
  onPageChange,
  searchQuery = '',
  onSearchChange,
  statusFilter = 'all',
  onStatusFilterChange,
  user,
  isAdmin,
  onEditRecord,
  onDeleteRecord,
  onToggleOfficial,
}) {
  const safeTotalPages = Math.max(1, Number(totalPages) || 1);
  const pagesArray = Array.from({ length: safeTotalPages }, (_, idx) => idx + 1);

  return (
    <div id="records" className="lg:col-span-7 flex flex-col gap-space-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-xs">
        <div className="flex flex-wrap items-center gap-space-sm">
          <span className="font-label-md text-label-md uppercase tracking-wider text-primary-container font-bold">
            {isAdmin ? 'Moderación de Envíos y Récords' : 'Marcas Recientes Validadas'}
          </span>
          {selectedCategoryName && (
            <button
              type="button"
              onClick={onClearCategory}
              className="font-label-sm text-label-sm uppercase bg-primary-container text-tertiary-fixed px-space-sm py-0.5 rounded-DEFAULT hover:bg-tertiary-container transition-colors"
            >
              [{selectedCategoryName} ×]
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-space-xs">
          {isAdmin && (
            <div className="flex items-center gap-space-xs">
              <button
                type="button"
                onClick={() => onStatusFilterChange('all')}
                className={
                  statusFilter === 'all'
                    ? 'font-label-sm text-label-sm uppercase px-space-sm py-space-xs bg-primary-container text-tertiary-fixed font-bold rounded-DEFAULT'
                    : 'font-label-sm text-label-sm uppercase px-space-sm py-space-xs bg-surface-container text-primary-container rounded-DEFAULT hover:bg-secondary-fixed'
                }
              >
                Todos
              </button>
              <button
                type="button"
                onClick={() => onStatusFilterChange('pending')}
                className={
                  statusFilter === 'pending'
                    ? 'font-label-sm text-label-sm uppercase px-space-sm py-space-xs bg-primary-container text-tertiary-fixed font-bold rounded-DEFAULT'
                    : 'font-label-sm text-label-sm uppercase px-space-sm py-space-xs bg-surface-container text-primary-container rounded-DEFAULT hover:bg-secondary-fixed'
                }
              >
                Pendientes
              </button>
              <button
                type="button"
                onClick={() => onStatusFilterChange('official')}
                className={
                  statusFilter === 'official'
                    ? 'font-label-sm text-label-sm uppercase px-space-sm py-space-xs bg-primary-container text-tertiary-fixed font-bold rounded-DEFAULT'
                    : 'font-label-sm text-label-sm uppercase px-space-sm py-space-xs bg-surface-container text-primary-container rounded-DEFAULT hover:bg-secondary-fixed'
                }
              >
                Oficiales
              </button>
            </div>
          )}

          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar atleta o país..."
            className="bg-surface-container text-primary-container placeholder:text-on-surface-variant font-label-md text-label-md px-space-sm py-space-xs rounded-DEFAULT focus:outline-none focus:ring-1 focus:ring-primary-container"
          />
        </div>
      </div>

      {records.length === 0 ? (
        <article className="bg-primary-container text-surface-variant p-space-lg rounded-DEFAULT flex flex-col gap-space-sm">
          <span className="font-headline-sm text-headline-sm text-surface-container-lowest">
            Sin registros para los filtros seleccionados
          </span>
          <span className="font-label-md text-label-md uppercase text-on-primary-container">
            Prueba limpiando el filtro o seleccionando otra categoría.
          </span>
        </article>
      ) : (
        records.map((rec) => {
          const isOwner =
            user &&
            (Number(user.id_atleta) === Number(rec.id_atleta) ||
              Number(user.id) === Number(rec.id_usuario));
          const canManage = isAdmin || isOwner;

          return (
            <article
              key={rec.id_record}
              className="bg-primary-container text-surface-variant p-space-lg rounded-DEFAULT flex flex-col gap-space-sm"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-space-xs">
                <div className="flex flex-wrap items-baseline gap-space-sm">
                  <span className="font-data-metric text-data-metric font-bold text-surface-container-lowest">
                    {formatWeightKg(rec.peso_levantado)}
                  </span>
                  <span className="font-label-md text-label-md uppercase text-secondary-fixed font-bold tracking-wider">
                    · {rec.repeticiones} {Number(rec.repeticiones) === 1 ? 'rep' : 'reps'}
                  </span>
                  <span className="font-headline-sm text-headline-sm text-surface-container-low ml-space-sm">
                    {rec.nombre_categoria}
                  </span>
                </div>
                <span
                  className={
                    rec.es_oficial
                      ? 'font-label-md text-label-md font-bold uppercase tracking-widest text-tertiary-fixed'
                      : 'font-label-md text-label-md font-bold uppercase tracking-widest text-secondary-fixed'
                  }
                >
                  {rec.es_oficial ? '[OFICIAL]' : '[PENDIENTE DE APROBACIÓN]'}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-x-space-lg gap-y-space-xs pt-space-xs text-on-primary-container font-label-md text-label-md uppercase tracking-wider">
                <div className="flex flex-wrap items-center gap-x-space-lg gap-y-space-xs">
                  <span>
                    Atleta:{' '}
                    <strong className="text-surface-container-lowest">
                      {rec.nombre_atleta}
                    </strong>
                  </span>
                  <span>
                    País:{' '}
                    <strong className="text-surface-container-lowest">
                      {getCountryCode(rec.pais)}
                    </strong>
                  </span>
                  <span>
                    Fecha:{' '}
                    <strong className="text-surface-container-lowest">
                      {formatShortDate(rec.fecha)}
                    </strong>
                  </span>
                  <span>
                    Juez:{' '}
                    <strong className="text-surface-container-lowest">
                      {getRefereeCode(rec.id_record)}
                    </strong>
                  </span>
                </div>

                {canManage && (
                  <div className="flex flex-wrap items-center gap-space-xs">
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => onToggleOfficial(rec)}
                        className={
                          rec.es_oficial
                            ? 'font-label-sm text-label-sm uppercase px-space-sm py-1 bg-tertiary-container text-secondary-fixed hover:bg-secondary hover:text-primary-container transition-colors rounded-DEFAULT font-bold'
                            : 'font-label-sm text-label-sm uppercase px-space-sm py-1 bg-tertiary-fixed text-primary-container hover:bg-secondary-fixed transition-colors rounded-DEFAULT font-bold'
                        }
                      >
                        {rec.es_oficial
                          ? 'Revocar Oficial'
                          : '✓ Aprobar al Salón de la Fama'}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onEditRecord(rec)}
                      className="font-label-sm text-label-sm uppercase px-space-sm py-1 bg-surface-tint text-surface-container-lowest hover:bg-secondary-fixed hover:text-primary-container transition-colors rounded-DEFAULT"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteRecord(rec.id_record)}
                      className="font-label-sm text-label-sm uppercase px-space-sm py-1 bg-tertiary-container text-surface-variant hover:bg-error hover:text-on-error transition-colors rounded-DEFAULT"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            </article>
          );
        })
      )}

      <div className="flex items-center justify-start gap-space-xs pt-space-sm">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="w-9 h-9 bg-primary-container text-surface-container-lowest font-label-md flex items-center justify-center rounded-DEFAULT hover:bg-surface-tint disabled:opacity-50"
        >
          &lt;
        </button>
        {pagesArray.map((pageNum) => {
          const isCurrent = pageNum === page;
          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={
                isCurrent
                  ? 'w-9 h-9 bg-secondary-fixed text-primary-container font-label-md font-bold flex items-center justify-center rounded-DEFAULT'
                  : 'w-9 h-9 bg-primary-container text-surface-container-lowest font-label-md flex items-center justify-center rounded-DEFAULT hover:bg-surface-tint'
              }
            >
              {pageNum}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => onPageChange(Math.min(safeTotalPages, page + 1))}
          disabled={page >= safeTotalPages}
          className="w-9 h-9 bg-primary-container text-surface-container-lowest font-label-md flex items-center justify-center rounded-DEFAULT hover:bg-surface-tint disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
