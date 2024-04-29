import { Card, Image, Text, TypographyStylesProvider } from "@mantine/core"
import { Genres, Movie } from "../types/types";
import { URL_PHOTO } from "../config/api";
import { useNavigate } from "react-router-dom";


type MovieCardProps = {
    movie: Movie;
    genres: Genres[];
    height: string;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, genres, height }) => {
    const navigate = useNavigate();

    const getGenreName = (genreId: number): string => {
        const genre = genres.find(genre => genre.id === genreId);
        return genre ? genre.name : '';
    };

    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            component="a"
            href={`/${movie.id}`}
            styles={{ root: { minWidth: 200 } }}
        >
            <Card.Section>
                <Image
                    src={`${URL_PHOTO}${movie.poster_path}`}
                    height={height}
                />
            </Card.Section>

            <Text fw={500} mt='md'>{movie.title}</Text>
            <Text size="sm" c="dimmed" mb='md' truncate="end">{movie.genre_ids.map(id => getGenreName(id)).join(', ')}</Text>
            <Text lineClamp={3} component="div" c="dimmed">
                <TypographyStylesProvider>
                    <p>
                        {movie.overview}
                    </p>
                </TypographyStylesProvider>
            </Text>
        </Card>
    )
}

export default MovieCard;