import { useEffect, useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import toast, { Toaster } from 'react-hot-toast'
import fetchMovies from '../../services/movieService'
import type { Movie } from '../../types/movie'
import MovieGrid from '../MovieGrid/MovieGrid'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal'
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Pagination from '../Pagination/Pagination'


function App() {
  const [submitQuery, setSubmitQuery] = useState<string>('')
  const [page, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const { data, isLoading, isError, isFetched } = useQuery({
    queryKey: ["Movies", submitQuery, page],
    queryFn: () => fetchMovies(submitQuery, page),
    enabled: submitQuery !== '',
    placeholderData: keepPreviousData,
  });

  useEffect(() => {

    if ( isFetched &&
      data === null
    ) {
      toast.error('No movies found for your request')
    }
  }, [data,submitQuery])
  




  async function FormHandler(submitQuery: string) {

    if (submitQuery === '') {
      toast.error('Please enter your search query.')
      return
    }
    setSubmitQuery(submitQuery)
    setCurrentPage(1);
  
  }

  //   try {
  //     const movies: Movie[] | null = await fetchMovies(submitQuery)

  //     if (movies === null) {
  //       setMoviesList([])
  //       toast.error('No movies found for your request.')
  //     } else {
  //       setMoviesList(movies)
  //     }
  //   } catch (err) {
  //     setHasError(true)
  //   } finally {
  //     setLoader(false)
  //   }
  // }


    
    
    

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

      {isLoading && !data && <Loader />}
      {isError && <ErrorMessage />}

      {data && data.total_pages > 1 && (
        <Pagination
     totalPages={data.total_pages} page={page} setPage={setCurrentPage}
        />
      )}

      {data?.results && (
        <MovieGrid
          onSelect={movieGridHandler}
          movies={data.results}
        />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={closeModalHandler}
        />
      )}
    </>
  )
}
      
export default App