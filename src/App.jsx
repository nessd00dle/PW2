import React, { useState } from 'react';
// IMPORTANTE: Los nombres deben coincidir exactos con tus archivos en la carpeta
import AuthPage from './pantallas/AuthPage'; 
import Perfil from './pantallas/Perfil'; 
import Configuracion from './pantallas/Configuracion';
import Estadistica from './pantallas/Estadistica'; 
import PublicarCarta from './pantallas/PublicarCarta';
import Coleccion from './pantallas/Coleccion';
import DetalleCarta from './pantallas/DetalleCarta';
import Feed from './pantallas/Feed'; // <--- Nueva importación del componente de tu amiga

function App() {
  const [pantallaActual, setPantallaActual] = useState('perfil');

  const renderPantalla = () => {
    switch (pantallaActual) {
      case 'perfil':
        return <Perfil setPantalla={setPantallaActual} />;
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
      case 'ventas': // <--- Caso para ver la página de ventas/feed
        return <Feed setPantalla={setPantallaActual} />;
      case 'auth':
        return <AuthPage setPantalla={setPantallaActual} />;
      default:
        return <Perfil setPantalla={setPantallaActual} />;
    }
  };

  return (
    <div className="App">
      {renderPantalla()}
    </div>
  );
}

export default App;