

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from "../utils/axiosInstance";



// ✅ Async Thunks

export const fetchCards = createAsyncThunk('cards/fetchCards', async () => {
  const res = await axios.get("/cards");
  return res.data;
});

export const addCard = createAsyncThunk('cards/addCard', async (cardData) => {
  const res = await axios.post("/cards", cardData);
  return res.data;
});

export const editCard = createAsyncThunk('cards/editCard', async ({ card_id, data }) => {
  const res = await axios.put(`/cards/${card_id}`, data);
  console.log("Edited Card Response:", res.data);
  return res.data;
});

export const deleteCard = createAsyncThunk('cards/deleteCard', async (card_id) => {
  await axios.delete(`/cards/${card_id}`);
  return card_id;
});

export const addComment = createAsyncThunk('cards/addComment', async ({ card_id, comment }) => {
  const res = await axios.post(`/cards/${card_id}/comments`, { comment });
  return { card_id, comment };
});
const cardSlice = createSlice({
  name: 'cards',
  initialState: {
    cards: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addCard.fulfilled, (state, action) => {
        state.cards.push(action.payload);
      })

      .addCase(editCard.fulfilled, (state, action) => {
        const updatedCard = action.payload;
        const index = state.cards.findIndex(c => c.card_id === updatedCard.card_id);
        if (index !== -1) {
          state.cards[index] = updatedCard;
        }
      })

      .addCase(deleteCard.fulfilled, (state, action) => {
        state.cards = state.cards.filter(c => c.card_id !== action.payload);
      })

      .addCase(addComment.fulfilled, (state, action) => {
        const { card_id, comment } = action.payload;
        const card = state.cards.find(c => c.card_id === card_id);
        if (card) {
          card.comments.push(comment);
        }
      });
  }
});

export default cardSlice.reducer;
