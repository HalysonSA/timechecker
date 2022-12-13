import { useState } from 'react';

type City = {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state: string;
};

export default function Home() {
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);

    async function handleSearch() {
        const response = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=5&appid=e7e8d4e4788a251c4c7d8efeba5f64a2`
        );
        const data = await response.json();
        setSearchResult(data);
        if (data.length === 0) {
            alert('Nenhuma cidade encontrada');
        }
        console.log(data);
    }

    async function handleCheckTime() {
        const response = await fetch(
            `http://api.openweathermap.org/data/2.5/forecast?lat=${selectedCity?.lat}&lon=${selectedCity?.lon}&appid=e7e8d4e4788a251c4c7d8efeba5f64a2`
        );
        const data = await response.json();
        console.log(data);
    }

    if (searchResult.length > 0 && searchText.length === 0) setSearchResult([]);

    return (
        <div className="bg-gray-700 p-2 ">
            <nav className=" flex justify-center">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                    }}
                >
                    <input
                        type="text"
                        id="search"
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Busque aqui"
                        className="p-2 rounded-l-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                </form>
                <button
                    type="submit"
                    id="btnSearch"
                    className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-400 "
                >
                    Buscar
                </button>
            </nav>
            <div className="absolute w-40 top-15 inset-x-1/2 transform -translate-x-2/3 flex-col justify-start ">
                {searchResult.map((city: City) => (
                    <div
                        key={city.lat}
                        className="relative bg-gray-400  p-2  shadow-lg inset-x-50  hover:bg-gray-300 cursor-pointer"
                        onClick={() => {
                            setSelectedCity(city);
                            handleCheckTime();
                        }}
                    >
                        <span className="text-base">
                            {city.name}, {city.state}, {city.country}.
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
