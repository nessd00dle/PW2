import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { NavigationProvider, useNavigation } from '../context/NavigationContext';

// Importar pantallas
import Home from './pantallas/home'; 
import AuthPage from './pantallas/AuthPage';
import Perfil from './pantallas/Perfil';
import PerfilPublico from './pantallas/PerfilPublico';
import EditarPerfil from './pantallas/EditarPerfil';
import Configuracion from './pantallas/Configuracion';
import Estadistica from './pantallas/Estadistica';
import PublicarCarta from './pantallas/PublicarCarta';
import Coleccion from './pantallas/Coleccion';
import DetalleCarta from './pantallas/DetalleCarta';
import Feed from './pantallas/Feed';

// Componente que maneja la lógica de navegación
const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const {
    pantallaActual,
    setPantallaActual,
    usuarioPublico,
    cartaSeleccionada,
    publicacionSeleccionada
  } = useNavigation();

  // Proteger rutas que requieren autenticación
  useEffect(() => {
    const rutasProtegidas = ['perfil', 'coleccion', 'publicar', 'configuracion', 'estadistica', 'editarPerfil'];

    if (!loading && !isAuthenticated && rutasProtegidas.includes(pantallaActual)) {
      setPantallaActual('auth');
    }
  }, [isAuthenticated, loading, pantallaActual, setPantallaActual]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-white">Cargando...</p>
        </div>
      </div>
    );
  }

  const renderPantalla = () => {
    switch (pantallaActual) {
      case 'home':
        return <Home setPantalla={setPantallaActual} />;
      case 'auth':
        return <AuthPage />;

      case 'perfil':
        return <Perfil />;

      case 'perfilPublico':
        return <PerfilPublico />;

      case 'editarPerfil':
        return <EditarPerfil />;

      case 'coleccion':
        return <Coleccion />;

      case 'configuracion':
        return <Configuracion />;

      case 'estadistica':
        return <Estadistica setPantalla={setPantallaActual} />;
        
      case 'publicar':
        return <PublicarCarta setPantalla={setPantallaActual} />;

      case 'detalle':
        return (
          <DetalleCarta
            carta={cartaSeleccionada}
            publicacion={publicacionSeleccionada}
            setPantalla={setPantallaActual}
          />
        );

      case 'ventas':
        return <Feed setPantalla={setPantallaActual} />

      default:
        return <AuthPage />;
    }
  };

  return <div className="App">{renderPantalla()}</div>;
};

// Componente principal
function App() {
  const selectedTheme = localStorage.getItem("theme");

  if (selectedTheme) {
    document
      .querySelector("body")
      .setAttribute("data-theme", selectedTheme);
  }

  return (
    <AuthProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </AuthProvider>
  );
}

export default App;