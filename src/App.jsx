import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import Home from './components/Home';
import MovieInfo from './components/MovieInfo';
import Register from './components/Register';
import Login from './components/Login';
import WatchList from './components/WatchList';

const App = () => {
    return (
        <BrowserRouter className="app">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/info/:id' element={<MovieInfo />} />
                <Route path='/signup' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/watchlist' element={<WatchList />} />
            </Routes>
            <Toaster />
        </BrowserRouter>
    );
}

export default App;
