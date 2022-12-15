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

    const cityWeather = useSelector((state: State) => state.cityWeather);

    const dispatch = useDispatch();

    async function handleSearch() {
        setIsLoading(true);
        const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=5&appid=e7e8d4e4788a251c4c7d8efeba5f64a2`
        );
        const data = await response.json();

        if (!data.cod) {
            dispatch(addCity(data));
        }
        setIsLoading(false);
    }

    useEffect(() => {
        //https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript

        const cWeather = cityWeather?.city?.name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toUpperCase();
        const sText = searchText
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toUpperCase();

        if (sText === '') {
            setToggle(false);
        } else if (cWeather !== sText) {
            setToggle(true);
        } else {
            setToggle(false);
        }
    }, [searchText, cityWeather?.city?.name]);

    if (typeof window !== 'undefined') {
        if (typeof window !== 'undefined') {
            document.addEventListener('keydown', (event) => {
                if (event.key === '/' || (event.ctrlKey && event.key === 'k')) {
                    event.preventDefault();
                    document.getElementById('search')?.focus();
                }
            });
        }
    }

    return (
        <div>
            <div className="flex items-center justify-center w-screen h-auto min-h-screen p-4 bg-teal-50">
                <div className="flex flex-col items-center justify-center p-4 pb-10 bg-white shadow-2xl rounded-2xl lg:w-1/3 ">
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
                            id="search"
                            type="text"
                            placeholder="Digite o nome da cidade"
                            className="p-2 pl-4 text-lg ring-1 ring-sky-500 rounded-l-3xl font-Roboto focus:ring-sky-600 focus:outline-none focus:bg-sky-50 text-sky-600"
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                        />
                        <button
                            type="submit"
                            className="p-1 px-3 text-white border-4 border-sky-500 rounded-r-3xl font-Roboto bg-sky-500 hover:bg-sky-600 hover:border-sky-600"
                            onClick={handleSearch}
                        >
                            <MdSearch size={30} />
                        </button>
                    </form>

                    {isLoading && (
                        <div className="flex flex-col items-center justify-center mt-5 mb-5">
                            <div className="w-10 h-10 ease-linear border-4 rounded-full border-l-gray-200 border-r-gray-200 border-t-gray-200 border-b-sky-500 animate-spin" />
                        </div>
                    )}
                    {toggle && <MenuListCities />}

                    <ClimateSummary />
                </div>
            </div>
        </div>
    );
}
