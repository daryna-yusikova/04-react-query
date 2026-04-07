import axios from "axios";
import type { Movie } from "../types/movie";
import toast from "react-hot-toast";
interface MovieResponse{
    results: Movie[]
    total_pages: number
    page: number
}
export default async function fetchMovies(searchQuery: string, page: number): Promise<MovieResponse | null> {
    try {
        const searchResult = await axios.get<MovieResponse>('https://api.themoviedb.org/3/search/movie', {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            }, params: {
                query: searchQuery,
                page: page
            }
        })
        if (searchResult.data.results.length === 0) {
            return null;
        };
        return searchResult.data
    } catch (error){ toast.error('something went wrong'); throw error}
}
