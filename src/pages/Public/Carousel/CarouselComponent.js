import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { carouselService } from '../../../_services/carousel.service';
import DOMPurify from 'dompurify';
import './CarouselComponent.css';

const CarouselComponent = () => {
    const [carousels, setCarousels] = useState([]);

    useEffect(() => {
        const fetchCarousels = async () => {
            try {
                const data = await carouselService.getCarousel();
                if (data && data.carousels) {
                    setCarousels(data.carousels);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des carousels :', error);
            }
        };

        fetchCarousels();
    }, []);

    return (
        <div className="carousel-container">
            {carousels.length > 0 && (
                <Carousel autoplay>
                    {carousels.map((carousel, index) => (
                        <div key={index} className="carousel-slide">
                            <div className="carousel-content">
                                <div
                                    className="carousel-title"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(carousel.title) }}
                                />
                                <div
                                    className="carousel-description"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(carousel.description) }}
                                />
                            </div>
                            <div className="carousel-images">
                                {carousel.images.map((image, idx) => (
                                    <img
                                        key={idx}
                                        src={`http://localhost:4000/uploads/${image.filename}`}
                                        alt={`Carousel ${index} - Image ${idx}`}
                                        style={{ 
                                            width: image.width ? `${image.width}px` : 'auto', 
                                            height: image.height ? `${image.height}px` : 'auto' 
                                        }}
                                        className="carousel-image"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </Carousel>
            )}
        </div>
    );
};

export default CarouselComponent;
