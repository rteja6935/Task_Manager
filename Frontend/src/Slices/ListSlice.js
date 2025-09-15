
// listSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from "../utils/axiosInstance";



// ✅ Async Thunks

export const fetchLists = createAsyncThunk('lists/fetchLists', async () => {
  const res = await axios.get("/lists");
  return res.data;
});

export const addList = createAsyncThunk('lists/addList', async (listData) => {
  const res = await axios.post("/lists", listData);
  return res.data;
});

export const editListTitle = createAsyncThunk('lists/editListTitle', async ({ listId, title }) => {
  const res = await axios.put(`/lists/${listId}`, { title });
  return res.data;
});

export const deleteList = createAsyncThunk('lists/deleteList', async (listId) => {
  await axios.delete(`/lists/${listId}`);
  return listId;
});

export const addCardToList = createAsyncThunk('lists/addCardToList', async ({ listId, cardId }) => {
  await axios.post(`/lists/${listId}/cards`, { cardId });
  return { listId, cardId };
});

export const removeCardFromList = createAsyncThunk('lists/removeCardFromList', async ({ listId, cardId }) => {
  await axios.delete(`/lists/${listId}/cards/${cardId}`);
  return { listId, cardId };
});

export const moveCardBetweenLists = createAsyncThunk(
  'lists/moveCardBetweenLists',
  async ({ sourceListId, destinationListId, cardId }) => {
    await axios.put(`/lists/moveCard`, {
      sourceListId,
      destinationListId,
      cardId,
    });
    return { sourceListId, destinationListId, cardId };
  }
);

const listSlice = createSlice({
  name: 'lists',
  initialState: {
    lists: [],
    loading: false,
    error: null,
  },
  reducers: {}, // no local reducers, only API-driven logic
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = action.payload;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addList.fulfilled, (state, action) => {
        state.lists.push(action.payload);
      })

      .addCase(editListTitle.fulfilled, (state, action) => {
        const { List_id, title } = action.payload;
        const list = state.lists.find((l) => l.List_id === List_id);
        if (list) list.title = title;
      })

      .addCase(deleteList.fulfilled, (state, action) => {
        state.lists = state.lists.filter((l) => l.List_id !== action.payload);
      })

      .addCase(addCardToList.fulfilled, (state, action) => {
        const { listId, cardId } = action.payload;
        const list = state.lists.find((l) => l.List_id === listId);
        if (list) list.card_ids.push(cardId);
      })

      .addCase(removeCardFromList.fulfilled, (state, action) => {
        const { listId, cardId } = action.payload;
        const list = state.lists.find((l) => l.List_id === listId);
        if (list) list.card_ids = list.card_ids.filter((id) => id !== cardId);
      })

      .addCase(moveCardBetweenLists.fulfilled, (state, action) => {
        const { sourceListId, destinationListId, cardId } = action.payload;

        const sourceList = state.lists.find((l) => l.List_id === sourceListId);
        const destList = state.lists.find((l) => l.List_id === destinationListId);

        if (sourceList) {
          sourceList.card_ids = sourceList.card_ids.filter((id) => id !== cardId);
        }
        if (destList) {
          destList.card_ids.push(cardId);
        }
      });
  },
});
export default listSlice.reducer;
