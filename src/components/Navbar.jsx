import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenAuth, onNavigate }) {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-highest border-b border-primary-container">
      <div className="h-16 max-w-[1440px] mx-auto px-margin md:px-margin-desktop flex items-center justify-between">
        <div className="flex items-center gap-space-lg">
          <a
            href="#records"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.('records');
            }}
            className="font-headline-sm text-headline-sm font-bold tracking-tight text-primary-container uppercase select-none"
          >
            FITNESSY
          </a>
        </div>

        <div className="flex items-center gap-space-md md:gap-space-xl">
          <nav className="hidden sm:flex items-center gap-space-md">
            <a
              href="#records"
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.('records');
              }}
              aria-current="page"
              className="uppercase tracking-wider px-space-md py-space-xs transition-colors bg-primary-container text-on-primary font-bold font-label-md text-label-md"
            >
              Récords
            </a>
            <a
              href="#categories"
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.('categories');
              }}
              className="font-label-md text-label-md uppercase tracking-wider px-space-md py-space-xs text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Categorías
            </a>
            <a
              href="#top-3"
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.('top-3');
              }}
              className="font-label-md text-label-md uppercase tracking-wider px-space-md py-space-xs text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Top 3
            </a>
          </nav>

          <div className="flex items-center gap-space-md">
            {isAuthenticated ? (
              <div className="flex items-center gap-space-sm">
                <span className="hidden md:inline-block font-label-md text-label-md uppercase tracking-wider text-primary-container font-bold">
                  {user?.nombre} {isAdmin ? '[ADMIN]' : '[ATLETA]'}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="font-label-md text-label-md uppercase tracking-wider px-space-md py-space-xs bg-primary-container text-surface-container-lowest hover:bg-tertiary-container transition-colors rounded-DEFAULT"
                >
                  Salir
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onOpenAuth('login')}
                className="font-label-md text-label-md uppercase tracking-wider px-space-md py-space-xs bg-secondary hover:bg-secondary-fixed-dim text-on-secondary hover:text-on-secondary-fixed transition-colors rounded-DEFAULT"
              >
                Iniciar Sesión
              </button>
            )}
            <button
              type="button"
              onClick={() => !isAuthenticated && onOpenAuth('login')}
              title={isAuthenticated ? `${user?.nombre} (${user?.rol})` : 'Acceso Atletas'}
              className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

