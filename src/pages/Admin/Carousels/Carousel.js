import React, { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { carouselService } from '../../../_services/carousel.service';
import './Carousel.css';

const Carousel = () => {
    const [carousels, setCarousels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCarousels = async () => {
            try {
                const data = await carouselService.getCarousel();
                if (data && data.carousels) {
                    setCarousels(data.carousels);
                }
            } catch (error) {
                message.error('Erreur lors de la récupération des carousels');
                console.error('Erreur lors de la récupération des carousels :', error);
            }
        };

        fetchCarousels();
    }, []);

    const handleView = (id) => {
        navigate(`/carousel/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/edit-carousel/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await carouselService.deleteCarousel(id);
            message.success('Carousel supprimé avec succès');
            setCarousels(carousels.filter(carousel => carousel.id !== id));
        } catch (error) {
            message.error('Erreur lors de la suppression du carousel');
            console.error('Erreur lors de la suppression du carousel :', error);
        }
    };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text, record) => (
                <img
                    src={`http://localhost:4000/uploads/${record.images[0]}`}
                    alt={record.title}
                    style={{ width: '100px', height: 'auto' }}
                />
            ),
        },
        {
            title: 'Titre',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text) => (
                <div style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {text}
                </div>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <div>
                    <Button onClick={() => handleView(record.id)} style={{ marginRight: 8 }}>Voir</Button>
                    <Button onClick={() => handleEdit(record.id)} style={{ marginRight: 8 }}>Modifier</Button>
                    <Button onClick={() => handleDelete(record.id)} danger>Supprimer</Button>
                </div>
            ),
        },
    ];

    return (
        <div className="carousel-list-container">
            <h1>Mes Carousels</h1>
            <Table
                dataSource={carousels}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
};

export default Carousel;
