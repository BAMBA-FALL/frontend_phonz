import React, { useState, useEffect } from 'react';
import { productService } from '../../../_services/product.service'; // Pour récupérer des produits
import { accessoryService } from '../../../_services/accessoire.service'; // Pour ajouter des accessoires
import './addAccessoire.css';

const AddAccessoryForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    productId: '',
    image: null, // Pour stocker le fichier d'image
  });

  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(''); // Pour stocker l'ID du produit sélectionné
  const [error, setError] = useState(null); // Pour stocker les messages d'erreur
  const [loading, setLoading] = useState(true);

  // Récupérer la liste des produits disponibles
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await productService.getProducts();
        setProducts(productsData.products);
      } catch (error) {
        setError('Erreur lors de la récupération des produits.');
      } finally {
        setLoading(false); // Indiquer que le chargement est terminé
      }
    };

    fetchProducts(); // Charger les produits
  }, []);

  // Gérer le changement de produit sélectionné
  const handleProductSelection = (event) => {
    setSelectedProductId(event.target.value);
  };

  // Gérer le changement d'image
  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêcher le comportement par défaut

    // Validation des champs obligatoires
    if (!selectedProductId || !formData.title || !formData.description || formData.price <= 0 || !formData.image) {
      setError('Veuillez remplir tous les champs obligatoires.'); // Afficher un message d'erreur
      return; // Empêcher la soumission du formulaire
    }

    try {
      const newAccessory = new FormData(); // Utilisation de FormData pour le multipart
      newAccessory.append('title', formData.title);
      newAccessory.append('description', formData.description);
      newAccessory.append('price', formData.price);
      newAccessory.append('stock', formData.stock);
      newAccessory.append('category', formData.category);
      newAccessory.append('productId', selectedProductId); // Ajout de l'ID du produit sélectionné
      newAccessory.append('image', formData.image); // Ajout de l'image

      // Appeler le service pour ajouter l'accessoire
      const addedAccessory = await accessoryService.addAccessory(newAccessory);
      console.log('Accessoire ajouté:', addedAccessory);

      // Réinitialiser le formulaire après ajout
      setFormData({
        title: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        image: null,
      });

      setSelectedProductId(''); // Réinitialiser le produit sélectionné
      setError(null); // Effacer les erreurs
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'accessoire", error);
      setError('Erreur lors de l\'ajout de l\'accessoire.');
    }
  };

  return (
    <div>
      <p>Ajouter un accessoire</p>
    <form onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>} {/* Afficher les messages d'erreur */}

      <div className="form-group">
        <label htmlFor="selectedProduct">Sélectionner le produit parent :</label>
        <select
          id="selectedProduct"
          value={selectedProductId}
          onChange={handleProductSelection}
        >
          <option value="">Sélectionnez un produit</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.title}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="title">Titre :</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description :</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Prix :</label>
        <input
          type="number"
          id="price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="stock">Stock :</label>
        <input
          type="number"
          id="stock"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Catégorie :</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image :</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {formData.image && (
          <img
            src={URL.createObjectURL(formData.image)}
            alt="Prévisualisation de l'image"
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
        )}
      </div>

      <button type="submit">Ajouter l'accessoire</button>
    </form>
    </div>
  );
};

export default AddAccessoryForm;
