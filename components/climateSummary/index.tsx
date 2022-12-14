import moment from 'moment';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../menu/menuListCities';

const ClimateSummary = () => {
    const cityWeather = useSelector((state: State) => state.cityWeather);
    const [icon, setIcon] = useState<string>('');

    if (!cityWeather.city)
        return (
            <div className="flex flex-col items-center justify-center ">
                <p className="text-4xl font-medium text-sky-500">
                    Previsão do Tempo
                </p>
            </div>
        );
    const date = new Date(cityWeather.list[0].dt * 1000);

    const temp = cityWeather.list[0].main;

    const handleIcon = async (icon: string) => {
        const response = await fetch(
            `https://openweathermap.org/img/wn/${icon}.png`
        );
        const iconUrl = response.url;
        setIcon(iconUrl);
    };

    handleIcon(cityWeather.list[0].weather[0].icon);

    function KelvinInCelsius(temp: number) {
        return temp - 273.15;
    }

    return (
        <div className="flex flex-col items-center justify-center ">
            <img src={icon} className="object-fill" />
            <div className="flex flew-row">
                <p className="text-5xl font-medium">
                    {cityWeather.city?.name + ',' + cityWeather.city?.country}
                </p>
            </div>
            <p className="text-xl">
                {moment(date).format('HH')} h {moment(date).format('mm')} min
            </p>

            <p className="text-5xl font-medium">
                {KelvinInCelsius(temp.temp).toFixed(1)}°C
            </p>
            <p>
                Vento: {(cityWeather.list[0].wind.speed * 3.6).toFixed(1)} km/h
            </p>
            <p> Umidade: {cityWeather.list[0].main.humidity}%</p>
        </div>
    );
};
export default ClimateSummary;
