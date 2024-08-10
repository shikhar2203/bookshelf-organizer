import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Bookshelf from './pages/Bookshelf';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookshelf" element={<Bookshelf />} />
        </Routes>
</Router>
    </div>
  );
}
export default App;