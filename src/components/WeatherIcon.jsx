import clearSky from "../assets/images/1.png";
import nearlyClearSky from "../assets/images/2.png";
import variableCloudness from "../assets/images/3.png";
import halfClear from "../assets/images/4.png";
import cloudy from "../assets/images/5.png";
import overCast from "../assets/images/5.png";
import fog from "../assets/images/7.png";
import lightRainShower from "../assets/images/8.png";
import moderateRainShower from "../assets/images/9.png";
import heavyRainShower from "../assets/images/10.png";
import thunderstorm from "../assets/images/21.png";
import lightSleetShower from "../assets/images/12.png";
import moderateSleetShower from "../assets/images/13.png";
import heavySleetShower from "../assets/images/14.png";
import lightSnowShower from "../assets/images/15.png";
import moderateSnowShower from "../assets/images/16.png";
import heavySnowShower from "../assets/images/17.png";
import lightRain from "../assets/images/18.png";
import moderateRain from "../assets/images/19.png";
import heavyRain from "../assets/images/20.png";
import thunder from "../assets/images/21.png";
import lightSleet from "../assets/images/22.png";
import moderateSleet from "../assets/images/23.png";
import heavySleet from "../assets/images/24.png";
import lightSnowfall from "../assets/images/25.png";
import moderateSnowfall from "../assets/images/26.png";
import heavySnowfall from "../assets/images/27.png";


const weatherIconList = [clearSky, nearlyClearSky, variableCloudness, halfClear,
    cloudy, overCast, fog, lightRainShower, moderateRainShower, heavyRainShower,
    thunderstorm, lightSleetShower, moderateSleetShower, heavySleetShower, lightSnowShower,
    moderateSnowShower, heavySnowShower, lightRain, moderateRain, heavyRain, thunder,
    lightSleet, moderateSleet, heavySleet, lightSnowfall, moderateSnowfall, heavySnowfall];

const WeatherIcon = ({index}) => <img className="weatherIcon" src={weatherIconList[index]} />

export default WeatherIcon;