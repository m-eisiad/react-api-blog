import { Route, Routes } from 'react-router';
import Header from './Components/Header'
import Footer from './Components/Footer'
import BlogPosts from './Components/BlogPosts';
import Contact from './Components/Contact';
import Post from './Components/Post';
import { useTheme } from './Components/ThemeContext'
import './App.css';

function App() {
  const { theme } = useTheme();
  return (
    <div class={theme}>
      <Header/>

      <Routes>
        <Route path="/" element={<BlogPosts/>}/>
        <Route path="/post/:id" element={<Post/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;

