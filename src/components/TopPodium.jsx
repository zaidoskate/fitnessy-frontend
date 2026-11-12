import {
  formatWeightKg,
  getCountryDisplay,
  calculateStrengthCoefficient,
} from '../utils/records';

export default function TopPodium({ topRecords = [] }) {
  const rank1 = topRecords[0] || {
    nombre_atleta: 'Mateo Morales',
    nombre_categoria: 'Sentadilla Libre',
    peso_levantado: 195,
    repeticiones: 1,
    pais: 'MX',
    peso_corporal: 82.5,
  };
  const rank2 = topRecords[1] || {
    nombre_atleta: 'Sofia Valenzuela',
    nombre_categoria: 'Press de Banca',
    peso_levantado: 150,
    repeticiones: 1,
    pais: 'ES',
    peso_corporal: 64.0,
  };
  const rank3 = topRecords[2] || {
    nombre_atleta: 'Carlos Quintana',
    nombre_categoria: 'Peso Muerto',
    peso_levantado: 240,
    repeticiones: 1,
    pais: 'AR',
    peso_corporal: 90.0,
  };

  return (
    <section
      id="top-3"
      className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-desktop py-space-xl"
    >
      <div className="flex flex-col items-center gap-space-sm mb-space-xl text-center">
        <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-container font-bold">
          TABLA GLOBAL DE RENDIMIENTO
        </span>
        <h2 className="font-headline-lg text-headline-lg font-bold text-primary-container tracking-tight">
          Top 3 Absoluto por Coeficiente de Fuerza
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop items-end max-w-5xl mx-auto">
        <article className="bg-primary-container text-surface-variant p-space-lg rounded-DEFAULT flex flex-col gap-space-md order-2 md:order-1">
          <div className="flex items-center justify-between pb-space-xs">
            <span className="font-label-md text-label-md font-bold text-surface-container-highest uppercase">
              POSICIÓN #02
            </span>
            <span className="font-label-sm text-label-sm uppercase text-secondary-fixed">
              [RANKING A]
            </span>
          </div>
          <div>
            <span className="font-headline-sm text-headline-sm font-bold text-surface-container-lowest">
              {rank2.nombre_atleta}
            </span>
            <div className="font-label-md text-label-md text-secondary-fixed uppercase font-mono mt-0.5">
              {rank2.nombre_categoria} · {formatWeightKg(rank2.peso_levantado)}
            </div>
          </div>
          <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-surface-variant pt-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="font-bold text-secondary-fixed">✓</span>
              <span>Carga Total: {formatWeightKg(rank2.peso_levantado)}</span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="font-bold text-secondary-fixed">✓</span>
              <span>
                Repeticiones: {rank2.repeticiones}{' '}
                {Number(rank2.repeticiones) === 1 ? 'rep' : 'reps'}
              </span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="font-bold text-secondary-fixed">✓</span>
              <span>País: {getCountryDisplay(rank2.pais)}</span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="font-bold text-secondary-fixed">✓</span>
              <span>
                Coeficiente Wilks:{' '}
                {calculateStrengthCoefficient(
                  rank2.peso_levantado,
                  rank2.peso_corporal
                )}
              </span>
            </div>
          </div>
        </article>

        <article className="bg-tertiary-fixed text-primary-container p-space-lg rounded-DEFAULT flex flex-col gap-space-md order-1 md:order-2 md:-mt-8">
          <div className="flex items-center justify-between pb-space-xs">
            <span className="font-label-md text-label-md font-bold text-primary-container uppercase">
              LÍDER ABSOLUTO #01
            </span>
            <span className="font-label-sm text-label-sm uppercase text-on-tertiary-fixed font-bold">
              [RÉCORD MUNDIAL]
            </span>
          </div>
          <div>
            <span className="font-headline-md text-headline-md font-bold text-primary-container">
              {rank1.nombre_atleta}
            </span>
            <div className="font-label-md text-label-md text-on-tertiary-fixed uppercase font-mono font-bold mt-0.5">
              {rank1.nombre_categoria} · {formatWeightKg(rank1.peso_levantado)}
            </div>
          </div>
          <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-primary-container font-medium pt-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="font-bold text-on-tertiary-fixed">✓</span>
              <span>Carga Total: {formatWeightKg(rank1.peso_levantado)}</span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="font-bold text-on-tertiary-fixed">✓</span>
              <span>
                Repeticiones: {rank1.repeticiones}{' '}
                {Number(rank1.repeticiones) === 1 ? 'rep' : 'reps'}
              </span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="font-bold text-on-tertiary-fixed">✓</span>
              <span>País: {getCountryDisplay(rank1.pais)}</span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="font-bold text-on-tertiary-fixed">✓</span>
              <span>
                Coeficiente Wilks:{' '}
                {calculateStrengthCoefficient(
                  rank1.peso_levantado,
                  rank1.peso_corporal
                )}
              </span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="font-bold text-on-tertiary-fixed">✓</span>
              <span>Certificado por Panel Superior</span>
            </div>
          </div>
        </article>

        <article className="bg-primary-container text-surface-variant p-space-lg rounded-DEFAULT flex flex-col gap-space-md order-3 md:order-3">
          <div className="flex items-center justify-between pb-space-xs">
            <span className="font-label-md text-label-md font-bold text-surface-container-highest uppercase">
              POSICIÓN #03
            </span>
            <span className="font-label-sm text-label-sm uppercase text-secondary-fixed">
              [RANKING A]
            </span>
          </div>
          <div>
            <span className="font-headline-sm text-headline-sm font-bold text-surface-container-lowest">
              {rank3.nombre_atleta}
            </span>
            <div className="font-label-md text-label-md text-secondary-fixed uppercase font-mono mt-0.5">
              {rank3.nombre_categoria} · {formatWeightKg(rank3.peso_levantado)}
            </div>
          </div>
          <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-surface-variant pt-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="font-bold text-secondary-fixed">✓</span>
              <span>Carga Total: {formatWeightKg(rank3.peso_levantado)}</span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="font-bold text-secondary-fixed">✓</span>
              <span>
                Repeticiones: {rank3.repeticiones}{' '}
                {Number(rank3.repeticiones) === 1 ? 'rep' : 'reps'}
              </span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="font-bold text-secondary-fixed">✓</span>
              <span>País: {getCountryDisplay(rank3.pais)}</span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="font-bold text-secondary-fixed">✓</span>
              <span>
                Coeficiente Wilks:{' '}
                {calculateStrengthCoefficient(
                  rank3.peso_levantado,
                  rank3.peso_corporal
                )}
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

