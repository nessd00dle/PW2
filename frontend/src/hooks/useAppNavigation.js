import { useNavigate } from 'react-router-dom';

export const useAppNavigation = () => {
  const navigate = useNavigate();

  const goToHome = () => navigate('/');
  const goToAuth = () => navigate('/auth');
  const goToPerfil = () => navigate('/mi-perfil');
  const goToPerfilPublico = (userId) => navigate(`/perfil/${userId}`);
  const goToEditarPerfil = () => navigate('/editar-perfil');
  const goToConfiguracion = () => navigate('/configuracion');
  const goToEstadistica = () => navigate('/estadistica');
  const goToPublicar = () => navigate('/publicar');
  const goToColeccion = () => navigate('/coleccion');
  const goToDetalle = (tipo, id, state) => navigate(`/detalle/${tipo}/${id}`, { state });
  const goToVentas = () => navigate('/ventas');
  const goBack = () => navigate(-1);

  return {
    goToHome,
    goToAuth,
    goToPerfil,
    goToPerfilPublico,
    goToEditarPerfil,
    goToConfiguracion,
    goToEstadistica,
    goToPublicar,
    goToColeccion,
    goToDetalle,
    goToVentas,
    goBack,
    navigate
  };
};