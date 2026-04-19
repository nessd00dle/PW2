import React from "react";
import FandomFilter from "../Filtros/FandomFilter";

const LeftSidebar = ({ selectedFandoms, onFandomChange }) => {
  return (
    <div className="w-full">
      <FandomFilter 
        selectedFandoms={selectedFandoms} 
        onFandomChange={onFandomChange} 
      />
    </div>
  );
};

export default LeftSidebar;