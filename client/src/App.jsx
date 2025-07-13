import BlogTitles from './pages/BlogTitles'
import ReviewResume from './pages/ReviewResume'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Layout from './pages/Layout'
import WriteArticle from './pages/WriteArticle'
import { Route, Routes } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import NotFound from './pages/NotFound'

const App = () => {


  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/ai' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='write-article' element={<WriteArticle/>}/>
          <Route path='blog-titles' element={<BlogTitles/>}/>
          <Route path='review-resume' element={<ReviewResume/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App