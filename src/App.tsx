import "./App.css";
import HomePage from "./layouts/HomePage/HomePage";
import Footer from "./layouts/NavbarAndFooter/Footer";
import Navbar from "./layouts/NavbarAndFooter/Navbar";
import SearchBooksPage from "./layouts/SearchBooksPage/SearchBooksPage";

function App() {
  return (
    <>
      <Navbar />
      {/* <HomePage /> */}
      <SearchBooksPage />
      <Footer />
    </>
  );
}

export default App;
