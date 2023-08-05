import { useEffect, useState, useRef } from "react";
import WeatherWidget from "./components/WeatherWidget";
import FetchData from "./functions/FetchData";
import * as myConstants from "./constants";
import "./assets/css/App.css";


function App() {
    // List of available locations to swap between
    const locationList = [myConstants.ROXEN, myConstants.RENGEN];
    let locationIndex = useRef(0);

    const [smhiData, setSmhiData] = useState();
    const [location, setLocation] = useState(locationList[locationIndex.current]);


    useEffect(() => {
        updateSMHIdata(location[1]);
    }, [location]);

    const updateSMHIdata = (url) => {
        console.log("Fetch data!");
        FetchData(url)
            .then(json => {
                setSmhiData(json);
            })
    }

    const switchLocation = () => {
        locationIndex.current = (locationIndex.current + 1) % locationList.length;
        setLocation(locationList[locationIndex.current]);
    }

    return (
        <div className="App">
            <a className="GitHub" target="_blank" rel="noopener noreferrer" href="https://github.com/williamtorberntsson/sailingweather">Visit my GitHub to contribute or give ideas!</a>
            <div className="Buttons">
                <button className="UpdateButton" onClick={() => updateSMHIdata(location[1])}>Klicka för att uppdatera!</button>
                <button className="UpdateButton SwitchLocation" onClick={switchLocation}>Byt position</button>
            </div>
            <h1 className="Title">Vädret på {location[0]}!</h1>
            <WeatherWidget data={smhiData} daysAheadToPredict={3} />
        </div>
    );
}

export default App;
