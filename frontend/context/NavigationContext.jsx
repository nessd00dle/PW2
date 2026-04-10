import React, { createContext, useContext, useState, useCallback } from 'react';


const NavigationContext = createContext();

// Hook personalizado para usar el contexto
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

  // Navegación básica
  const navigateTo = useCallback((pantalla, data = null) => {
    // Limpiar datos específicos según la pantalla
    if (pantalla !== 'perfilPublico') {
      setUsuarioPublico(null);
    }
    if (pantalla !== 'detalle') {
      setCartaSeleccionada(null);
      setPublicacionSeleccionada(null);
    }
    
    setPantallaActual(pantalla);
    
    // Si se pasan datos, guardarlos según el tipo
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

  // Navegación específica para perfiles públicos
  const verPerfilPublico = useCallback((usuario) => {
    setUsuarioPublico(usuario);
    setPantallaActual('perfilPublico');
  }, []);

  // Navegación específica para detalles de carta
  const verDetalleCarta = useCallback((carta) => {
    setCartaSeleccionada(carta);
    setPantallaActual('detalle');
  }, []);

  // Navegación específica para detalles de publicación
  const verDetallePublicacion = useCallback((publicacion) => {
    setPublicacionSeleccionada(publicacion);
    setPantallaActual('detalle');
  }, []);

  // Volver atrás (funcionalidad simple)
  const goBack = useCallback(() => {
    // Puedes implementar un historial más complejo si lo necesitas
    setPantallaActual('ventas');
  }, []);

  // Limpiar todos los estados
  const resetNavigation = useCallback(() => {
    setPantallaActual('auth');
    setUsuarioPublico(null);
    setCartaSeleccionada(null);
    setPublicacionSeleccionada(null);
  }, []);

  const value = {
    // Estado
    pantallaActual,
    usuarioPublico,
    cartaSeleccionada,
    publicacionSeleccionada,
    
    // Funciones de navegación
    navigateTo,
    verPerfilPublico,
    verDetalleCarta,
    verDetallePublicacion,
    goBack,
    resetNavigation,
    
    // Setters directos (para casos específicos)
    setPantallaActual,
    setUsuarioPublico
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};