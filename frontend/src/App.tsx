import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Dashboard/Home";

const App = () => {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
};

export default App;
