import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/user" element={<UserPage />}></Route>
    </Routes>
  );
}

export default App;
