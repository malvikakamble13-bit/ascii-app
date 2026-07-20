import ASCIIText from './ASCIIText';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#000' }}>
      <ASCIIText 
        text="Hey!" 
        enableWaves={true} 
        asciiFontSize={8} 
      />
    </div>
  );
}

export default App;