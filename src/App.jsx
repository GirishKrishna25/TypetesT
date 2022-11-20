import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import { Routes, Route } from "react-router-dom";
import Alerts from "./components/Alerts";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/user" element={<UserPage />}></Route>
      </Routes>
      <Alerts />
    </>
  );
}

export default App;
