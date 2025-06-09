import logo from './logo.svg';
import './App.css';
import GameBoard from "./GameBoard";

function App() {
  return (
    <div className="App" style={{
      minHeight: '100vh',
      backgroundImage: 'url(https://images.unsplash.com/photo-1612257998531-70e0d0a15f6d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <header className="App-header">
        <GameBoard />

      </header>
    </div>
  );
}

export default App;
