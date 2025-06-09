import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Dashboard/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error404 from "./pages/Error/Error404";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
