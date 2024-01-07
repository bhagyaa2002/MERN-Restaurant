import React from 'react';
import { useParams } from 'react-router-dom';

const Menu = () => {
  const { idProduct } = useParams();
  console.log(idProduct);

  return (
    <div>
      Menu
    </div>
  );
};

export default Menu;
