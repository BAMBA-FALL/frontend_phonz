import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, Upload, Image, Space } from 'antd';
import { UploadOutlined, ReloadOutlined } from '@ant-design/icons';
import { homepageConfigService } from '../../_services/homepageConfig.service';
import { categoryService } from '../../_services/category.service';
import './HomepageAddSection.css';

const { Option } = Select;

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
    const [form] = Form.useForm();

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSection({ ...section, [name]: value });
    };

    const handleImageChange = (info) => {
        if (info.fileList && info.fileList.length > 0) {
            const files = info.fileList.map(file => file.originFileObj);
            const previews = [];
            const newImageSizes = [];
    
            files.forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.src = event.target.result;
                    img.onload = () => {
                        newImageSizes[index] = {
                            width: img.width,
                            height: img.height
                        };
                        setSection(prevSection => ({
                            ...prevSection,
                            imageSizes: newImageSizes
                        }));
                    };
                };
                reader.readAsDataURL(file);
                previews.push(URL.createObjectURL(file));
            });
    
            setSection(prevSection => ({
                ...prevSection,
                images: files
            }));
            setImagePreviews(previews);
        }
    };
    

    const handleImageSizeChange = (index, dimension, value) => {
        const newImageSizes = [...section.imageSizes];
        newImageSizes[index] = {
            ...newImageSizes[index],
            [dimension]: value
        };
        setSection({ ...section, imageSizes: newImageSizes });
    };

    const handleImageUpdate = (index) => {
        const newImageSizes = [...section.imageSizes];
        setSection({ ...section, imageSizes: newImageSizes });
    };

    const handleTypeChange = (value) => {
        setSelectedType(value);
        setSection({
            ...section,
            categoryIds: [],
            subcategoryIds: [],
            categoryLink: '',
            subcategoryLink: '',
        });
        form.resetFields(['categoryIds', 'subcategoryIds']);
    };

    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append('sectionTitle', values.sectionTitle);
        formData.append('order', values.order);
        formData.append('categoryLink', values.categoryLink);
        formData.append('subcategoryLink', values.subcategoryLink);

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

            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item
                    label="Titre de la section"
                    name="sectionTitle"
                    rules={[{ required: true, message: 'Veuillez entrer le titre de la section' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Type de Section"
                    name="sectionType"
                    rules={[{ required: true, message: 'Veuillez sélectionner le type de section' }]}
                >
                    <Select onChange={handleTypeChange} defaultValue={selectedType}>
                        <Option value="category">Catégorie</Option>
                        <Option value="subcategory">Sous-catégorie</Option>
                    </Select>
                </Form.Item>

                {selectedType === 'category' ? (
                    <>
                        <Form.Item
                            label="Catégories"
                            name="categoryIds"
                        >
                            <Select
                                mode="multiple"
                                placeholder="Sélectionner des catégories"
                                onChange={value => setSection(prevSection => ({ ...prevSection, categoryIds: value }))}
                            >
                                {categories.map(category => (
                                    <Option key={category._id} value={category._id}>
                                        {category.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Lien vers la Catégorie"
                            name="categoryLink"
                        >
                            <Input onChange={handleInputChange} />
                            <Button type="link" onClick={() => handleLinkClick(`/category/${section.categoryLink}`)}>
                                Aller à la Catégorie
                            </Button>
                        </Form.Item>
                    </>
                ) : (
                    <>
                        <Form.Item
                            label="Sous-catégories"
                            name="subcategoryIds"
                        >
                            <Select
                                mode="multiple"
                                placeholder="Sélectionner des sous-catégories"
                                onChange={value => setSection(prevSection => ({ ...prevSection, subcategoryIds: value }))}
                            >
                                {categories.flatMap(category =>
                                    category.subcategories.map(subcategory => (
                                        <Option key={subcategory._id} value={subcategory._id}>
                                            {subcategory.name}
                                        </Option>
                                    ))
                                )}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Lien vers la Sous-Catégorie"
                            name="subcategoryLink"
                        >
                            <Input onChange={handleInputChange} />
                            <Button type="link" onClick={() => handleLinkClick(`/subcategory/${section.subcategoryLink}`)}>
                                Aller à la Sous-Catégorie
                            </Button>
                        </Form.Item>
                    </>
                )}

                <Form.Item
                    label="Ordre"
                    name="order"
                    rules={[{ required: true, message: 'Veuillez entrer l\'ordre' }]}
                >
                    <Input type="number" />
                </Form.Item>

                <Form.Item
                    label="Images"
                    name="images"
                >
                   <Upload
    listType="picture-card"
    multiple
    showUploadList={false}
    customRequest={handleImageChange} // Assurez-vous que cette fonction est bien définie
    accept="image/*"
>
    <Button icon={<UploadOutlined />}>Téléverser</Button>
</Upload>

                    <div className="image-previews">
                        {imagePreviews.map((src, index) => (
                            <div key={index} className="image-preview">
                                <div className="image-container">
                                    <Image
                                        src={src}
                                        alt={`Prévisualisation de l'image ${index + 1}`}
                                        style={{ 
                                            width: section.imageSizes[index]?.width || 'auto', 
                                            height: section.imageSizes[index]?.height || 'auto' 
                                        }}
                                    />
                                    <div className="image-actions">
                                        <Input
                                            type="number"
                                            placeholder="Largeur"
                                            value={section.imageSizes[index]?.width || ''}
                                            onChange={e => handleImageSizeChange(index, 'width', e.target.value)}
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Hauteur"
                                            value={section.imageSizes[index]?.height || ''}
                                            onChange={e => handleImageSizeChange(index, 'height', e.target.value)}
                                        />
                                        <Button
                                            type="default"
                                            icon={<ReloadOutlined />}
                                            onClick={() => handleImageUpdate(index)}
                                        >
                                            Actualiser
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Ajouter la Section
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default HomepageAddSection;
