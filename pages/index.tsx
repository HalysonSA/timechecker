import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuListCities, { State } from '../components/menu/menuListCities';
import { addCity } from '../components/redux/citySlice';

export default function Home() {
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [toggle, setToggle] = useState(false);

    const dispatch = useDispatch();
    const citySearched = useSelector((state: State) => state.city);

    useEffect(() => {
        console.log(toggle);
        citySearched.map((city) => {
            if (city.name.toUpperCase() == searchText.toUpperCase()) {
                setToggle(true);
            } else {
                setToggle(false);
            }
        });
    }, [searchText, citySearched]);

    async function handleSearch() {
        const response = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=5&appid=e7e8d4e4788a251c4c7d8efeba5f64a2`
        );
        const data = await response.json();

        if (!data.cod) {
            setSearchResult(data);
            dispatch(addCity(data));
        } else {
            alert('Cidade não encontrada! ');
        }
    }

    if (searchResult.length > 0 && searchText.length === 0) setSearchResult([]);

    return (
        <div className="h-screen bg-white ">
            <div className="absolute w-screen top-40">
                <div className="flex flex-col items-center justify-center ">
                    <p>City, temp</p>
                    <p>datetime</p>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center h-screen ">
                <div className="flex flex-row items-center justify-center w-5/6 font-Roboto">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSearch();
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Digite o nome da cidade"
                            className="px-4 py-2  text-md text-sky-600 rounded-l-xl ring-1 ring-sky-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                        />
                    </form>
                    <button
                        type="submit"
                        className="px-4 py-2 text-white duration-200 rounded-r-xl ring-1 ring-sky-500 bg-sky-500 hover:bg-sky-600 hover:ring-sky-600"
                        onClick={handleSearch}
                    >
                        Buscar
                    </button>
                </div>
                {toggle && <MenuListCities />}
            </div>
        </div>
    );
}
