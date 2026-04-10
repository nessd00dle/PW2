import React from "react";
import FandomFilter from "../Filtros/FandomFilter";

const LeftSidebar = ({ selectedFandoms, onFandomChange }) => { // recibir props
  return (
    <aside className="w-64 space-y-6">
      
    

      {/* filtro fandom */}
      <FandomFilter 
        selectedFandoms={selectedFandoms} // pasar props
        onFandomChange={onFandomChange}
      />
    </aside>
  );
};

export default LeftSidebar;