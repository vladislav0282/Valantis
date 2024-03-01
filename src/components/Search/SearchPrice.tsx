//import { useEffect, useState } from "react";
//import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { changeSearchPriceFilter } from "../../redux/slices/filterPriceSlice";

//import { changeSearchFilter } from "../../redux/slices/filterSlice";
//import { useDebounce } from "../hooks/useDebounce";

function SearchPrice() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => {
    const searchValueFromQuery = searchParams.get("p");

    return searchValueFromQuery ?? "";
  });
  const dispatch = useDispatch();

  const debouncedSearchValue = useDebounce(search, 750);
  const searchHandler = (e: any) => {
    const newSearchValue = e.target.value;
    setSearch(newSearchValue);
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      p: newSearchValue,
    });
  };

  useEffect(() => {
    dispatch(changeSearchPriceFilter(debouncedSearchValue));
  }, [dispatch, debouncedSearchValue]);

  return (
    <div>
      <h5 style={{ width: "300px", textAlign: "center" }}>
        Поиск по названию Цены
      </h5>
      <input
        placeholder="Введите значение цены..."
        type="text"
        className="form-control mb-1"
        style={{ width: "300px" }}
        value={search}
        onChange={searchHandler}
      />
    </div>
  );
}

export default SearchPrice;
