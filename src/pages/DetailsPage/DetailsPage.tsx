import { useNavigate, useParams } from 'react-router-dom';
import './DetailsPage.scss';
import { useEffect, useState } from 'react';
import { API_KEY, URL, URL_PHOTO } from '../../config/api';
import axios from 'axios';
import { Country, Details, Genres } from '../../types/types';
import { Text, Image, Group, Button } from '@mantine/core';
import MovieCard from '../../components/Card';

const DetailsPage = () => {
    const [movie, setMovie] = useState<Details>()
    const [countries, setCountries] = useState<Country[]>([])
    const [similar, setSimilar] = useState([]);
    const [genres, setGenres] = useState<Genres[]>([]);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `${URL}/movie/${id}`,
            params: { language: 'en-US' },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`
            }
        };
        axios
            .request(options)
            .then((response) => {
                setMovie(response.data)
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `${URL}/movie/${id}/similar`,
            params: { language: 'en-US' },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`
            }
        };
        axios
            .request(options)
            .then((response) => {
                setSimilar(response.data.results)
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `${URL}/configuration/countries`,
            params: { language: 'en-US' },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`
            }
        };
        axios
            .request(options)
            .then((response) => {
                setCountries(response.data)
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

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

    return (
        <div className='details'>
            <div className='details-info'>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
                    <button onClick={() => navigate('/')}>← На главную </button>
                    <button onClick={() => navigate(-1)}>← Назад</button>
                </div>
                <div>
                    <Group>
                        <Text size='lg' fw={700}>{movie && (Math.round(movie.vote_average * 10) / 10).toFixed(1)}</Text>
                        <Text size='lg' fw={700}>{movie?.title}</Text>
                    </Group>

                    <Group>
                        <Text size='sm' mt='sm' c='dimmed'>
                            {movie?.status}
                        </Text>
                    </Group>

                    <Text size='md' mt='lg'>{movie?.overview}</Text>

                    <Text size='sm' mt='xl'><b>Runtime: </b>{movie?.runtime} min</Text>
                    <Text size='sm'><b>Popularity: </b>{movie?.popularity}</Text>
                    <Text size='sm'><b>Release date: </b>
                        {movie && new Date(movie.release_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </Text>
                    <Text size='sm'><b>Genre(s): </b>
                        {movie?.genres.map(item => `${item.name}, `)}
                    </Text>
                    <Text size='sm'><b>Country: </b>
                        {movie?.origin_country.map(item => (
                            countries.find(country =>
                                country?.iso_3166_1 === item
                            )?.english_name
                        ))}
                    </Text>
                </div>
                <Image
                    src={`${URL_PHOTO}${movie?.backdrop_path}`}
                    height='auto'
                />
            </div>
            <div>
                <Text fw={700} mb='md' size='lg'>Похожие</Text>
                <div className='details-similar'>
                    {
                        similar.map(movie => (
                            <MovieCard movie={movie} genres={genres} height='300px' />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default DetailsPage;