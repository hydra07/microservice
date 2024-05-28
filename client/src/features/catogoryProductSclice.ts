// import {
//   createAsyncThunk, // simplify asynchronous
//   createSlice, // create a slice of state
//   PayloadAction, // type for action.payload
// } from "@reduxjs/toolkit";
// import axios from "axios";
// import { CategoryProduct } from "CustomTypes";

// interface CategoryProductState {
//   categoryProducts: CategoryProduct[];
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// const inintialState: CategoryProductState ={
//     categoryProducts: [],
//     status: 'idle',
//     error: null,
// };

// export const fetchCategoryProduct = createAsyncThunk("categoryProduct/", async () => {
//     const res = await axios
// })
