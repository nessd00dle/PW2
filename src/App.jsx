import React, { useState, useEffect } from 'react';
import AuthPage from './pantallas/AuthPage'; 
import Perfil from './pantallas/Perfil'; 
import Configuracion from './pantallas/Configuracion';
import Estadistica from './pantallas/Estadistica'; 
import PublicarCarta from './pantallas/PublicarCarta';
import Coleccion from './pantallas/Coleccion';
import DetalleCarta from './pantallas/DetalleCarta';
import EditarPerfil from './pantallas/EditarPerfil';
import Feed from './pantallas/Feed'; 
import { AuthProvider, useAuth } from '../context/AuthContext';

// Componente interno que usa el contexto
const AppContent = () => {
  const [pantallaActual, setPantallaActual] = useState('auth');
  const { isAuthenticated } = useAuth(); // Importante: usar el hook aquí

  // Redirigir automáticamente si está autenticado
  useEffect(() => {
    if (isAuthenticated && pantallaActual === 'auth') {
      setPantallaActual('perfil');
    }
  }, [isAuthenticated, pantallaActual]);

  const renderPantalla = () => {
    switch (pantallaActual) {
      case 'auth':
        return <AuthPage setPantalla={setPantallaActual} />;
      case 'perfil':
        return <Perfil setPantalla={setPantallaActual} />;
      case 'editarPerfil': 
        return <EditarPerfil setPantalla={setPantallaActual} />;
      case 'coleccion':
        return <Coleccion setPantalla={setPantallaActual} />;
      case 'configuracion':
        return <Configuracion setPantalla={setPantallaActual} />;
      case 'estadistica':
        return <Estadistica setPantalla={setPantallaActual} />;
      case 'publicar':
        return <PublicarCarta setPantalla={setPantallaActual} />;
      case 'detalle':
        return <DetalleCarta setPantalla={setPantallaActual} />;
      case 'ventas':
        return <Feed setPantalla={setPantallaActual} />;
      default:
        return <AuthPage setPantalla={setPantallaActual} />;
    }
  };

  return (
    <div className="App">
      {renderPantalla()}
    </div>
  );
};


function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;