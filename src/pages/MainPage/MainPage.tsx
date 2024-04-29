import { useEffect, useState } from 'react';
import './MainPage.scss';
import axios from 'axios';
import { API_KEY, URL } from '../../config/api';
import MovieCard from '../../components/Card';
import { Pagination } from '@mantine/core';
import { Genres, Movie } from '../../types/types';

const MainPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [genres, setGenres] = useState<Genres[]>([]);
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `${URL}/genre/movie/list`,
            params: { language: 'en' },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`
            }
        };

        axios
            .request(options)
            .then(function (response) {
                setGenres(response.data.genres)
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `${URL}/movie/popular`,
            params: { language: 'en-US', page: page },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`
            }
        };
        axios
            .request(options)
            .then((response) => {
                setMovies(response.data.results)
                setTotalPages(response.data.total_pages)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [page]);

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокрутить страницу вверх с плавным эффектом
    };

    return (
        <div className='main'>
            <div className='main-list'>
                {
                    movies.map((movie, index) => (
                        <MovieCard movie={movie} genres={genres} height='500px'/>
                    ))
                }
            </div>
            <Pagination total={totalPages} value={page} onChange={handleChangePage} />
        </div>
    )
}

export default MainPage;