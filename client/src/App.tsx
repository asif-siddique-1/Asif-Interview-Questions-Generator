import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import GeneratePage from "./pages/GeneratePage";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate-questions" element={<GeneratePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
