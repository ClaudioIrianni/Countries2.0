import "./app.css";
import Header from "./components/Header";
import Country from "./components/Country";
import SearchIcon from "@mui/icons-material/Search";
import CountryDetails from "./components/CountryDetails";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <div className="app_body">
              <div className="inputs">
                <div className="search_input">
                  <SearchIcon />
                  <input type="text" placeholder="Search for a country..." />
                </div>
                <div className="select_region">
                  <select>
                    <option>All</option>
                    <option>Africa</option>
                    <option>America</option>
                    <option>Asia</option>
                    <option>Europe</option>
                    <option>Oceania</option>
                  </select>
                </div>
              </div>
              <div className="countries">
                <Country />
              </div>
            </div>
          }
        />
        <Route path="country-details" element={<CountryDetails/>} />
      </Routes>
    </div>
  );
}

export default App;
