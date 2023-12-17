import './App.css';
import Navbar from './Components/Navbar';
import ImageCarousel from './Components/ImageCarousel';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='text'>
        <h1>Featured Products</h1>
        <h2>Explore and Discover a variety of Products</h2>
      </div>
      <ImageCarousel />
    </div>
  );
}

export default App;
