import { useEffect } from "react";
import "./App.css";

import SearchBar from "./components/search/SearchBar";

function App() {
  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  // }, []);
  return (
    <div className="App">
      <SearchBar />
    </div>
  );
}

export default App;
