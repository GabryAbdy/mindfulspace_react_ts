import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Sounds from "./pages/Sounds";
import Header from "./components/layout/Header";
import PageWrapper from "./components/layout/PageWrapper";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sounds" element={<Sounds />} />
            <Route path="*" element={<h1>Error 404 Not Found</h1>} />
          </Routes>
        </PageWrapper>
      </main>
      <Footer />
    </div>
  );
}

export default App;
