import { WeekDays } from "../constants";
import "../assets/css/WeatherWidget.css";
import arrowSVG from "../assets/svg/arrow.svg";

const WeatherWidget = ({ data, daysAheadToPredict }) => {

    if (!data) {
        return <h1>No data yet!</h1>
    }

    let forecast = SortDataToDays(data, daysAheadToPredict);

    let averagedForecasts = GetAverageForecast(forecast);

    let date = new Date();
    let today = date.getDay();

    return (
        <div className="Days">
            {
                averagedForecasts.map((forecast, i) => {
                    if (Object.keys(forecast).length < 1) {
                        return;
                    }
                    return (
                        <div className="Weekdays" key={i}>
                            <h2>{WeekDays[(today + i) % 7]}</h2>
                            <div className="DayIntervals" key={i}>
                                {
                                    Object.entries(forecast).map((list, j) => {
                                        let dayInterval = list[0];
                                        return (
                                            <div className="WeatherTypes" key={j}>
                                                <h3>{dayInterval}</h3>
                                                <p>{list[1]["t"]} °C</p>
                                                <p>{list[1]["ws"]} ({list[1]["gust"]})</p>
                                                <div className="WindDirection">
                                                    {list[1]["wd"].map((element, k) => {
                                                        return <img width="30px" key={k} src={arrowSVG} style={{ transform: `rotate(${element + 180}deg)`, transformOrigin: "center" }}></img>
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default WeatherWidget;

const SortDataToDays = (data, daysToPredict) => {

    let forecast = [];
    let now = new Date();

    let onlyFutureData = data.timeSeries.filter(day => new Date(day.validTime) > now);

    onlyFutureData.map((element, i) => {
        const date = new Date(element.validTime); // This time in wrong time zone

        const daysAhead = GetDaysAhead(now, date);

        if (daysAhead <= daysToPredict) {
            if (forecast.length < daysAhead + 1) {
                forecast.push({});
            }
            forecast[daysAhead][date.getHours()] = GetSailingWeatherParameters(element.parameters);
        }
    });
    return forecast;
}

const GetAverageForecast = (forecast) => {
    let averagedForecast = new Array(forecast.length);

    // Separate data into categories
    forecast.forEach((element, i) => {

        // Förmiddag
        const fm = Object.entries(element).filter(list => parseInt(list[0]) >= 8 && parseInt(list[0]) <= 11);

        // Eftermiddag
        const em = Object.entries(element).filter(list => parseInt(list[0]) >= 12 && parseInt(list[0]) <= 15);

        // Kväll
        const kv = Object.entries(element).filter(list => parseInt(list[0]) >= 16 && parseInt(list[0]) <= 19);

        averagedForecast[i] = {};

        if (fm.length > 0) {
            averagedForecast[i]["fm"] = GetAverageWeather(fm);
        }
        if (em.length > 0) {
            averagedForecast[i]["em"] = GetAverageWeather(em);
        }
        if (kv.length > 0) {
            averagedForecast[i]["kv"] = GetAverageWeather(kv);
        }
    })
    return averagedForecast;
}

const GetDaysAhead = (start, end) => {
    const oneDay = 1000 * 60 * 60 * 24;

    const diff = end.getTime() - start.getTime();

    const daysDiff = Math.round(diff / oneDay);

    return daysDiff;
}

const GetAverageWeather = (data) => {
    let tempSum = 0;
    let windSum = 0;
    let gustSum = 0;
    let windDirection = new Array(data.length);

    data.forEach((element, i) => {
        tempSum += element[1]["t"] / data.length;
        windSum += element[1]["ws"] / data.length;
        gustSum += element[1]["gust"] / data.length;
        windDirection[i] = element[1]["wd"];
    })

    return { t: tempSum.toFixed(1), ws: windSum.toFixed(1), gust: gustSum.toFixed(1), wd: windDirection }
}

const GetSailingWeatherParameters = (list) => {
    let data = {};

    list.forEach(param => {
        // The indexes are not always consistent
        // Therefore looping through the entire list
        switch (param.name) {
            case "t":
                data["t"] = param.values[0];
            case "wd":
                data["wd"] = param.values[0];
            case "ws":
                data["ws"] = param.values[0];
            case "gust":
                data["gust"] = param.values[0];
            default:
                break;
        }
    })
    return data;
}