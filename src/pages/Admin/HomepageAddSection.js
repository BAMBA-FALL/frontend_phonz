import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import 'select2/dist/css/select2.min.css';
import 'select2';

import { homepageConfigService } from '../../_services/homepageConfig.service';
import { categoryService } from '../../_services/category.service';
import './HomepageAddSection.css';

const HomepageAddSection = () => {
    const navigate = useNavigate();
    const [section, setSection] = useState({
        sectionTitle: '',
        order: '',
        categoryIds: [],
        subcategoryIds: [],
        categoryLink: '',
        subcategoryLink: '',
        images: [],
        imageSizes: [],
    });
    const [imagePreviews, setImagePreviews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedType, setSelectedType] = useState('category');
    const categorySelectRef = useRef(null);
    const subcategorySelectRef = useRef(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await categoryService.getAllCategoriesWithSubcategories();
                setCategories(fetchedCategories);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (categorySelectRef.current) {
            $(categorySelectRef.current).select2({
                placeholder: 'Sélectionner une ou plusieurs catégories',
                allowClear: true
            }).on('change', function () {
                setSection(prevSection => ({ ...prevSection, categoryIds: $(this).val() }));
            });
        }

        if (subcategorySelectRef.current) {
            $(subcategorySelectRef.current).select2({
                placeholder: 'Sélectionner une ou plusieurs sous-catégories',
                allowClear: true
            }).on('change', function () {
                setSection(prevSection => ({ ...prevSection, subcategoryIds: $(this).val() }));
            });
        }

        return () => {
            if (categorySelectRef.current) {
                $(categorySelectRef.current).select2('destroy');
            }
            if (subcategorySelectRef.current) {
                $(subcategorySelectRef.current).select2('destroy');
            }
        };
    }, [categories]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSection({ ...section, [name]: value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSection({ ...section, images: files });

        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const handleImageSizeChange = (index, dimension, value) => {
        const newImageSizes = [...section.imageSizes];
        newImageSizes[index] = { ...newImageSizes[index], [dimension]: value };
        setSection({ ...section, imageSizes: newImageSizes });
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
        setSection({
            ...section,
            categoryIds: [],
            subcategoryIds: [],
            categoryLink: '',
            subcategoryLink: '',
        });
        if (categorySelectRef.current) {
            $(categorySelectRef.current).val(null).trigger('change');
        }
        if (subcategorySelectRef.current) {
            $(subcategorySelectRef.current).val(null).trigger('change');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('sectionTitle', section.sectionTitle);
        formData.append('order', section.order);
        formData.append('categoryLink', section.categoryLink);
        formData.append('subcategoryLink', section.subcategoryLink);

        section.categoryIds.forEach(id => formData.append('categoryIds[]', id));
        section.subcategoryIds.forEach(id => formData.append('subcategoryIds[]', id));

        section.images.forEach((file, index) => {
            formData.append('images', file);
            formData.append(`width_${file.name}`, section.imageSizes[index]?.width || '');
            formData.append(`height_${file.name}`, section.imageSizes[index]?.height || '');
        });

        try {
            await homepageConfigService.addHomepageConfig(formData);
            navigate('/admin/homepage/admin');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la configuration:', error);
        }
    };

    const handleLinkClick = (link) => {
        if (link) {
            navigate(link);
        }
    };

    return (
        <div className="homepage-add-section">
            <h1>Ajouter une Nouvelle Section</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="sectionTitle">Titre de la section:</label>
                    <input
                        type="text"
                        id="sectionTitle"
                        name="sectionTitle"
                        value={section.sectionTitle}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="sectionType">Type de Section:</label>
                    <select
                        id="sectionType"
                        name="sectionType"
                        value={selectedType}
                        onChange={handleTypeChange}
                        required
                    >
                        <option value="category">Catégorie</option>
                        <option value="subcategory">Sous-catégorie</option>
                    </select>
                </div>

                {selectedType === 'category' ? (
                    <div className="form-group">
                        <label htmlFor="categoryIds">Catégories:</label>
                        <select
                            id="categoryIds"
                            name="categoryIds"
                            multiple
                            ref={categorySelectRef}
                        >
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <div className="form-group">
                            <label htmlFor="categoryLink">Lien vers la Catégorie:</label>
                            <input
                                type="text"
                                id="categoryLink"
                                name="categoryLink"
                                value={section.categoryLink}
                                onChange={handleInputChange}
                            />
                            <button type="button" onClick={() => handleLinkClick(`/category/${section.categoryLink}`)}>
                                Aller à la Catégorie
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="form-group">
                        <label htmlFor="subcategoryIds">Sous-catégories:</label>
                        <select
                            id="subcategoryIds"
                            name="subcategoryIds"
                            multiple
                            ref={subcategorySelectRef}
                        >
                            {categories.flatMap((category) =>
                                category.subcategories.map((subcategory) => (
                                    <option key={subcategory._id} value={subcategory._id}>
                                        {subcategory.name}
                                    </option>
                                ))
                            )}
                        </select>
                        <div className="form-group">
                            <label htmlFor="subcategoryLink">Lien vers la Sous-Catégorie:</label>
                            <input
                                type="text"
                                id="subcategoryLink"
                                name="subcategoryLink"
                                value={section.subcategoryLink}
                                onChange={handleInputChange}
                            />
                            <button type="button" onClick={() => handleLinkClick(`/subcategory/${section.subcategoryLink}`)}>
                                Aller à la Sous-Catégorie
                            </button>
                        </div>
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="order">Ordre:</label>
                    <input
                        type="number"
                        id="order"
                        name="order"
                        value={section.order}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="images">Images:</label>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    <div className="image-previews">
                        {imagePreviews.map((src, index) => (
                            <div key={index} className="image-preview">
                                <img
                                    src={src}
                                    alt={`Prévisualisation de l'image ${index + 1}`}
                                    style={{ 
                                        width: `${section.imageSizes[index]?.width || '100px'}`, 
                                        height: `${section.imageSizes[index]?.height || '100px'}` 
                                    }}
                                />
                                <div>
                                    <input
                                        type="number"
                                        placeholder="Largeur"
                                        value={section.imageSizes[index]?.width || ''}
                                        onChange={(e) => handleImageSizeChange(index, 'width', e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Hauteur"
                                        value={section.imageSizes[index]?.height || ''}
                                        onChange={(e) => handleImageSizeChange(index, 'height', e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit">Ajouter la Section</button>
            </form>
        </div>
    );
};

export default HomepageAddSection;
