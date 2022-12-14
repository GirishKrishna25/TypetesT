import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Alert from "./components/Alerts";
import ComparePage from "./pages/ComparePage";
import { useTheme } from "./context/ThemeContext";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import { GlobalStyles } from "./styles/global";

function App() {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Alert />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/user" element={<UserPage />}></Route>
        <Route path="/compare/:username" element={<ComparePage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
