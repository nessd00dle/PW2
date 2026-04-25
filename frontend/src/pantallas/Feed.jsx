
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../componentes/Layout/MainLayout";
import CardGrid from "../componentes/Cards/CardGrid";

const Feed = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("all");
  const [selectedFandoms, setSelectedFandoms] = useState([]);
  const [sortBy, setSortBy] = useState("popular");

  const cards = [
    { id: 1, type: "Carta Holo", fandom: "Pokémon", fandomId: "pokemon", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlSLVcEaKMsGAkeA35IbD9_cFuXXEdATuzfQ&s/200x280", reverse: "Edición Limitada", description: "bonita", price: "$25.00", isVenta: true, isIntercambio: false },
    { id: 2, type: "Carta Normal", fandom: "Magic", fandomId: "magic", image: "https://gatherer.wizards.com/Handlers/Image.ashx?type=card&name=Shadowmage+Infiltrator/200x280", reverse: "Foil", description: "linda", price: "$350.00", isVenta: true, isIntercambio: true },
    { id: 3, type: "Carta Rara", fandom: "Digimon", fandomId: "digimon", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgZ856cXwx7YgoNnyCXZyIZrCx9-RoLsijJg&s/200x280", reverse: "Alternativa", description: "wow", price: "$45.00", isVenta: false, isIntercambio: true },
    { id: 4, type: "Carta Promo", fandom: "DragonBall", fandomId: "dragonball", image: "https://mnacardz.com/cdn/shop/files/BT26-139_SCR_Metamorphic_Android_Cell_2024_124538ed-f4f5-4a0c-8428-5e7362738238.jpg?v=1753904845&width=3024/200x280", reverse: "Holo", description: "muy especial", price: "$30.00", isVenta: true, isIntercambio: false }
  ];

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