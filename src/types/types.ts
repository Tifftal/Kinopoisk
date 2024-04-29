export type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export type Genres = {
    id: number;
    name: string;
}

export type Details = {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: any; // Может быть объектом или null, здесь используем any для гибкости
    budget: number;
    genres: { id: number; name: string }[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: { [key: string]: any }[]; // Может быть любым объектом, здесь используем any для гибкости
    production_countries: { iso_3166_1: string; name: string }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
    status: string;
    tagline: string | null;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export type Country = {
    english_name: string;
    iso_3166_1: string;
    native_name: string;
};

