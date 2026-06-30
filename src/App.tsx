import { Route, Routes } from "react-router";

import Home from "./pages/Home";
import Meditate from "./pages/Meditate";
import Sounds from "./pages/Sounds";
import Settings from "./pages/Settings";
import Header from "./components/layout/Header";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meditate" element={<Meditate />} />
        <Route path="/sounds" element={<Sounds />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<h1>Error 404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
