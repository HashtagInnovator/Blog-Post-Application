
// App.js
import './App.css';
import Navbar from './Components/Navbar';
import Posts from './Components/Posts';
import Description from './Components/Description';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginPage from './Components/LoginPage';
import Signup from './Components/Signup';
import AddPosts from './Components/AddPosts';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container my-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/desc/:code" element={<Description />} />
            <Route path="/posts/" element={<Posts />} /> {/* Updated route */}
            <Route path="/about" element={<About />} />
            <Route path='/login' element={<LoginPage/>}/> {/* Pass id as a parameter */}
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/add-posts/:postId/:edit' element={<AddPosts />} />

            <Route path='/add-posts' element={<AddPosts/>}/>
            
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

function Home() {
  return <h1>Welcome to the Blog Post Application</h1>;
}

function About() {
  return <h1>We are Working on this part....</h1>;
}

export default App;
