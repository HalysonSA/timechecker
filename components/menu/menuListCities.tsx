import { useDispatch, useSelector } from 'react-redux';
import { Cities } from '../redux/citySlice';
import { addCityWeather, City } from '../redux/cityWeatherSlice';

export type State = {
    city: Cities[];
    cityWeather: City;
};

const MenuListCities = () => {
    const cities = useSelector((state: State) => state.city);
    const dispatch = useDispatch();

    async function handleCheckTime(selectedCity: Cities) {
        if (selectedCity) {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedCity?.lat}&lon=${selectedCity?.lon}&appid=e7e8d4e4788a251c4c7d8efeba5f64a2`
            );
            var data = await response.json();
            data.city.state = selectedCity.state;
            dispatch(addCityWeather(data));
        }
    }

    return (
        <div className="mt-2 inset-y-2/4">
            <div className="p-2 bg-slate-50 rounded-2xl">
                {cities.map((city) => {
                    return (
                        <div
                            onClick={() => {
                                handleCheckTime(city);
                            }}
                            key={city.lat}
                            className={
                                ' bg-slate-50 p-2 hover:bg-slate-100 hover:cursor-pointer select-none '
                            }
                        >
                            {city.name}, {city.state} - {city.country}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default MenuListCities;
