import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Image } from 'antd';
import { InboxOutlined, UploadOutlined, ReloadOutlined } from '@ant-design/icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { carouselService } from '../../../_services/carousel.service';
import './AddCarousel.css';

const { Dragger } = Upload;

const AddCarousel = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [imageSizes, setImageSizes] = useState([]);
    const [editorData, setEditorData] = useState('');

    // Fonction pour charger les images
    const handleImageLoad = (file, onSuccess) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.src = url;

        img.onload = () => {
            setImageSizes(prev => [
                ...prev,
                { width: img.width, height: img.height }
            ]);
            URL.revokeObjectURL(url); // Nettoyez l'URL une fois l'image chargée
            onSuccess(null, file);
        };

        img.onerror = () => {
            message.error('Erreur lors du chargement de l\'image.');
            URL.revokeObjectURL(url);
            onSuccess('Erreur lors du chargement de l\'image.', file);
        };
    };

    // Fonction pour gérer les changements d'images
    const handleImageChange = ({ fileList }) => {
        const files = fileList.map(file => file.originFileObj);
        const previews = files.map(file => URL.createObjectURL(file));

        setFileList(fileList);
        setImagePreviews(previews);
    };

    // Fonction pour soumettre le formulaire
    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', editorData);

        fileList.forEach((file, index) => {
            formData.append('images', file.originFileObj);
            formData.append(`width_${file.name}`, imageSizes[index]?.width || '');
            formData.append(`height_${file.name}`, imageSizes[index]?.height || '');
        });

        try {
            await carouselService.addCarousel(formData);
            message.success('Carousel ajouté avec succès');
            form.resetFields();
            setFileList([]);
            setImagePreviews([]);
            setImageSizes([]);
            setEditorData('');
        } catch (error) {
            message.error('Erreur lors de l\'ajout du carousel');
            console.error('Erreur lors de l\'ajout du carousel:', error);
        }
    };

    // Fonction pour gérer les changements de taille d'image
    const handleImageSizeChange = (index, dimension, value) => {
        const newImageSizes = [...imageSizes];
        newImageSizes[index] = {
            ...newImageSizes[index],
            [dimension]: parseInt(value) || 0
        };
        setImageSizes(newImageSizes);
    };

    return (
        <div className="add-carousel-container">
            <h1>Ajouter un Carousel</h1>

            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item
                    name="title"
                    label="Titre"
                    rules={[{ required: true, message: 'Veuillez entrer le titre du carousel' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Veuillez entrer une description' }]}
                >
                    <CKEditor
                        editor={ClassicEditor}
                        data={editorData}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setEditorData(data);
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name="images"
                    label="Images"
                >
                    <Dragger
                        name="files"
                        multiple
                        showUploadList={false}
                        customRequest={({ file, onSuccess }) => handleImageLoad(file, onSuccess)}
                        onChange={handleImageChange}
                        accept="image/*"
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Cliquez ou faites glisser les fichiers ici pour les télécharger</p>
                        <p className="ant-upload-hint">Vous pouvez télécharger plusieurs fichiers à la fois</p>
                    </Dragger>

                    <div className="image-previews">
                        {imagePreviews.map((src, index) => (
                            <div key={index} className="image-preview">
                                <Image
                                    src={src}
                                    alt={`Prévisualisation ${index + 1}`}
                                    style={{ 
                                        width: imageSizes[index]?.width || 'auto', 
                                        height: imageSizes[index]?.height || 'auto' 
                                    }}
                                />
                                <div className="image-actions">
                                    <Input
                                        type="number"
                                        placeholder="Largeur"
                                        value={imageSizes[index]?.width || ''}
                                        onChange={e => handleImageSizeChange(index, 'width', e.target.value)}
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Hauteur"
                                        value={imageSizes[index]?.height || ''}
                                        onChange={e => handleImageSizeChange(index, 'height', e.target.value)}
                                    />
                                    <Button
                                        type="default"
                                        icon={<ReloadOutlined />}
                                        onClick={() => handleImageSizeChange(index, 'width', imageSizes[index]?.width || '')}
                                    >
                                        Actualiser
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Ajouter le Carousel
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddCarousel;
