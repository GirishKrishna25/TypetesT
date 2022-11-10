import { TypingBox } from "./components/TypingBox";
import { GlobalStyles } from "./styles/global";
import randomWords from "random-words";

function App() {
  const words = randomWords(100);

  return (
    <div className="canvas">
      <GlobalStyles />
      <h1 style={{ textAlign: "center" }}>TypetesT</h1>
      <TypingBox words={words} />
      <h1 style={{ textAlign: "center" }}>footer</h1>
    </div>
  );
}

export default App;
