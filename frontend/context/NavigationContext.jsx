import React, { createContext, useContext, useState, useCallback } from 'react';


const NavigationContext = createContext();


export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation debe usarse dentro de NavigationProvider');
  }
  return context;
};


export const NavigationProvider = ({ children }) => {
  const [pantallaActual, setPantallaActual] = useState('auth');
  const [usuarioPublico, setUsuarioPublico] = useState(null);
  const [cartaSeleccionada, setCartaSeleccionada] = useState(null);
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState(null);


  const navigateTo = useCallback((pantalla, data = null) => {
    
    if (pantalla !== 'perfilPublico') {
      setUsuarioPublico(null);
    }
    if (pantalla !== 'detalle') {
      setCartaSeleccionada(null);
      setPublicacionSeleccionada(null);
    }
    
    setPantallaActual(pantalla);
    
  
    if (data) {
      if (pantalla === 'perfilPublico') {
        setUsuarioPublico(data);
      } else if (pantalla === 'detalle') {
        if (data.tipo === 'carta') {
          setCartaSeleccionada(data);
        } else if (data.tipo === 'publicacion') {
          setPublicacionSeleccionada(data);
        }
      }
    }
  }, []);


  const verPerfilPublico = useCallback((usuario) => {
    setUsuarioPublico(usuario);
    setPantallaActual('perfilPublico');
  }, []);


  const verDetalleCarta = useCallback((carta) => {
    setCartaSeleccionada(carta);
    setPantallaActual('detalle');
  }, []);


  const verDetallePublicacion = useCallback((publicacion) => {
    setPublicacionSeleccionada(publicacion);
    setPantallaActual('detalle');
  }, []);

 
  const goBack = useCallback(() => {

    setPantallaActual('ventas');
  }, []);

 
  const resetNavigation = useCallback(() => {
    setPantallaActual('auth');
    setUsuarioPublico(null);
    setCartaSeleccionada(null);
    setPublicacionSeleccionada(null);
  }, []);

  const value = {

    pantallaActual,
    usuarioPublico,
    cartaSeleccionada,
    publicacionSeleccionada,
    

    navigateTo,
    verPerfilPublico,
    verDetalleCarta,
    verDetallePublicacion,
    goBack,
    resetNavigation,
    
 
    setPantallaActual,
    setUsuarioPublico
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};