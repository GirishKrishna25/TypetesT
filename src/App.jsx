import { TypingBox } from "./components/TypingBox";
import { GlobalStyles } from "./styles/global";

function App() {
  return (
    <div className="canvas">
      <GlobalStyles />
      <h1 style={{ textAlign: "center" }}>TypetesT</h1>
      <TypingBox />
      <h1 style={{ textAlign: "center" }}>footer</h1>
    </div>
  );
}

export default App;
