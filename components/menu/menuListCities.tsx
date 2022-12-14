import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cities } from '../redux/citySlice';

export type State = {
    city: Cities[];
};

const MenuListCities = () => {
    const cities = useSelector((state: State) => state.city);
    const dispatch = useDispatch();

    const [selectedCity, setSelectedCity] = useState<Cities | undefined>(
        undefined
    );

    async function handleCheckTime() {
        if (selectedCity) {
            const response = await fetch(
                `http://api.openweathermap.org/data/2.5/forecast?lat=${selectedCity?.lat}&lon=${selectedCity?.lon}&appid=e7e8d4e4788a251c4c7d8efeba5f64a2`
            );
            const data = await response.json();
            console.log(data);
        }
    }

    return (
        <div className="absolute translate-y-6 inset-y-2/4 ">
            <div className="p-2 bg-slate-50 rounded-2xl">
                {cities.map((city) => {
                    return (
                        <div
                            onClick={() => {
                                setSelectedCity(city);
                                handleCheckTime();
                            }}
                            key={city.lat}
                            className={
                                ' bg-slate-50 p-2 hover:bg-slate-100 hover:cursor-pointer '
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
