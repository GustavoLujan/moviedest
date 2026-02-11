import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';

const queryClient = new QueryClient();

const AnimatedRoutes = ({ searchQuery }) => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home searchQuery={searchQuery} />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="*" element={<Home searchQuery={searchQuery} />} />
    </Routes>
  );
};

function App() {
  const [searchQuery, setSearchQuery] = useState("");

return (
    <QueryClientProvider client={queryClient}>
      {/* El basename solo debe ser el nombre del repo entre barras */}
      <BrowserRouter basename="/moviedest">
        <Navbar onSearch={setSearchQuery} />
        <AnimatedRoutes searchQuery={searchQuery} />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;