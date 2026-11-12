export default function SplitBanner({ stats }) {
  const totalRecords = Number(stats?.total_records_oficiales ?? 1420).toLocaleString('en-US');
  const totalAthletes = Number(stats?.total_atletas ?? 850).toLocaleString('en-US');

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2">
      <div className="bg-primary-container text-surface-variant px-margin md:px-margin-desktop py-space-xl flex flex-col justify-center gap-space-md">
        <div className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed">
          PROCEDIMIENTO OFICIAL
        </div>
        <h2 className="font-headline-md text-headline-md font-bold text-surface-container-lowest">
          Verificación Estricta de Cada Levantamiento
        </h2>
        <p className="font-body-md text-body-md text-surface-variant">
          Todos los envíos son revisados minuciosamente cuadro por cuadro por jueces certificados bajo normativa reglamentaria.
        </p>
      </div>

      <div className="bg-secondary-fixed text-primary-container px-margin md:px-margin-desktop py-space-xl flex items-center justify-around">
        <div className="flex flex-col items-start">
          <span className="font-display text-display font-bold leading-none text-primary-container">
            {totalRecords}
          </span>
          <span className="font-label-md text-label-md uppercase tracking-wider text-on-secondary-fixed-variant mt-space-xs font-bold">
            Total de Récords Oficiales
          </span>
        </div>
        <div className="flex flex-col items-start">
          <span className="font-display text-display font-bold leading-none text-primary-container">
            {totalAthletes}
          </span>
          <span className="font-label-md text-label-md uppercase tracking-wider text-on-secondary-fixed-variant mt-space-xs font-bold">
            Atletas Validados
          </span>
        </div>
      </div>
    </section>
  );
}

