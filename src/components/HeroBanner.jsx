export default function HeroBanner({
  isAdmin = false,
  isAuthenticated = false,
  onUploadClick,
  onOpenNewCategory,
  onFilterPending,
}) {
  return (
    <section className="w-full bg-primary-container text-surface-container-highest px-margin md:px-margin-desktop py-space-xl">
      <div className="max-w-[1440px] mx-auto flex flex-col items-start gap-space-md">
        <h1 className="font-headline-lg text-headline-lg font-bold text-surface-container-lowest tracking-tight max-w-4xl">
          {isAdmin
            ? 'Panel de Moderación y Control Oficial'
            : 'Registro Oficial de Marcas de Fuerza'}
        </h1>
        <p className="font-body-lg text-body-lg text-surface-variant max-w-3xl">
          {isAdmin
            ? 'Valida y aprueba récords de atletas para el Salón de la Fama, gestiona las categorías de ejercicio y modera cualquier envío de la plataforma.'
            : 'Plataforma verificada de récords de levantamiento de potencia y calistenia pesada para atletas certificados.'}
        </p>
        <div className="pt-space-sm flex flex-wrap items-center gap-space-md">
          <button
            type="button"
            onClick={onUploadClick}
            className="bg-secondary-fixed text-primary-container font-headline-sm text-label-lg font-bold px-space-xl py-space-sm rounded-DEFAULT hover:bg-tertiary-fixed transition-colors"
          >
            {isAuthenticated ? 'Subir Récord' : 'Subir Récord'}
          </button>

          {isAdmin && (
            <>
              <button
                type="button"
                onClick={onOpenNewCategory}
                className="bg-tertiary-fixed text-primary-container font-headline-sm text-label-lg font-bold px-space-lg py-space-sm rounded-DEFAULT hover:bg-secondary-fixed transition-colors"
              >
                + Nueva Categoría
              </button>
              <button
                type="button"
                onClick={onFilterPending}
                className="bg-tertiary-container text-tertiary-fixed font-headline-sm text-label-lg font-bold px-space-lg py-space-sm rounded-DEFAULT hover:bg-secondary hover:text-primary-container transition-colors"
              >
                Revisar Pendientes
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
