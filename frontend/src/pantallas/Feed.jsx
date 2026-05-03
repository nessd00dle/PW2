
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../componentes/Layout/MainLayout";
import CardGrid from "../componentes/Cards/CardGrid";

import { useEffect } from 'react';
import axios from 'axios';

const Feed = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("all");
  const [selectedFandoms, setSelectedFandoms] = useState([]);
  const [sortBy, setSortBy] = useState("popular");

  //Aqui se contendrán las publicaciones, traidas desde la BD (chris)
  const [publicaciones, setPublicaciones] = useState([]);

  //Aquí ya se llaman las publicaciones desde la BD
  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/publicaciones');
        setPublicaciones(res.data.publicaciones);
      } catch (error) {
        console.error('Error cargando publicaciones:', error);
      }
    };

    fetchPublicaciones();
  }, []);

  const cards = publicaciones.map(pub => ({
    id: pub._id,

    // Nombre del usuario
    type: pub.Idusuario?.nickname || 'Usuario',

    // Nombre de la franquicia (requiere populate)
    fandom: pub.Franquicia?.nombre || 'Sin franquicia',

    // ID de la franquicia
    fandomId: pub.Franquicia?._id,

    // Imagen principal
    image: pub.fotosUrls?.[0] || 'https://via.placeholder.com/200x280',

    reverse: pub.Texto || 'Sin descripcion',

    description: pub.Titulo,

    price: pub.Monto ? `$${pub.Monto}` : '',

    cantidad: pub.Cantidad,

    isVenta: pub.Tipo === 'venta',
    isIntercambio: pub.Tipo === 'intercambio'
  }));

  const filteredByFandom = selectedFandoms.length > 0
    ? cards.filter(card => selectedFandoms.includes(card.fandomId))
    : cards;

  const filteredByType = filteredByFandom.filter(card => {
    if (filterType === 'all') return true;
    if (filterType === 'sale') return card.isVenta;
    if (filterType === 'trade') return card.isIntercambio;
    return true;
  });

  const sortedCards = [...filteredByType].sort((a, b) => {
    const priceA = parseFloat(a.price.replace('$', ''));
    const priceB = parseFloat(b.price.replace('$', ''));
    switch (sortBy) {
      case 'recent': return b.id - a.id; 
      case 'price_asc': return priceA - priceB;
      case 'price_desc': return priceB - priceA;
      default: return 0;
    }
  });

  const handleCardClick = (card) => {
    navigate(`/detalle/carta/${card.id}`, { state: { carta: card } });
  };

  return (
    <MainLayout
      selectedFandoms={selectedFandoms}
      onFandomChange={setSelectedFandoms}
      sortBy={sortBy}
      onSortChange={setSortBy}
      filterType={filterType}
      onFilterChange={setFilterType}
    >
      <CardGrid 
        cards={sortedCards}
        onCardClick={handleCardClick}
      />
    </MainLayout>
  );
};

export default Feed;