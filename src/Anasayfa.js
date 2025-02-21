import React, { useState, useEffect } from 'react';
import './App.css';
export default function Anasayfa() {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % 4);
            console.log(`Current Slide: ${currentSlide}`);
        }, 3000);

        return () => clearInterval(slideInterval);
    }, []);

    useEffect(() => {
        console.log(`Slide changed: ${currentSlide}`);
    }, [currentSlide]);
    return (
        <div>
            <div className='slider'>
          <div className='slides' style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className='slide'>
              <img src="https://yalcinmarket.com.tr/wp-content/uploads/2025/01/Ocak-ayi-meyve.jpeg" alt="Image 1" />
            </div>
            <div className='slide'>
              <img src="https://www.doganinsesiturkiye.com/resim/upload/sb1781.jpg" alt="Image 2" />
            </div>
            <div className='slide'>
              <img src="https://www.bobajoy.com.tr/data/haber/QelOWQHhi1buj8dP.jpg" alt="Image 3" />
            </div>
            <div className='slide'>
              <img src="https://www.finanscisigorta.com.tr/files/ticari_sigortalar./elektronic_cihaz_sigortasi.png" alt="Image 4" />
            </div>
          </div>
        </div>
        </div>
    )
}
