import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer';
import Navbar from './components/navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Memories from './components/memories';
import Signup from './components/signup';
import Login from './components/login';
import Favorites from './components/favorites';
import Users from './components/users';
import AboutPage from './components/about';
import CurrentUser from './components/current_user';
import Home from './components/home';

const App = () => {
  return (
    <BrowserRouter>
      <div
        style={{
          fontFamily: 'LuminaScript',
        }}
        className="app min-vh-100"
      >
        <header>
          <Navbar />
          <CurrentUser/>
        </header>
        <main className="flex-grow-1 container pb-5 mb-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/memories" element={<Memories />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/users" element={<Users />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  );
};


export default App
