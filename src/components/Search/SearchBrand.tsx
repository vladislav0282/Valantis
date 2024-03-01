import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { changeSearchBrandFilter } from "../../redux/slices/filterBrandSlice";
import { observer } from "mobx-react-lite";

const SearchBrand = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => {
    const searchValueFromQuery = searchParams.get("b");

    return searchValueFromQuery ?? "";
  });
  const dispatch = useDispatch();
  const debouncedSearchValue = useDebounce(search, 750);
  const searchHandler = (e: any) => {
    const newSearchValue = e.target.value;
    setSearch(newSearchValue);
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      b: newSearchValue,
    });
  };

  useEffect(() => {
    dispatch(changeSearchBrandFilter(debouncedSearchValue));
  }, [dispatch, debouncedSearchValue]);

  return (
    <div>
      <h5 style={{ width: "300px", textAlign: "center" }}>
        Поиск по названию Бренда
      </h5>
      <input
        placeholder="Введите значение бренда..."
        type="text"
        className="form-control mb-1"
        style={{ width: "300px" }}
        value={search}
        onChange={searchHandler}
      />
    </div>
  );
});

export default SearchBrand;
