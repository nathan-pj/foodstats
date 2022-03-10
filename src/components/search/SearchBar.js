import "./SearchBar.css";

import LunchDiningTwoToneIcon from "@mui/icons-material/LunchDiningTwoTone";
import { useEffect, useState } from "react";
import BarCharts from "../bar charts/BarCharts.js";
import Loading from "../loading/Loading";
import ServingUnits from "./ServingUnits";
import InvalidFood from "../invalid food/InvalidFood";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [responseData, setResponseData] = useState({});
  const [loaded, setLoaded] = useState("initial");
  const [measurement, setMeasurement] = useState(100);
  const [units, setUnits] = useState("g");
  const [searchTimeStamp, setSearchTimeStamp] = useState(Date.now());

  const APP_ID = process.env.REACT_APP_ID;
  const APP_KEY = process.env.REACT_APP_API_KEY;

  function handleSubmit(e) {
    e.preventDefault();

    if (input.length !== 0) {
      setNewSearch(input);
      setSearchTimeStamp(Date.now());
    } else {
      setNewSearch("");
      console.log("invalid");
    }
  }
  function handleKeypress(e) {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSubmit();
    }
  }
  useEffect(() => {
    if (newSearch.length !== 0) {
      setLoaded("loading");
      fetch(
        `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&nutrition-type=logging&ingr=${
          newSearch + " " + measurement + units
        }`
      )
        .then((res) => {
          console.log(res.url);
          return res.json();
        })
        .then((response) => {
          setResponseData(response);
          console.log(response);
          setLoaded("loaded");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [newSearch, searchTimeStamp]);
  console.log(newSearch);
  return (
    <div>
      <div
        // className={newSearch.length === 0 ? "search-bar" : "search-bar-higher"}
        className={
          newSearch.length === 0 ? "search-bar" : "search-bar__searched"
        }
      >
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <input
            className="bar"
            type="text"
            placeholder="food"
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeypress}
          />

          <input
            className="measurement-bar"
            type="text"
            placeholder="amount"
            value={measurement}
            onChange={(e) => setMeasurement(e.target.value)}
          />
          <div className="units">
            <ServingUnits units={units} setUnits={setUnits} />
          </div>
          <button type="submit" className="search-button">
            <LunchDiningTwoToneIcon className="hamburger-icon" />
          </button>
        </form>
      </div>
      {loaded === "initial" ? null : loaded === "loading" ? (
        <Loading />
      ) : responseData.totalWeight === 0 && responseData.calories === 0 ? (
        <InvalidFood newSearch={newSearch} />
      ) : (
        <BarCharts
          responseData={responseData}
          newSearch={newSearch}
          units={units}
          measurement={measurement}
        />
      )}
    </div>
  );
}
