import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import {
  fetchAllProductsValantis,
  fetchFilter,
  fetchProductById,
} from "../http/valantisAPI";
import Pages from "./Pages";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import SearchProduct from "../components/Search/SearchProduct";
import { useSelector } from "react-redux";
import { getSearchSelector } from "../redux/slices/filterSlice";
import SearchBrand from "../components/Search/SearchBrand";
import { getSearchBrandSelector } from "../redux/slices/filterBrandSlice";
import SearchPrice from "../components/Search/SearchPrice";
import { getSearchPriceSelector } from "../redux/slices/filterPriceSlice";

const ValantisPage = observer(() => {
  const [dataItem, setDataItem] = useState<any>(null);

  const [dataSearch, setDataSearch] = useState<any>(null);
  const { device } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAllProductsValantis({
        action: "get_ids",
      });
      if (response.error) {
        console.error(response.error);
      }
      device.setTotalCount(response.data.result.length);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAllProductsValantis({
        action: "get_ids",
        params: { offset: device.offset, limit: device.limit },
      });
      if (response.error) {
        console.error(response.error);
      }

      const responseItems = await fetchProductById({
        action: "get_items",
        params: { ids: response.data.result },
      });
      if (responseItems.error) {
        console.error(response.error);
      }
      const uniqueArray = responseItems.data.result.reduce(
        (acc: any, item: any) => {
          const existingItem = acc.find(
            (accItem: any) => accItem.id === item.id
          );

          if (!existingItem) {
            acc.push(item);
          }

          return acc;
        },
        []
      );
      setDataItem(uniqueArray);
    };
    fetchData();
  }, [device.offset, device.limit]);

  const search = useSelector(getSearchSelector);
  const searchBrand = useSelector(getSearchBrandSelector);
  const searchPrice = Number(useSelector(getSearchPriceSelector));

  const searchHandler = (
    search: any,
    searchBrand: any,
    searchPrice: number
  ) => {
    const fetchData = async () => {
      let params = {};

      params = search
        ? { product: search }
        : searchBrand
        ? { brand: searchBrand }
        : { price: Number(searchPrice) };

      const response = await fetchFilter({
        action: "filter",
        params: params,
      });

      if (response.error) {
        console.error(response.error);
      }

      const responseItems = await fetchProductById({
        action: "get_items",
        params: { ids: response.data.result },
      });

      const uniqueArray = responseItems.data.result.reduce(
        (acc: any, item: any) => {
          const existingItem = acc.find(
            (accItem: any) => accItem.id === item.id
          );

          if (!existingItem) {
            acc.push(item);
          }

          return acc;
        },
        []
      );

      setDataSearch(uniqueArray);
    };
    fetchData();
  };

  if (dataItem === null) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <h1>Товары</h1>
      <Pages />
      <div className="d-flex flex-row gap-4">
        <div>
          <SearchProduct />
          <Button
            onClick={() =>
              searchHandler(search, searchBrand, Number(searchPrice))
            }
          >
            Найти
          </Button>
        </div>
        <div>
          <SearchBrand />
          <Button
            onClick={() =>
              searchHandler(search, searchBrand, Number(searchPrice))
            }
          >
            Найти
          </Button>
        </div>
        <div>
          <SearchPrice />
          <Button
            onClick={() =>
              searchHandler(search, searchBrand, Number(searchPrice))
            }
          >
            Найти
          </Button>
        </div>
      </div>
      <Row className="d-flex">
        {dataSearch && dataSearch.length > 0
          ? dataSearch.map((item: any) => (
              <Col key={item.id} xl={3} lg={4} sm={6} className="mt-3">
                <Card style={{ width: 200, cursor: "pointer" }}>
                  <div>
                    <p>
                      <span>id: </span>
                      {item.id}
                    </p>
                    <h6>{item.product}</h6>
                    <p>
                      <span>Цена:</span> {item.price.toFixed(1)} руб.
                    </p>
                    <p>
                      <span>Brand:</span>{" "}
                      {item.brand ? item.brand : "без бренда"}
                    </p>
                  </div>
                </Card>
              </Col>
            ))
          : dataItem && dataItem.length > 0
          ? dataItem.map((item: any) => (
              <Col key={item.id} xl={3} lg={4} sm={6} className="mt-3">
                <Card style={{ width: 200, cursor: "pointer" }}>
                  <div>
                    <p>
                      <span>id: </span>
                      {item.id}
                    </p>
                    <h6>{item.product}</h6>
                    <p>
                      <span>Цена:</span> {item.price.toFixed(1)} руб.
                    </p>
                    <p>
                      <span>Brand:</span>{" "}
                      {item.brand ? item.brand : "без бренда"}
                    </p>
                  </div>
                </Card>
              </Col>
            ))
          : null}
      </Row>
    </Container>
  );
});
export default ValantisPage;

