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
  const [pantallaActual, setPantallaActual] = useState('home');
  const [usuarioPublico, setUsuarioPublico] = useState(null);
  const [cartaSeleccionada, setCartaSeleccionada] = useState(null);
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState(null);
  
  // Historial de navegación
  const [history, setHistory] = useState(['home']);

  const navigateTo = useCallback((pantalla, data = null) => {
    // Guardar la pantalla actual en el historial antes de navegar
    setHistory(prev => [...prev, pantalla]);
    
    // Limpiar datos específicos según la pantalla
    if (pantalla !== 'perfilPublico') {
      setUsuarioPublico(null);
    }
    if (pantalla !== 'detalle') {
      setCartaSeleccionada(null);
      setPublicacionSeleccionada(null);
    }
    
    setPantallaActual(pantalla);
    
    // Manejar datos adicionales
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
    setHistory(prev => [...prev, 'perfilPublico']);
    setUsuarioPublico(usuario);
    setPantallaActual('perfilPublico');
  }, []);

  const verDetalleCarta = useCallback((carta) => {
    setHistory(prev => [...prev, 'detalle']);
    setCartaSeleccionada(carta);
    setPantallaActual('detalle');
  }, []);

  const verDetallePublicacion = useCallback((publicacion) => {
    setHistory(prev => [...prev, 'detalle']);
    setPublicacionSeleccionada(publicacion);
    setPantallaActual('detalle');
  }, []);

  // Función para regresar a la pantalla anterior
  const goBack = useCallback(() => {
    if (history.length > 1) {
      // Remover la pantalla actual del historial
      const newHistory = [...history];
      newHistory.pop(); // Eliminar la pantalla actual
      const previousScreen = newHistory[newHistory.length - 1];
      
      setHistory(newHistory);
      setPantallaActual(previousScreen);
      
      // Limpiar datos según la pantalla anterior
      if (previousScreen !== 'perfilPublico') {
        setUsuarioPublico(null);
      }
      if (previousScreen !== 'detalle') {
        setCartaSeleccionada(null);
        setPublicacionSeleccionada(null);
      }
      
      return true;
    }
    return false;
  }, [history]);

  const resetNavigation = useCallback(() => {
    setHistory(['auth']);
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
    history,
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