import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './routes/Home';
import Search from './routes/Search';
import Tv from './routes/Tv';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'movies/:id'} element={< Home />} />
        <Route path={'/tv'} element={<Tv />} />
        <Route path={'/tv/:id'} element={<Tv />} />
        <Route path={'/search'} element={<Search />} />
        <Route path={'/search/:id'} element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
