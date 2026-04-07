import { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import toast, { Toaster } from 'react-hot-toast'
import fetchMovies from '../../services/movieService'
import type { Movie } from '../../types/movie'
import MovieGrid from '../MovieGrid/MovieGrid'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal'

function App() {
  const [moviesList, setMoviesList] = useState<Movie[]>([])
  const [loader, setLoader] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  async function FormHandler(submitQuery: string) {
    setMoviesList([])
    setHasError(false)

    if (submitQuery === '') {
      toast.error('Please enter your search query.')
      return
    }

    setLoader(true)

    try {
      const movies: Movie[] | null = await fetchMovies(submitQuery)

      if (movies === null) {
        setMoviesList([])
        toast.error('No movies found for your request.')
      } else {
        setMoviesList(movies)
      }
    } catch (err) {
      setHasError(true)
    } finally {
      setLoader(false)
    }
  }

  // ✅ головне виправлення
  function movieGridHandler(movie: Movie) {
    setSelectedMovie(movie)
  }

  function closeModalHandler() {
    setSelectedMovie(null)
  }

  return (
    <>
      <Toaster />

      <SearchBar onSubmit={FormHandler} />

      {loader && <Loader />}
      {hasError && <ErrorMessage />}

      {moviesList.length > 0 && (
        <MovieGrid onSelect={movieGridHandler} movies={moviesList} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModalHandler} />
      )}
    </>
  )
}

export default App