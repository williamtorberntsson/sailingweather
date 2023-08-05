import { useEffect, useState } from "react";
import WeatherWidget from "./components/WeatherWidget";
import FetchData from "./functions/FetchData";
import * as myConstants from "./constants";
import "./assets/css/App.css";


function App() {

    const [smhiData, setSmhiData] = useState();

    useEffect(() => {
        updateSMHIdata()
    }, []);

    const updateSMHIdata = () => {
        FetchData(myConstants.ROXEN)
            .then(json => {
                setSmhiData(json);
            })
    }

    return (
        <div className="App">
            <a className="GitHub" target="_blank" rel="noopener noreferrer" href="https://github.com/williamtorberntsson/roxenweather">Visit my GitHub to contribute!</a>
            <h2 className="Beta">Currently in Beta!</h2>
            <button className="UpdateButton" onClick={updateSMHIdata}>Klicka för att uppdatera!</button>
            <h1 className="Title">Vädret på Roxen!</h1>
            <WeatherWidget data={smhiData} daysAheadToPredict={3} />
        </div>
    );
}

export default App;
  