import React, { useEffect, useState } from "react";
import { productService } from "../../../_services/product.service";
import { useNavigate } from "react-router-dom";


const Product = ()=> {

const [products, setProducts] = useState([])


 useEffect  (()=>{



    
 },[])



}



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SketchPicker } from 'react-color';
import { productService } from '../../../_services/product.service';
import './productadd.css';

const ProductAdd = () => {
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: 0,
    type: '',
    category: '',
    stock: 0,
    colors: [],
    storageCapacity: [],
    images: []
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [colorInput, setColorInput] = useState(''); // Pour stocker la valeur de l'input de couleur
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    try {
      await productService.addProduct(productData);
      console.log('Produit ajouté avec succès');
      navigate('/admin');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit', error);
    }
  };

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const limitedFiles = selectedFiles.slice(0, 4);
  
    setSelectedImages(limitedFiles);
  };

  const handleColorChange = (color) => {
    // Ajouter la couleur sélectionnée à la liste des couleurs
    setProductData({ ...productData, colors: [...productData.colors, color.hex] });
    // Réinitialiser l'input de couleur
    setColorInput('');
  };

  const handleColorRemove = (colorToRemove) => {
    // Filtrer les couleurs pour enlever celle qui doit être supprimée
    const updatedColors = productData.colors.filter(color => color !== colorToRemove);
    // Mettre à jour les couleurs dans l'état du formulaire
    setProductData({ ...productData, colors: updatedColors });
  };

  return (
    <div className='container-2'>
      <h2>Ajouter un produit</h2>
      <form>
        <div className="form-group-2">
          <label className="form-label-2">Titre:</label>
          <input
            type="text"
            className="form-input-2"
            value={productData.title}
            onChange={(e) => setProductData({ ...productData, title: e.target.value })}
          />
        </div>

        <div className="form-group-2">
          <label className="form-label-2">Description:</label>
          <textarea
            className="form-textarea-2"
            value={productData.description}
            onChange={(e) => setProductData({ ...productData, description: e.target.value })}
          />
        </div>

        <div className="form-group-2">
          <label className="form-label-2">Prix:</label>
          <input
            type="number"
            className="form-input-2"
            value={productData.price}
            onChange={(e) => setProductData({ ...productData, price: e.target.value })}
          />
        </div>

        <div className="form-group-2">
          <label className="form-label-2">Type:</label>
          <input
            type="text"
            className="form-input-2"
            value={productData.type}
            onChange={(e) => setProductData({ ...productData, type: e.target.value })}
          />
        </div>

        <div className="form-group-2">
          <label className="form-label-2">Catégorie:</label>
          <input
            type="text"
            className="form-input-2"
            value={productData.category}
            onChange={(e) => setProductData({ ...productData, category: e.target.value })}
          />
        </div>

        <div className="form-group-2">
          <label className="form-label-2">Stock:</label>
          <input
            type="number"
            className="form-input-2"
            value={productData.stock}
            onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
          />
        </div>

        <div className="form-group-2">
          <label className="form-label-2">Couleurs:</label>
          <SketchPicker
            color={colorInput}
            onChangeComplete={(color) => setColorInput(color.hex)}
          />
          <button
            type="button"
            onClick={() => handleColorChange({ hex: colorInput })}
            className="add-color-button"
          >
            Ajouter la couleur
          </button>
          {/* Afficher les couleurs sélectionnées et un bouton pour les supprimer */}
          {productData.colors.map((color, index) => (
            <div key={index} className="selected-color">
              <div style={{ backgroundColor: color }} className="color-box"></div>
              <span>{color}</span>
              <button
                type="button"
                onClick={() => handleColorRemove(color)}
                className="remove-color-button"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>

        <div className="form-group-2">
          <label className="form-label-2">Capacité de stockage (en GB):</label>
          <select
            className="form-select-2"
            multiple
            value={productData.storageCapacity}
            onChange={(e) => setProductData({ ...productData, storageCapacity: Array.from(e.target.selectedOptions, (option) => option.value) })}
          >
            <option value="64">64</option>
            <option value="128">128</option>
            <option value="256">256</option>
            <option value="512">512</option>
            <option value="1024">1024</option>
          </select>
        </div>
        <div className="form-group-2">
          <label className="form-label-2">Images:</label>
          <input
            type="file"
            className="form-file-2"
            onChange={handleImageChange}
            multiple
          />
          <div className="image-preview">
            {selectedImages.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Image ${index + 1}`}
                className="preview-image"
              />
            ))}
          </div>
        </div>

        <button type="button" className="form-button-2" onClick={handleAddProduct}>
          Ajouter le produit
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;

