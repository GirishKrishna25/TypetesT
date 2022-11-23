import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import { Routes, Route } from "react-router-dom";
import Alerts from "./components/Alerts";

function App() {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Alerts />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/user" element={<UserPage />}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
