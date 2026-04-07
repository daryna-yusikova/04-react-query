import toast from 'react-hot-toast';
import css from './SearchBar.module.css'
interface SearchBarProps {
    onSubmit: (submitQuery:string) => void
}




export default function SearchBar({ onSubmit }: SearchBarProps) {
  function handleSubmit(formData: FormData) {
    const submitQuery = (formData.get('query') as string).trim()

    if (!submitQuery) {
      toast.error('Please enter your search query.')
      return
    }

    onSubmit(submitQuery)
  }


    return <header className={css.header}>
  <div className={css.container}>
    <a
      className={css.link}
      href="https://www.themoviedb.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by TMDB
    </a>
    <form action={handleSubmit} className={css.form}>
      <input
        className={css.input}
        type="text"
        name="query"
        autoComplete="off"
        placeholder="Search movies..."
        autoFocus
      />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  </div>
</header>

}