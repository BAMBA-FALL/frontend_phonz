import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoryService } from '../../../_services/category.service';
import { productService } from '../../../_services/product.service';
import './productadd.css';

const AddProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    stock: 0,
    color: '',
    colors: '',
    storageCapacity: '',
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getAllCategoriesWithSubcategories();
        console.log('Categories fetched:', response);
        setCategories(response);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory(''); // Réinitialiser la sous-catégorie sélectionnée
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append('title', formData.title);
      productData.append('description', formData.description);
      productData.append('price', formData.price);
      productData.append('stock', formData.stock);
      productData.append('color', formData.color);
      productData.append('colors', formData.colors);
      productData.append('category', selectedCategory);
      productData.append('subcategory', selectedSubcategory); // Ajouter la sous-catégorie

      formData.images.forEach((file) => productData.append('images', file));

      await productService.addProduct(productData);
      console.log('Produit ajouté avec succès.');
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
    }
  };

  return (
    <div className="container-2">
      <div className="header-add">
        <p className='form-label-2'>AJOUTER UN NOUVEAU PRODUIT</p>
        <Link to="/admin/product/index" className="back-link"><button>Retour à la liste des produits</button></Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group-2">
          <label className="form-label-2">Catégorie:</label>
          <select
            className="form-select-2"
            value={selectedCategory}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group-2">
          <label className="form-label-2">Sous-catégorie:</label>
          <select
            className="form-select-2"
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
            required
          >
            <option value="">Sélectionnez une sous-catégorie</option>
            {selectedCategory &&
              categories
                .find(category => category._id === selectedCategory)
                ?.subcategories.map((subcategory) => (
                  <option key={subcategory._id} value={subcategory._id}>
                    {subcategory.name}
                  </option>
                ))}
          </select>
        </div>

        <div className="form-group-2">
          <label htmlFor="title" className="form-label-2">Titre:</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-input-2"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group-2">
          <label htmlFor="description" className="form-label-2">Description:</label>
          <textarea
            id="description"
            name="description"
            className="form-textarea-2"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group-2">
          <label htmlFor="price" className="form-label-2">Prix:</label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-input-2"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group-2">
          <label htmlFor="stock" className="form-label-2">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            className="form-input-2"
            value={formData.stock}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group-2">
          <label htmlFor="color" className="form-label-2">Couleur principale:</label>
          <input
            type="text"
            id="color"
            name="color"
            className="form-input-2"
            value={formData.color}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group-2">
          <label htmlFor="colors" className="form-label-2">Autres couleurs (séparées par des virgules):</label>
          <input
            type="text"
            id="colors"
            name="colors"
            className="form-input-2"
            value={formData.colors}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group-2">
          <label htmlFor="storageCapacity" className="form-label-2">Capacité de stockage (séparée par des virgules):</label>
          <input
            type="text"
            id="storageCapacity"
            name="storageCapacity"
            className="form-input-2"
            value={formData.storageCapacity}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group-2">
          <label htmlFor="images" className="form-label-2">Images (jusqu'à 4):</label>
          <input
            type="file"
            id="images"
            name="images"
            className="form-file-2"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />

          <div className="image-previews">
            {imagePreviews.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Prévisualisation de l'image ${index + 1}`}
                className="preview-image"
              />
            ))}
          </div>
        </div>

        <button type="submit" className="form-button-2">
          Ajouter le produit
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
