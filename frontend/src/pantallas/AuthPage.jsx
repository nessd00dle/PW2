import React, { useState } from 'react';
import { Camera, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '../../context/NavigationContext';
import axios from 'axios';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const { setPantallaActual } = useNavigation();
  
  const [formData, setFormData] = useState({
    nombre: '',
    nickname: '',
    correo: '',
    contrasena: '',
    fotoPerfil: null
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Por favor selecciona una imagen válida');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('La imagen no debe superar los 5MB');
        return;
      }
      
      setPreview(URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        fotoPerfil: file
      }));
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        if (isLogin) {
            const result = await login(formData.correo, formData.contrasena);
            
            if (result.success) {
                alert('¡Inicio de sesión exitoso!');
                setPantallaActual('perfil');
            } else {
                setError(result.error);
            }
        } else {
            // Registro con foto
            const formDataToSend = new FormData();
            formDataToSend.append('nombre', formData.nombre);
            formDataToSend.append('nickname', formData.nickname);
            formDataToSend.append('correo', formData.correo);
            formDataToSend.append('contrasena', formData.contrasena);
            
            if (formData.fotoPerfil) {
                formDataToSend.append('fotoPerfil', formData.fotoPerfil);
            }
            
            const response = await axios.post(
                'http://localhost:3000/api/usuarios/registro-con-foto',
                formDataToSend,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );
            
         
            
            alert('¡Registro exitoso! Por favor inicia sesión');
            
            // Limpiar el formulario y cambiar a modo login
            setIsLogin(true);
            setFormData({
                nombre: '',
                nickname: '',
                correo: '',
                contrasena: '',
                fotoPerfil: null
            });
            setPreview(null);
            
            // Redirigir a login (auth)
            setPantallaActual('auth');
        }
    } catch (error) {
        console.error('Error:', error);
        setError(error.response?.data?.error || 'Error en la solicitud');
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="bg-[#56ab91] rounded-[40px] p-8 w-full max-w-md shadow-2xl relative">
        
        <h2 className="text-white text-3xl font-bold text-center mb-2">
          {isLogin ? 'Bienvenido de vuelta' : 'Únete'}
        </h2>
        <p className="text-white text-center mb-8 opacity-90">
          {isLogin ? 'Inicia sesión para continuar :)' : 'Por favor llena todos los campos'}
        </p>

        {error && (
          <div className="mb-4 bg-red-500/20 border border-red-500 text-red-100 px-4 py-2 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-[#2d3748] mb-1 ml-1">Nombre completo</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full bg-[#4a917a] border-none rounded-2xl p-3 text-white placeholder-emerald-200 outline-none"
                  placeholder="Tu nombre"
                  required={!isLogin}
                />
              </div>
              
              <div>
                <label className="block text-[#2d3748] mb-1 ml-1">Nickname</label>
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                  className="w-full bg-[#4a917a] border-none rounded-2xl p-3 text-white placeholder-emerald-200 outline-none"
                  placeholder="Cómo te llamarán"
                  required={!isLogin}
                />
              </div>
            </>
          )}
          
          <div>
            <label className="block text-[#2d3748] mb-1 ml-1">Email</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
              placeholder="tu@email.com"
              className="w-full bg-[#4a917a] border-none rounded-2xl p-3 text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-[#2d3748] mb-1 ml-1">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="contrasena"
                value={formData.contrasena}
                onChange={handleInputChange}
                placeholder="********"
                className="w-full bg-[#4a917a] border-none rounded-2xl p-3 text-white outline-none pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {!isLogin && (
              <p className="text-xs text-white/70 mt-1 ml-1">Mínimo 6 caracteres</p>
            )}
          </div>

          {!isLogin && (
            <div>
              <label className="block text-[#2d3748] mb-1 ml-1">Foto de Perfil</label>
              <div className="relative">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  className="hidden" 
                  id="foto-upload"
                />
                <label 
                  htmlFor="foto-upload" 
                  className="w-full bg-[#4a917a] rounded-2xl p-3 flex items-center justify-center gap-3 cursor-pointer hover:bg-[#3d7a67] transition-all border-2 border-dashed border-white/20"
                >
                  {preview ? (
                    <img src={preview} alt="Vista previa" className="w-8 h-8 rounded-full object-cover border border-white" />
                  ) : (
                    <Camera className="text-emerald-200 w-5 h-5" />
                  )}
                  <span className="text-white text-sm">
                    {preview ? 'Cambiar foto' : 'Seleccionar imagen (opcional)'}
                  </span>
                </label>
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-center">
            <button 
              type="submit"
              disabled={loading}
              className="bg-[#2d2a3e] text-white px-12 py-3 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
            </button>
          </div>
        </form>

        <p className="text-center mt-6 text-[#2d3748]">
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'} 
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setFormData({
                nombre: '',
                nickname: '',
                correo: '',
                contrasena: '',
                fotoPerfil: null
              });
              setPreview(null);
            }} 
            className="ml-1 underline font-medium"
          >
            {isLogin ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;