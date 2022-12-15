import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import ClimateSummary from '../components/climateSummary';
import MenuListCities, { State } from '../components/menu/menuListCities';
import { addCity } from '../components/redux/citySlice';
export default function Home() {
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [toggle, setToggle] = useState(false);

    const cities = useSelector((state: State) => state.city);

    const dispatch = useDispatch();

    async function handleSearch() {
        setIsLoading(true);
        const response = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=5&appid=e7e8d4e4788a251c4c7d8efeba5f64a2`
        );
        const data = await response.json();

        if (!data.cod) {
            dispatch(addCity(data));
        }
        setIsLoading(false);
    }

    useEffect(() => {
        const city = cities[0];

        if (city.name.toUpperCase() == searchText.toUpperCase()) {
            setToggle(true);
        } else {
            setToggle(false);
        }
    }, [searchText, cities]);

    return (
        <div>
            <div className="w-screen h-auto min-h-screen bg-teal-50 flex items-center justify-center p-4">
                <div className="flex flex-col justify-center items-center  shadow-2xl p-4 pb-10  rounded-2xl  bg-white   lg:w-1/3 ">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={200}
                        height={200}
                    />
                    <form
                        className="flex flex-row items-center justify-center "
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSearch();
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Digite o nome da cidade"
                            className="p-2 pl-4 ring-1 text-lg ring-sky-500 rounded-l-3xl font-Roboto  focus:ring-sky-600 focus:outline-none focus:bg-sky-50 text-sky-600"
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                        />
                        <button
                            type="submit"
                            className=" border-4 border-sky-500 rounded-r-3xl p-1 px-3 font-Roboto bg-sky-500 hover:bg-sky-600 hover:border-sky-600 text-white"
                            onClick={handleSearch}
                        >
                            <MdSearch size={30} />
                        </button>
                    </form>

                    {isLoading && (
                        <div className="flex flex-col justify-center items-center mb-5 mt-5">
                            <div className="h-10 w-10 border-4 border-l-gray-200 border-r-gray-200 border-t-gray-200 border-b-sky-500 rounded-full animate-spin ease-linear" />
                        </div>
                    )}
                    {toggle && <MenuListCities />}

                    <ClimateSummary />
                </div>
            </div>
        </div>
    );
}
