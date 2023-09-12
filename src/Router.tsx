import {Routes, Route} from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import MainPage from './pages/MainPage'
import SearchBooksPage from './pages/SearchBooksPage'
import BooksPage from './pages/BooksPage'
function Router() {
  return (
    <Routes>
      <Route path={'/books/'} element={<MainPage/>}></Route>
      <Route path={'/searchBooks/:keyWord'} element={<SearchBooksPage/>}></Route>
      <Route path="/books/:id" element={<BooksPage />} />
      <Route path={'/books/*'} element={<ErrorPage/>}></Route>
    </Routes>
  )
}

export default Router
