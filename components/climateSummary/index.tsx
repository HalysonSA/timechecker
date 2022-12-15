import moment from 'moment';
import { useState } from 'react';
import { TbWind } from 'react-icons/tb';
import { WiHumidity, WiThermometer } from 'react-icons/wi';
import { useSelector } from 'react-redux';
import { State } from '../menu/menuListCities';

const ClimateSummary = () => {
    const cityWeather = useSelector((state: State) => state.cityWeather);
    const [icon, setIcon] = useState<string>('');

    if (!cityWeather.city)
        return (
            <div className="flex flex-col items-center justify-center  p-4">
                <p className="text-4xl font-medium text-sky-600">
                    Previsão do Tempo
                </p>
            </div>
        );

    const date = new Date(cityWeather.list[0].dt * 1000);

    const temp = cityWeather.list[0].main;

    const time = cityWeather.list[0].weather[0].main;

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

    function TranslateDescription(txt: string) {
        if (txt === 'Clouds') return 'Nublado';
        else if (txt === 'Clear') return 'Céu Limpo';
        else if (txt === 'Rain') return 'Chuva';
        else if (txt === 'Snow') return 'Neve';
        else if (txt === 'Drizzle') return 'Chuvisco';
        else if (txt === 'Thunderstorm') return 'Tempestade';
        else if (txt === 'Mist') return 'Névoa';
        else if (txt === 'Smoke') return 'Fumaça';
        else if (txt === 'Haze') return 'Neblina';
        else if (txt === 'Dust') return 'Poeira';
        else if (txt === 'Fog') return 'Neblina';
        else if (txt === 'Sand') return 'Areia';
        else if (txt === 'Ash') return 'Cinza';
        else if (txt === 'Squall') return 'Rajada de vento';
        else if (txt === 'Tornado') return 'Tornado';
        return 'Não identificado';
    }

    return (
        <div className="flex flex-col items-center justify-center max-w-sm my-5 gap-5">
            <div className="bg-sky-500  rounded-full p-1 ">
                <img src={icon} className="object-fill" />
            </div>
            <p className="font-Roboto text-lg text-sky-500">
                {TranslateDescription(time)}
            </p>

            <div className="flex flex-col justify-center items-center flex-wrap">
                <p className="text-4xl font-Roboto font-semibold">
                    {cityWeather.city?.name}
                </p>
                <p className="text-3xl font-Roboto font-extralight">
                    {cityWeather.city?.state}
                </p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <p className="text-xl">
                    {moment(date).format('HH')}h {moment(date).format('mm')}min
                </p>
                <div className="flex flex-row items-center">
                    <WiThermometer
                        size={30}
                        fill={
                            KelvinInCelsius(temp.temp) > 26
                                ? 'orange'
                                : KelvinInCelsius(temp.temp) < 18
                                ? 'cyan'
                                : '#209900'
                        }
                    />
                    <p className="text-5xl font-medium">
                        {KelvinInCelsius(temp.temp).toFixed(1)}°C
                    </p>
                </div>
            </div>
            <div className="text-start">
                <div className="flex flex-row items-center">
                    <TbWind size={25} />
                    <p>
                        <b>Vento: </b>
                        {(cityWeather.list[0].wind.speed * 3.6).toFixed(1)} km/h
                    </p>
                </div>
                <div className="flex flex-row items-center">
                    <WiHumidity size={30} />

                    <p>
                        <b>Umidade:</b> {cityWeather.list[0].main.humidity}%
                    </p>
                </div>
            </div>
        </div>
    );
};
export default ClimateSummary;
