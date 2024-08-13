import React, { useEffect, useState } from 'react';
import { categoryService } from '../../../_services/category.service'

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Récupérer les catégories lors du chargement du composant
    categoryService.getCategories().then(data=>setCategories(data.categories));
  }, []);

  return (
    <div>
      <h2>Catégories</h2>
      <ul>
        {categories.map(category => (
          <li key={category._id}>
            {category.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
