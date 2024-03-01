import md5 from "md5";
import axios from "axios";
import { json } from "stream/consumers";

let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, "0");
let day = String(today.getDate()).padStart(2, "0");

//let formattedDate = year + month + day;
let formattedDate = "20240301";
//console.log(formattedDate);

let password = "Valantis";

// Assuming the md5 function is available
var hash = md5(password + "_" + formattedDate).toString();
console.log(hash);

let ids = [];
let offset: number = 0;
let limit: number = 50;
let price: number = 0;
let product = "";
let brand = "";

const formDataAll = {
  action: "get_ids",
  offset: offset,
  limit: limit,
};

const formDataById = {
  action: "get_items",
  params: { ids: [] },
};

const formPrice = {
  action: "filter",
  params: { price: "" },
};

const formProduct = {
  action: "filter",
  params: { product: "" },
};

const formBrand = {
  action: "filter",
  params: { brand: "" },
};

const form = {
  action: "filter",
  params: { brand: "", product: "", price: 0 },
};

export const fetchAllProductsValantis = async (formDataAll: object) => {
  const res: any = {
    data: null,
    error: null,
  };
  try {
    const { data } = await axios.post(
      "http://api.valantis.store:40000/",
      formDataAll,
      {
        headers: {
          "X-Auth": hash,
          "Content-Type": "application/json",
        },
      }
    );
    res.data = data;
  } catch (error: any) {
    res.error = error;
  }

  return res;
};

export const fetchProductById = async (formDataById: object) => {
  const res: any = {
    data: null,
    error: null,
  };
  try {
    const { data } = await axios.post(
      "http://api.valantis.store:40000/",
      formDataById,
      {
        headers: {
          "X-Auth": hash,
          "Content-Type": "application/json",
        },
      }
    );
    res.data = data;
  } catch (error: any) {
    res.error = error;
  }
  return res;
};

export const fetchProductFieldById = async () => {
  const res: any = {
    data: null,
    error: null,
  };
  try {
    const { data } = await axios.post("http://api.valantis.store:40000/", {
      headers: {
        "X-Auth": hash,
        "Content-Type": "application/json",
      },
    });
    res.data = data;
  } catch (error: any) {
    res.error = error;
  }
  return res;
};

export const fetchFilter = async (form: object) => {
  const res: any = {
    data: null,
    error: null,
  };
  try {
    const { data } = await axios.post(
      "http://api.valantis.store:40000/",
      form,
      {
        headers: {
          "X-Auth": hash,
          "Content-Type": "application/json",
        },
      }
    );
    res.data = data;
  } catch (error: any) {
    res.error = error;
  }
  return res;
};

// export const fetchProductFilterPrice = async (formPrice: object) => {
//   const { data } = await axios.post(
//     "http://api.valantis.store:40000/",
//     formPrice,
//     {
//       headers: {
//         "X-Auth": hash,
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   return data;
// };

// export const fetchProductFilterProduct = async (formProduct: object) => {
//   const { data } = await axios.post(
//     "http://api.valantis.store:40000/",
//     formProduct,
//     {
//       headers: {
//         "X-Auth": hash,
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   return data;
// };

// export const fetchProductFilterBrand = async (formBrand: object) => {
//   const { data } = await axios.post(
//     "http://api.valantis.store:40000/",
//     formBrand,
//     {
//       headers: {
//         "X-Auth": hash,
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   return data;
// };

// export const fetchAllProductsValantis = (formDataAll: object) => {
//   return fetch("http://api.valantis.store:40000/", {
//     method: "POST",
//     headers: {
//       "X-Auth": hash,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formDataAll),
//   })
//     .then((response) => {
//       if (response.ok) {
//         return response.json(); // Retrieve the JSON data from the response
//       } else {
//         throw new Error("Request failed");
//       }
//     })
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
