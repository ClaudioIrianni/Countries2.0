import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./app.css";
import Header from "./components/Header";
import Country from "./components/Country";
import SearchIcon from "@mui/icons-material/Search";
import CountryDetails from "./components/CountryDetails";
import { Routes, Route } from "react-router-dom";

function App() {
  //Toggle darkmode
  const [darkMode, setDarkMode] = useState(false);
  //Fetch data
  const [countries, setCountries] = useState([]);
  //No Countrie Found if 404 status
  const noCountries = countries.status || countries.message;
  //Search Country
  const countriesInputRef = useRef();
  const regionRef = useRef();
  //Navigate to countryDetails
  const navigate = useNavigate()

  //Toggle darkmode
  const switchMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  //fetch data with try/catch
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const fetchData = async () => {
    const response = await fetch("https://restcountries.com/v2/all");
    const data = await response.json();

    if (data.status === 404) {
      setCountries([]);
      return;
    }

    setCountries(data);
  };

  const searchCountries = () => {
    const searchValue = countriesInputRef.current.value;
    if (searchValue.trim()) {
      const fetchSearch = async () => {
        const response = await fetch(
          `https://restcountries.com/v2/name/${searchValue}`
        );
        const data = await response.json();
        setCountries(data);
      };
      try {
        fetchSearch();
      } catch (error) {
        console.log(error);
      }
    } else {
      fetchData();
    }
  };

  const selectRegion = () => {
    const selectValue = regionRef.current.value;

    if (selectValue.trim()) {
      const fetchSelect = async () => {
        const response = await fetch(
          `https://restcountries.com/v2/region/${selectValue}`
        );
        const data = await response.json();

        if (selectValue === "All") {
          try {
            fetchData();
          } catch (error) {
            console.log(error);
          }
          return;
        }
        setCountries(data);
      };

      try {
        fetchSelect();
      } catch (error) {
        console.log(error);
      }
    }
  };

  
  const showDetails = (code) => {
    navigate(`/${code}`);
  };

  return (
    <div className={`app ${darkMode ? "darkMode" : ""}`}>
      <Header onClick={switchMode} darkMode={darkMode} />

      <Routes>
        <Route
          path="/"
          element={
            <div className="app_body">
              <div className="inputs">
                <div className={`search_input ${darkMode ? "darkMode" : ""}`}>
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="Search for a country..."
                    ref={countriesInputRef}
                    onChange={searchCountries}
                  />
                </div>
                <div className={`select_region ${darkMode ? "darkMode" : ""}`}>
                  <select ref={regionRef} onChange={selectRegion}>
                    <option>All</option>
                    <option>Africa</option>
                    <option>Americas</option>
                    <option>Asia</option>
                    <option>Europe</option>
                    <option>Oceania</option>
                  </select>
                </div>
              </div>
              <div className="countries">
                {!noCountries ? (
                  countries.map((country) => (
                    <Country
                      darkMode={darkMode}
                      key={country.alpha3Code}
                      code={country.alpha3Code}
                      name={country.name}
                      capital={country.capital}
                      population={country.population}
                      region={country.region}
                      flag={country.flag}
                      showDetails={showDetails}
                    />
                  ))
                ) : (
                  <p>No countries found...</p>
                )}
              </div>
            </div>
          }
        />
        <Route
          path="/:countryCode"
          element={<CountryDetails darkMode={darkMode} countries={countries}/>}
        />
      </Routes>
    </div>
  );
}

export default App;
