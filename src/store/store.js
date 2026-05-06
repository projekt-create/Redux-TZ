import { configureStore } from "@reduxjs/toolkit";
import ApiSlice from "../reducer/ApiReducer";

const store = configureStore({
    reducer: {
        api: ApiSlice
    }
})

export default store