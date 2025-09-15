import { configureStore } from "@reduxjs/toolkit";
import BoardReducer from "./Slices/BoardSlice";
import ListReducer from "./Slices/ListSlice";
import CardReducer from "./Slices/CardSlice";

export const store = configureStore({
  reducer: {
    boards: BoardReducer,
    lists: ListReducer,
    cards: CardReducer,
  },
});
