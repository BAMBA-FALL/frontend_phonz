import React, { useState, useEffect } from 'react';
import { categoryService } from '../../../_services/category.service'; 
import { useNavigate } from 'react-router-dom';
// import './categoryForm.css'; 

const CategoryForm = () => {
  const [name, setName] = useState(''); 
  const [parentCategory, setParentCategory] = useState(''); 
  const [categories, setCategories] = useState([]); 
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await categoryService.getAllCategories();
        setCategories(categoriesData); 
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories principales:', error);
      }
    };


    

    fetchCategories(); 
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const newCategory = { name, parentCategory: parentCategory || null };
      await categoryService.addCategory(newCategory) 
      setSuccess(true); 
      setName(''); 
      setParentCategory(''); 
      navigate('/')
    } catch (error) {
      console.error('Erreur lors de la création de la catégorie:', error);
      setError('Erreur lors de la création de la catégorie.'); 
    }
  };

  return (
    <div className="category-form-container">
      <h2>Créer une nouvelle catégorie</h2>
      {success && <p>Catégorie créée avec succès!</p>} 
      {error && <p>{error}</p>} 
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom de la catégorie:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Catégorie parente (optionnel):</label>
          <select
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)} 
          >
            <option value="">Aucune</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CategoryForm; 
