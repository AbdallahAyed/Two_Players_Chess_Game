import { useChessContext } from "./ChessContext";
import { Pieces } from "./Pieces";

function App() {
  const { player } = useChessContext();

  return (
    <main>
      <div className="info">
        <p id="info-display">Enjoy Playing :)</p>
        <p className="turn">
          It's <span id="player">{player}</span>'s Turn.
        </p>
      </div>
      <div className="container">
        <div id="gameboard">
          <Pieces />
        </div>
        <div className="nums">
          <span>8</span>
          <span>7</span>
          <span>6</span>
          <span>5</span>
          <span>4</span>
          <span>3</span>
          <span>2</span>
          <span>1</span>
        </div>
        <div className="columns">
          <span>A</span>
          <span>B</span>
          <span>C</span>
          <span>D</span>
          <span>E</span>
          <span>F</span>
          <span>G</span>
          <span>H</span>
        </div>
      </div>
      <button onClick={() => location.reload()}>Restart</button>
    </main>
  );
}

export default App;
