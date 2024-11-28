import React, { useState, useEffect } from 'react';

import "./BackgroundSlider.css";
const BackgroundSlider = ({ images, duration = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, duration);

        return () => clearInterval(intervalId);
    }, [images, duration]);

    const backgroundImage = {
        backgroundImage: `url(${images[currentIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'backgroundImage 0.75s ease-out',
    };

    return (
        <div className="background-slider" style={backgroundImage}></div>
    );
};

export default BackgroundSlider;