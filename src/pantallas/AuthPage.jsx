import React, { useState } from 'react';
import { Camera } from 'lucide-react'; // Opcional: para un icono de cámara

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [preview, setPreview] = useState(null);

  // Función para previsualizar la foto seleccionada
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
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

        <form className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-[#2d3748] mb-1 ml-1">Nombre de usuario</label>
              <input type="text" className="w-full bg-[#4a917a] border-none rounded-2xl p-3 text-white placeholder-emerald-200 outline-none" />
            </div>
          )}
          
          <div>
            <label className="block text-[#2d3748] mb-1 ml-1">Email</label>
            <input type="email" placeholder="Email" className="w-full bg-[#4a917a] border-none rounded-2xl p-3 text-white outline-none" />
          </div>

          <div>
            <label className="block text-[#2d3748] mb-1 ml-1">Contraseña</label>
            <input type="password" placeholder="********" className="w-full bg-[#4a917a] border-none rounded-2xl p-3 text-white outline-none" />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-[#2d3748] mb-1 ml-1">Foto de Perfil</label>
              <div className="relative">
                {/* Input oculto pero funcional */}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  className="hidden" 
                  id="foto-upload"
                />
                {/* Botón personalizado que actúa como el input */}
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
                    {preview ? 'Cambiar foto' : 'Seleccionar imagen'}
                  </span>
                </label>
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-center">
            <button className="bg-[#2d2a3e] text-white px-12 py-3 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all">
              {isLogin ? 'Login' : 'Unirse'}
            </button>
          </div>
        </form>

        <p className="text-center mt-6 text-[#2d3748]">
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'} 
          <button 
            onClick={() => setIsLogin(!isLogin)} 
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