//import { useEffect, useState } from "react";
//import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { changeSearchFilter } from "../../redux/slices/filterSlice";
import { useDebounce } from "../../hooks/useDebounce";
import { Button } from "react-bootstrap";

//import { changeSearchFilter } from "../../redux/slices/filterSlice";
//import { useDebounce } from "../hooks/useDebounce";

function SearchProduct() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => {
    const searchValueFromQuery = searchParams.get("d");

    return searchValueFromQuery ?? "";
  });
  const dispatch = useDispatch();
  const debouncedSearchValue = useDebounce(search, 750);

  const searchHandler = (e: any) => {
    const newSearchValue = e.target.value;
    setSearch(newSearchValue);
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      d: newSearchValue,
    });
  };

  useEffect(() => {
    dispatch(changeSearchFilter(debouncedSearchValue));
  }, [dispatch, debouncedSearchValue]);

  return (
    <div>
      <h5 style={{ width: "400px", textAlign: "center" }}>
        Поиск по названию продукта (работает по вводу в поисковую строку)
      </h5>
      <input
        // className={searchPrice.inp}
        placeholder="Введите название товара..."
        type="text"
        className="form-control mb-1"
        style={{ width: "400px" }}
        value={search}
        onChange={searchHandler}
      />
    </div>
  );
}

export default SearchProduct;
