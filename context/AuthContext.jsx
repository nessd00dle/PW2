import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Configurar axios con el token
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    // Verificar si hay usuario guardado al cargar
    useEffect(() => {
        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado && token) {
            setUsuario(JSON.parse(usuarioGuardado));
        }
        setLoading(false);
    }, [token]);

    // Login
    const login = async (correo, contrasena) => {
        try {
            const response = await axios.post('http://localhost:3000/api/usuarios/login', {
                correo,
                contrasena
            });

            const { token: nuevoToken, usuario: usuarioData } = response.data;
            
            setToken(nuevoToken);
            setUsuario(usuarioData);
            localStorage.setItem('token', nuevoToken);
            localStorage.setItem('usuario', JSON.stringify(usuarioData));
            
            return { success: true, usuario: usuarioData };
        } catch (error) {
            console.error('Error en login:', error);
            return { 
                success: false, 
                error: error.response?.data?.error || 'Error al iniciar sesión' 
            };
        }
    };

    // Registro
    const registro = async (userData) => {
        try {
            const response = await axios.post('http://localhost:3000/api/usuarios/registro', userData);
            
            const { token: nuevoToken, usuario: usuarioData } = response.data;
            
            setToken(nuevoToken);
            setUsuario(usuarioData);
            localStorage.setItem('token', nuevoToken);
            localStorage.setItem('usuario', JSON.stringify(usuarioData));
            
            return { success: true, usuario: usuarioData };
        } catch (error) {
            console.error('Error en registro:', error);
            return { 
                success: false, 
                error: error.response?.data?.error || 'Error al registrarse' 
            };
        }
    };

    // Logout
    const logout = () => {
        setUsuario(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        delete axios.defaults.headers.common['Authorization'];
    };

    // Actualizar perfil
    const actualizarPerfil = async (datosActualizados) => {
        try {
            const response = await axios.put('http://localhost:3000/api/usuarios/perfil', datosActualizados);
            const usuarioActualizado = response.data.usuario;
            setUsuario(usuarioActualizado);
            localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
            return { success: true, usuario: usuarioActualizado };
        } catch (error) {
            console.error('Error actualizando perfil:', error);
            return { 
                success: false, 
                error: error.response?.data?.error || 'Error al actualizar perfil' 
            };
        }
    };

    const value = {
        usuario,
        token,
        loading,
        login,
        registro,
        logout,
        actualizarPerfil,
        isAuthenticated: !!usuario && !!token
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

//Aqui se crea el contexto de autenticación para manejar el estado del usuario, token y funciones de login,
//  registro, logout y actualización de perfil. Se utiliza axios para hacer las solicitudes al backend y
//  se guarda el token y la información del usuario en localStorage para persistencia.