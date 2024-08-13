import React, { useEffect, useState } from 'react';
import { Form, Button, Upload, message, Input } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { carouselService } from '../../../_services/carousel.service';
import { useParams } from 'react-router-dom'; // Importez useParams

const { Dragger } = Upload;

const EditCarousel = () => {
    const { id: carouselId } = useParams(); // Utilisez useParams pour obtenir les paramètres d'URL
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [imageSrc, setImageSrc] = useState('');
    const [editorData, setEditorData] = useState('');

    useEffect(() => {
        const fetchCarousel = async () => {
            try {
                const data = await carouselService.getCarouselById(carouselId);
                if (data) {
                    form.setFieldsValue({
                        title: data.title,
                        description: data.description,
                    });
                    setEditorData(data.description);
                    // Pour la première image si vous avez seulement une image
                    if (data.images && data.images.length > 0) {
                        setFileList([{ uid: '-1', name: 'image.png', status: 'done', url: `http://localhost:4000/uploads/${data.images[0]}` }]);
                        setImageSrc(`http://localhost:4000/uploads/${data.images[0]}`);
                    }
                }
            } catch (error) {
                console.error('Erreur lors de la récupération du carousel :', error);
            }
        };

        fetchCarousel();
    }, [carouselId, form]);

    const handleUpdate = async (values) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', editorData); // Texte stylisé

        fileList.forEach(file => formData.append('images', file.originFileObj));

        try {
            await carouselService.updateCarousel(carouselId, formData);
            message.success('Carousel mis à jour avec succès');
        } catch (error) {
            message.error('Erreur lors de la mise à jour du carousel');
            console.error('Erreur lors de la mise à jour du carousel:', error);
        }
    };

    const handleChange = (info) => {
        setFileList(info.fileList);
        if (info.fileList.length > 0) {
            setImageSrc(URL.createObjectURL(info.fileList[0].originFileObj));
        }
    };

    return (
        <div className="edit-carousel-container">
            <h1>Modifier un Carousel</h1>
            <Form form={form} onFinish={handleUpdate} layout="vertical">
                <Form.Item
                    name="title"
                    label="Titre"
                    rules={[{ required: true, message: 'Veuillez entrer le titre du carousel' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="images"
                    label="Images"
                    valuePropName="fileList"
                    getValueFromEvent={({ fileList }) => fileList || []}
                >
                    <Dragger
                        name="files"
                        multiple={false}
                        onChange={handleChange}
                        accept="image/*"
                        fileList={fileList}
                        customRequest={({ file, onSuccess }) => {
                            setTimeout(() => {
                                onSuccess(null, file);
                            }, 0);
                        }}
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Cliquez ou faites glisser les fichiers ici pour les télécharger</p>
                    </Dragger>
                </Form.Item>

                {imageSrc && (
                    <div className="image-preview">
                        <img src={imageSrc} alt="Carousel" />
                    </div>
                )}

                <Form.Item
                    name="description"
                    label="Description"
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

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Mettre à jour le Carousel
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditCarousel;
