import { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import toast, { Toaster } from 'react-hot-toast'
import fetchMovies from '../../services/movieService'
import type { Movie } from '../../types/movie'
import MovieGrid from '../MovieGrid/MovieGrid'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal'
import Pagination from '../Pagination/Pagination'
import { keepPreviousData, useQuery } from '@tanstack/react-query';


function App() {
  const [submitQuery, setSubmitQuery] = useState<string>('')
  const [page, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["Movies", submitQuery, page,],
    queryFn: () => fetchMovies(submitQuery, page),
     enabled: submitQuery !== '',
    placeholderData: keepPreviousData,
  });

  console.log(data);


  async function FormHandler(submitQuery: string) {

    if (submitQuery === '') {
      toast.error('Please enter your search query.')
      return
    }
    setSubmitQuery(submitQuery)
    setCurrentPage(1);
    
    if (data.results.length === 0) {
  toast.error('No movies found')
}
   
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

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {data && <Pagination totalPages={data.total_pages} page={page} setPage={setCurrentPage} />
      }

      {data && (
        <MovieGrid onSelect={movieGridHandler} movies={data.results} />
      )}


      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModalHandler} />
      )}
    </>
  )
}

export default App