/* {!showNotFound ? (
          <Link to="/valantis">
            <div>
              <p>На главную</p>
            </div>
          </Link>
        ) : (
          ""
        )} */

/* {dataItem.result
          ? dataItem.result.map((item: any) => (
              <Col xl={3} lg={4} sm={6} className="mt-3">
                <Card style={{ width: 200, cursor: "pointer" }}>
                  <div key={item.id}>
                    <p>
                      <span>id: </span>
                      {item.id}
                    </p>
                    <h6>{item.product}</h6>
                    <p>
                      <span>Цена:</span> {item.price.toFixed(1)} руб.
                    </p>
                    <p>
                      <span>Brand:</span>{" "}
                      {item.brand ? item.brand : "без бренда"}
                    </p>
                  </div>
                </Card>
              </Col>
            )) */
/* : dataSearch2.map((item: any) => (
              <Col xl={3} lg={4} sm={6} className="mt-3">
                <Card style={{ width: 200, cursor: "pointer" }}>
                  <div key={item.id}>
                    <p>
                      <span>id: </span>
                      {item.id}
                    </p>
                    <h6>{item.product}</h6>
                    <p>
                      <span>Цена:</span> {item.price.toFixed(1)} руб.
                    </p>
                    <p>
                      <span>Brand:</span>{" "}
                      {item.brand ? item.brand : "без бренда"}
                    </p>
                  </div>
                </Card>
              </Col>
            ))} */

// {dataItem.result &&
//   dataItem.result.map((item: any) => (
//     <Col xl={3} lg={4} sm={6} className="mt-3">
//       <Card style={{ width: 200, cursor: "pointer" }}>
//         <div key={item.id}>
//           <p>
//             <span>id: </span>
//             {item.id}
//           </p>
//           <h6>{item.product}</h6>
//           <p>
//             <span>Цена:</span> {item.price.toFixed(1)} руб.
//           </p>
//           <p>
//             <span>Brand:</span> {item.brand ? item.brand : "без бренда"}
//           </p>
//         </div>
//       </Card>
//     </Col>
//   ))}

//{dataSearch2[0] && (dataSearch2.map())} */}

// if (
//   dataItem === null &&
//   dataSearch === null &&
//   dataItem === undefined &&
//   dataSearch === undefined
// ) {
//   return <p>Loading...</p>;
// }

