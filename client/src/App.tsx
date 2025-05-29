import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./components/HomePage";
import GeneratePage from "./components/GeneratePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate-questions" element={<GeneratePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
