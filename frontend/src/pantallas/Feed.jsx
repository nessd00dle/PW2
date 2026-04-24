import React, { useState } from "react";
import MainLayout from "../componentes/Layout/MainLayout";
import CardGrid from "../componentes/Cards/CardGrid";

import { useEffect } from "react";



const Feed = ({ setPantalla }) => {
  const [filterType, setFilterType] = useState("all");
  const [selectedFandoms, setSelectedFandoms] = useState([]);
  const [sortBy, setSortBy] = useState("popular");

  // estado para las publicaciones
  const [cards, setCards] = useState([]);

  // useEffect Va dentro del componente
  useEffect(() => {
    const obtenerPublicaciones = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/publicaciones");
        const data = await res.json();

        console.log("📦 Publicaciones:", data);

        const adaptadas = data.publicaciones.map(pub => ({
          id: pub._id,
          type: pub.Titulo,
          fandom: pub.Franquicia,
          fandomId: pub.Franquicia.toLowerCase(),
          image: pub.Fotos?.length
          ? `http://localhost:3000/uploads/publicaciones/${pub.Fotos[0]}`
          : null,
          reverse: pub.Condicion,
          description: pub.Texto,
          price: pub.Monto ? `$${pub.Monto}` : "",
          isVenta: pub.Tipo === "venta",
          isIntercambio: pub.Tipo === "intercambio"
        }));

        console.log(data);

        setCards(adaptadas);

      } catch (error) {
        console.error("❌ Error cargando publicaciones:", error);
      }
    };

    obtenerPublicaciones();
  }, []);

  // 👇 aquí ya usas cards normalmente
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
    const priceA = parseFloat(a.price.replace('$', '')) || 0;
    const priceB = parseFloat(b.price.replace('$', '')) || 0;

    switch (sortBy) {
      case 'recent': return b.id.localeCompare(a.id);
      case 'price_asc': return priceA - priceB;
      case 'price_desc': return priceB - priceA;
      default: return 0;
    }
  });

  return (
    <MainLayout
      setPantalla={setPantalla}
      selectedFandoms={selectedFandoms}
      onFandomChange={setSelectedFandoms}
      sortBy={sortBy}
      onSortChange={setSortBy}
      filterType={filterType}
      onFilterChange={setFilterType}
    >
      <CardGrid 
        cards={sortedCards}
        onCardClick={(card) => setPantalla('detalle')}
      />
    </MainLayout>
  );
};

export default Feed;