// return (
//   <Container>
//     <h1>Товары</h1>
//     <Pages />
//     <div className="d-flex flex-row gap-4">
//       <div>
//         <SearchProduct />
//         <Button
//           onClick={() =>
//             searchHandler(search, searchBrand, Number(searchPrice))
//           }
//         >
//           Найти
//         </Button>
//       </div>
//       <div>
//         <SearchBrand />
//         <Button
//           onClick={() =>
//             searchHandler(search, searchBrand, Number(searchPrice))
//           }
//         >
//           Найти
//         </Button>
//       </div>
//       <div>
//         <SearchPrice />
//         <Button
//           onClick={() =>
//             searchHandler(search, searchBrand, Number(searchPrice))
//           }
//         >
//           Найти
//         </Button>
//       </div>
//     </div>
//     <Row className="d-flex">
//       {dataItem.result && dataItem.result.length > 0 ? (
//         dataItem.result.map((item: any) => (
//           <Col xl={3} lg={4} sm={6} className="mt-3">
//             <Card style={{ width: 200, cursor: "pointer" }}>
//               <div key={item.id}>
//                 <p>
//                   <span>id: </span>
//                   {item.id}
//                 </p>
//                 <h6>{item.product}</h6>
//                 <p>
//                   <span>Цена:</span> {item.price.toFixed(1)} руб.
//                 </p>
//                 <p>
//                   <span>Brand:</span> {item.brand ? item.brand : "без бренда"}
//                 </p>
//               </div>
//             </Card>
//           </Col>
//         ))
//       ) : dataSearch.result && dataSearch.result.length > 0 ? (
//         dataSearch.result.map((item: any) => (
//           <Col xl={3} lg={4} sm={6} className="mt-3">
//             <Card style={{ width: 200, cursor: "pointer" }}>
//               <div key={item.id}>
//                 <p>
//                   <span>id: </span>
//                   {item.id}
//                 </p>
//                 <h6>{item.product}</h6>
//                 <p>
//                   <span>Цена:</span> {item.price.toFixed(1)} руб.
//                 </p>
//                 <p>
//                   <span>Brand:</span> {item.brand ? item.brand : "без бренда"}
//                 </p>
//               </div>
//             </Card>
//           </Col>
//         ))
//       ) : (
//         <p>Ничего не найдено</p>
//       )}
//     </Row>
//   </Container>
// );

// const searchHandler = (search: any, searchBrand: any) => {
//   const fetchData = async () => {
//     let paramsQwery: any = {};

//     if (
//       search !== "" &&
//       search !== 0 &&
//       searchBrand !== "" &&
//       searchBrand !== 0
//     ) {
//       const response = await fetchFilter({
//         action: "filter",
//         params: { product: search, brand: searchBrand },
//       });
//       const responseItems = await fetchProductById({
//         action: "get_items",
//         params: { ids: response.result },
//       });
//       setDataSearch(responseItems);
//     }
//   };

//   fetchData();
// };

// const searchBrand = useSelector(getSearchBrandSelector);
// console.log({ searchBrand });
// const searchBrandHandler = (searchBrand: string) => {
//   const fetchData = async () => {
//     const response = await fetchProductFilterBrand({
//       action: "filter",
//       params: { product: searchBrand },
//     });
//     const responseItems = await fetchProductById({
//       action: "get_items",
//       params: { ids: response.result },
//     });
//     setdataSearchBrand(responseItems);
//   };
//   fetchData();
// };

// const uniqueIds = new Set();
// const filteredResponse = response.result.filter((id: any) => {
//   if (!uniqueIds.has(id)) {
//     uniqueIds.add(id);
//     return true;
//   }
//   return false;
// });
// const responseItems = await fetchProductById({
//   action: "get_items",
//   params: { ids: filteredResponse },
// });

//   return (
//     <Container>
//       <h1>Товары</h1>
//       <Pages />
//       <Search />
//       <Button onClick={() => searchPrice(search)}>Найти</Button>

//       <Row className="d-flex">
//         {dataSearch.result && dataSearch.result.length > 0 ? (
//           dataSearch.result.map((item: any) => (
//             <ValantisItem key={item} item={item} />
//           ))
//         ) : (
//           <p>Ничего не найдено</p>
//         )}

// если data то

//         {data.result && data.result.length > 0 ? (
//           data.result
//             .filter(
//               (item: string, index: number, array: any) =>
//                 array.indexOf(item) === index
//             ) // Remove duplicates

//             .map((item: any) => <ValantisItem key={item} item={item} />)
//         ) : (
//           <p>No data available</p>
//         )}
//       </Row>
//     </Container>
//   );
// });

// export default ValantisPage;
