import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SearchCard = ({ id, name,clearSearchInput }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    
    console.log("line 8 click");
    // navigate(`/menu/${id}`)
  
      clearSearchInput();
    }

  return (
    <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:"0",behavior:"smooth"})}>
    <div className="cursor-pointer mb-2 mt-2 search-card" onClick={handleClick} >
      {name}
    </div>
    </Link>
  );
};

export default SearchCard;
