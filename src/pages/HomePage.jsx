import { TypingBox } from "../components/TypingBox";
import { GlobalStyles } from "../styles/global";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ThemeProvider } from "styled-components";
import { useTheme } from "../context/ThemeContext";

const HomePage = () => {
  // we are taking theme from contextApi and passing it to the GlobalStyles through ThemeProvider which is a styled-components component.
  const { theme } = useTheme();
  // console.log(auth);

  return (
    <ThemeProvider theme={theme}>
      <div className="canvas">
        <GlobalStyles />
        <Header />
        <TypingBox />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default HomePage;
