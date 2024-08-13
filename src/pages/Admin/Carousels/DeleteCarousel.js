import React, { useState, useEffect } from 'react';
import { List, Button, message, Modal, Image } from 'antd';
import { carouselService } from '../../../_services/carousel.service';

const DeleteCarousel = () => {
    const [carousels, setCarousels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [selectedCarousel, setSelectedCarousel] = useState(null);

    useEffect(() => {
        fetchCarousels();
    }, []);

    const fetchCarousels = async () => {
        try {
            setLoading(true);
            const response = await carouselService.getCarousel(); // Assurez-vous que getCarousel() est correct
            setCarousels(response.carousels); // Assurez-vous que la structure de la réponse est correcte
        } catch (error) {
            message.error('Erreur lors de la récupération des carousels');
            console.error('Erreur lors de la récupération des carousels:', error);
        } finally {
            setLoading(false);
        }
    };

    const showModal = (carousel) => {
        setSelectedCarousel(carousel);
        setVisible(true);
    };

    const handleDelete = async () => {
        if (!selectedCarousel) return;

        try {
            await carouselService.deleteCarousel(selectedCarousel._id); // Assurez-vous que deleteCarousel() est correct
            message.success('Carousel supprimé avec succès');
            fetchCarousels();
            setVisible(false);
            setSelectedCarousel(null);
        } catch (error) {
            message.error('Erreur lors de la suppression du carousel');
            console.error('Erreur lors de la suppression du carousel:', error);
        }
    };

    const handleCancel = () => {
        setVisible(false);
        setSelectedCarousel(null);
    };

    return (
        <div className="delete-carousel-container">
            <h1>Supprimer un Carousel</h1>
            <List
                loading={loading}
                itemLayout="horizontal"
                dataSource={carousels}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Button danger onClick={() => showModal(item)}>Supprimer</Button>
                        ]}
                    >
                        <List.Item.Meta
                            title={item.title}
                            description={item.description}
                        />
                        <div className="carousel-images">
                            {item.images.map((image, index) => (
                                <Image
                                    key={index}
                                    width={100} // Taille de prévisualisation des images
                                    src={`/path-to-your-images/${image}`} // Assurez-vous que le chemin d'accès est correct
                                    alt={`Carousel Image ${index + 1}`}
                                />
                            ))}
                        </div>
                    </List.Item>
                )}
            />
            <Modal
                title="Confirmer la suppression"
                visible={visible}
                onOk={handleDelete}
                onCancel={handleCancel}
                okText="Supprimer"
                cancelText="Annuler"
            >
                <p>Êtes-vous sûr de vouloir supprimer ce carousel ?</p>
                {selectedCarousel && (
                    <div className="carousel-images-preview">
                        {selectedCarousel.images.map((image, index) => (
                            <Image
                                key={index}
                                width={200} // Taille de prévisualisation dans le modal
                                src={`/path-to-your-images/${image}`} // Assurez-vous que le chemin d'accès est correct
                                alt={`Carousel Image ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default DeleteCarousel;
