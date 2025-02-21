import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Yemek from './Yemek';
import Dirink from './Dirink.js';
import Home from './Home.js';
import Elektronik from './Elektronik';

export default function App() {
    const [selectedCategory, setSelectedCategory] = useState('Anasayfa');

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    return (
        <Router>
            <div className='yemek-uygulamasi'>
                <Routes>
                    <Route path="/Yemek" element={<Yemek onSelectCategory={handleCategorySelect} />} />
                    <Route path="/Home" element={<Home onSelectCategory={handleCategorySelect} />} />
                    <Route path="/Elektronik" element={<Elektronik onSelectCategory={handleCategorySelect} />} />
                    <Route path="/Dirink" element={<Dirink onSelectCategory={handleCategorySelect} />} />
                    <Route path="/" element={<Navigate to="/Home" />} />
                    <Route path="*" element={<Home onSelectCategory={handleCategorySelect} />} />
                </Routes>
            </div>
        </Router>
    );
}






