import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, initialTab = 'login', onClose }) {
  const { login, register, loading } = useAuth();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [error, setError] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regData, setRegData] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    correo: '',
    password: '',
    edad: '',
    peso_corporal: '',
    pais: '',
  });

  useEffect(() => {
    setActiveTab(initialTab);
    setError('');
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(loginEmail, loginPassword);
      onClose();
    } catch (err) {
      setError(err.message || 'Credenciales inválidas.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register({
        nombre: regData.nombre,
        apellido_paterno: regData.apellido_paterno,
        apellido_materno: regData.apellido_materno || null,
        correo: regData.correo,
        password: regData.password,
        edad: Number(regData.edad),
        peso_corporal: Number(regData.peso_corporal),
        pais: regData.pais || 'MX',
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Error al registrar atleta.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-primary-container/80 flex flex-col justify-center items-center overflow-y-auto p-gutter-desktop"
      onClick={onClose}
    >
      <div
        className="w-full bg-primary-container text-surface-container rounded-lg p-space-xl max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar ventana"
          className="absolute top-space-md right-space-md text-on-primary-container hover:text-surface-container-lowest font-label-md uppercase"
        >
          [×]
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-lg mb-space-xl">
          <div className="space-y-space-xs">
            <h1 className="font-headline-lg text-headline-lg tracking-tight text-surface-container-highest">
              Acceso Atletas Fitnessy
            </h1>
          </div>
          <div className="flex gap-space-lg">
            <button
              type="button"
              id="tab-login"
              onClick={() => {
                setActiveTab('login');
                setError('');
              }}
              className={
                activeTab === 'login'
                  ? 'font-label-lg text-label-lg uppercase pb-space-xs text-secondary-container'
                  : 'font-label-lg text-label-lg uppercase pb-space-xs text-on-primary-container hover:text-surface-container-highest transition-colors'
              }
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              id="tab-register"
              onClick={() => {
                setActiveTab('register');
                setError('');
              }}
              className={
                activeTab === 'register'
                  ? 'font-label-lg text-label-lg uppercase pb-space-xs text-secondary-container'
                  : 'font-label-lg text-label-lg uppercase pb-space-xs text-on-primary-container hover:text-surface-container-highest transition-colors'
              }
            >
              Crear Cuenta
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-space-md p-space-sm bg-error text-on-error font-label-md text-label-md rounded-DEFAULT">
            {error}
          </div>
        )}

        {activeTab === 'login' && (
          <div className="grid grid-cols-1 gap-gutter-desktop items-start" id="pane-login">
            <div className="flex flex-col gap-space-lg w-full">
              <div className="space-y-space-xs">
                <h2 className="font-headline-md text-headline-md text-surface-container-highest">
                  Autenticación de Atleta
                </h2>
              </div>
              <form className="flex flex-col gap-space-md" onSubmit={handleLoginSubmit}>
                <div className="flex flex-col gap-space-xs">
                  <input
                    className="w-full bg-tertiary-container text-surface-container-highest font-body-md px-space-md py-space-sm rounded-DEFAULT focus:outline-none focus:bg-tertiary transition-colors"
                    id="login-email"
                    placeholder="Correo electrónico"
                    required
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-space-xs">
                  <input
                    className="w-full bg-tertiary-container text-surface-container-highest font-body-md px-space-md py-space-sm rounded-DEFAULT focus:outline-none focus:bg-tertiary transition-colors"
                    id="login-password"
                    placeholder="Contraseña"
                    required
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between pt-space-xs">
                  <label className="flex items-center gap-space-xs cursor-pointer select-none">
                    <input
                      defaultChecked
                      className="w-4 h-4 rounded-DEFAULT bg-tertiary-container text-secondary accent-secondary"
                      type="checkbox"
                    />
                    <span className="font-label-sm text-label-sm text-on-primary-container uppercase">
                      Mantener sesión activa
                    </span>
                  </label>
                  <button
                    className="font-label-sm text-label-sm text-on-tertiary-container hover:underline uppercase"
                    type="button"
                  >
                    Recuperar clave
                  </button>
                </div>
                <button
                  disabled={loading}
                  className="mt-space-sm w-full py-space-md px-space-lg bg-secondary text-primary font-headline-sm text-headline-sm uppercase tracking-wider rounded-DEFAULT hover:bg-secondary-container active:bg-secondary-fixed transition-colors flex items-center justify-center gap-space-xs disabled:opacity-60"
                  type="submit"
                >
                  <span>{loading ? 'Procesando...' : 'Entrar al Sistema'}</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'register' && (
          <div className="flex-col gap-space-lg flex" id="pane-register">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-space-sm">
              <div>
                <h2 className="font-headline-md text-headline-md text-surface-container-highest">
                  Registro de Nuevo Atleta
                </h2>
              </div>
            </div>
            <form className="flex flex-col gap-space-lg" onSubmit={handleRegisterSubmit}>
              <div className="flex flex-col gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <input
                    className="w-full bg-tertiary-container text-surface-container-highest font-body-md px-space-md py-space-sm rounded-DEFAULT focus:outline-none focus:bg-tertiary transition-colors"
                    id="reg-name"
                    placeholder="Nombre"
                    required
                    type="text"
                    value={regData.nombre}
                    onChange={(e) => setRegData({ ...regData, nombre: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-space-xs">
                  <input
                    className="w-full bg-tertiary-container text-surface-container-highest font-body-md px-space-md py-space-sm rounded-DEFAULT focus:outline-none focus:bg-tertiary transition-colors"
                    id="reg-pat"
                    placeholder="Apellido Paterno"
                    required
                    type="text"
                    value={regData.apellido_paterno}
                    onChange={(e) =>
                      setRegData({ ...regData, apellido_paterno: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-space-xs">
                  <input
                    className="w-full bg-tertiary-container text-surface-container-highest font-body-md px-space-md py-space-sm rounded-DEFAULT focus:outline-none focus:bg-tertiary transition-colors"
                    id="reg-mat"
                    placeholder="Apellido Materno"
                    type="text"
                    value={regData.apellido_materno}
                    onChange={(e) =>
                      setRegData({ ...regData, apellido_materno: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-space-xs">
                  <input
                    className="w-full bg-tertiary-container text-surface-container-highest font-data-metric px-space-md py-space-sm rounded-DEFAULT focus:outline-none focus:bg-tertiary transition-colors"
                    id="reg-age"
                    max="99"
                    min="14"
                    placeholder="Edad (años cumplidos)"
                    required
                    type="number"
                    value={regData.edad}
                    onChange={(e) => setRegData({ ...regData, edad: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-space-xs">
                  <input
                    className="w-full bg-tertiary-container text-surface-container-highest font-data-metric px-space-md py-space-sm rounded-DEFAULT focus:outline-none focus:bg-tertiary transition-colors"
                    id="reg-weight"
                    placeholder="Peso corporal oficial (kg)"
                    required
                    step="0.1"
                    type="number"
                    value={regData.peso_corporal}
                    onChange={(e) =>
                      setRegData({ ...regData, peso_corporal: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-space-xs">
                  <select
                    className="w-full bg-tertiary-container text-surface-container-highest font-body-md px-space-md py-space-sm rounded-DEFAULT focus:outline-none focus:bg-tertiary transition-colors"
                    id="reg-country"
                    required
                    value={regData.pais}
                    onChange={(e) => setRegData({ ...regData, pais: e.target.value })}
                  >
                    <option disabled value="">
                      Selecciona País / Federación
                    </option>
                    <option value="ES">España (AEP / FEPC)</option>
                    <option value="MX">México (FMP)</option>
                    <option value="AR">Argentina (FALPO)</option>
                    <option value="CO">Colombia (FCK)</option>
                    <option value="CL">Chile (FECHIPO)</option>
                    <option value="OT">Otra Federación Internacional</option>
                  </select>
                </div>
                <div className="flex flex-col gap-space-xs">
                  <input
                    className="w-full bg-tertiary-container text-surface-container-highest font-body-md px-space-md py-space-sm rounded-DEFAULT focus:outline-none focus:bg-tertiary transition-colors"
                    id="reg-email"
                    placeholder="Correo electrónico"
                    required
                    type="email"
                    value={regData.correo}
                    onChange={(e) => setRegData({ ...regData, correo: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-space-xs">
                  <input
                    className="w-full bg-tertiary-container text-surface-container-highest font-body-md px-space-md py-space-sm rounded-DEFAULT focus:outline-none focus:bg-tertiary transition-colors"
                    id="reg-password"
                    placeholder="Contraseña (mínimo 8 caracteres)"
                    required
                    type="password"
                    value={regData.password}
                    onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center pt-space-xs">
                <button
                  disabled={loading}
                  className="w-full sm:w-auto min-w-[260px] py-space-md px-space-xl bg-secondary text-primary font-headline-sm text-headline-sm uppercase tracking-wider rounded-DEFAULT hover:bg-secondary-container active:bg-secondary-fixed transition-colors flex items-center justify-center gap-space-xs disabled:opacity-60"
                  type="submit"
                >
                  <span>{loading ? 'Registrando...' : 'Crear Cuenta'}</span>
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

