import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from '../context/store/AuthGlobal';
import baseURL from '../assets/common/baseUrl';

var context = null

const jwt = async () => {
    context = useContext(AuthGlobal)
    return await AsyncStorage.getItem("jwt");
}

// Get Popular Movies
export const getUserProfile = async () =>{
    const resp = await axios.get(`${baseURL}${context.stateUser.userRole}/${context.stateUser.user.userId}`, {
        headers: { Authorization: `Bearer ${res}` },
    });
    return resp.data;
}

// Get Upcoming Movies
export const getUpcomingMovies = async () =>{
    const resp = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
    return resp.data.results;
}

// Get Popular TV
export const getPopularTv = async () =>{
    const resp = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
    return resp.data.results;
}

// Get Family Movies
export const getFamilyMovies = async () => {
    const resp = await axios.get(`${apiUrl}/discover/movie?${apiKey}&with_genres=10751`);
    return resp.data.results;
}

// Get Documentries
export const getDocumentries = async () => {
    const resp = await axios.get(`${apiUrl}/discover/movie?${apiKey}&with_genres=99`);
    return resp.data.results;
}

// Get Documentries
export const getMovie = async (id) => {
    const resp = await axios.get(`${apiUrl}/movie/${id}?${apiKey}`);
    return resp.data;
}