// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // ---------------------- API THUNKS ----------------------

// // Fetch all cards
// export const fetchCards = createAsyncThunk(
//   "cards/fetchCards",
//   async () => {
//     const res = await axios.get("http://localhost:3000/cards");
//     return res.data;
//   }
// );

// // Add new card
// export const addCard = createAsyncThunk(
//   "cards/addCard",
//   async (newCard) => {
//     const res = await axios.post("http://localhost:3000/cards", newCard);
//     return res.data;
//   }
// );

// // Edit card
// export const editCard = createAsyncThunk(
//   "cards/editCard",
//   async ({ card_id, data }) => {
//     const res = await axios.put(`http://localhost:3000/cards/${card_id}`, data);
//     return { card_id, data: res.data };
//   }
// );

// // Delete card
// export const deleteCard = createAsyncThunk(
//   "cards/deleteCard",
//   async (card_id) => {
//     await axios.delete(`http://localhost:3000/cards/${card_id}`);
//     return card_id;
//   }
// );

// // Add comment to card
// export const addComment = createAsyncThunk(
//   "cards/addComment",
//   async ({ card_id, comment }) => {
//     const res = await axios.post(`http://localhost:3000/cards/${card_id}/comments`, { comment });
//     return { card_id, comment: res.data };
//   }
// );

// // ---------------------- SLICE ----------------------

// const cardSlice = createSlice({
//   name: "cards",
//   initialState: {
//     cards: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // ---- Fetch ----
//       .addCase(fetchCards.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCards.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cards = action.payload;
//       })
//       .addCase(fetchCards.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })

//       // ---- Add ----
//       .addCase(addCard.fulfilled, (state, action) => {
//         state.cards.push(action.payload);
//       })

//       // ---- Edit ----
//       .addCase(editCard.fulfilled, (state, action) => {
//         const { card_id, data } = action.payload;
//         const card = state.cards.find(c => c.card_id === card_id);
//         if (card) Object.assign(card, data);
//       })

//       // ---- Delete ----
//       .addCase(deleteCard.fulfilled, (state, action) => {
//         state.cards = state.cards.filter(c => c.card_id !== action.payload);
//       })

//       // ---- Add Comment ----
//       .addCase(addComment.fulfilled, (state, action) => {
//         const { card_id, comment } = action.payload;
//         const card = state.cards.find(c => c.card_id === card_id);
//         if (card) card.comments.push(comment);
//       });
//   }
// });

// export default cardSlice.reducer;



















// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async thunk to fetch all cards
// export const fetchCards = createAsyncThunk(
//   "cards/fetchCards",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("http://localhost:3000/cards");
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// // Async thunks for API calls
// export const addCard = createAsyncThunk(
//   "cards/addCard",
//   async (cardData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("http://localhost:3000/cards", cardData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// export const editCard = createAsyncThunk(
//   "cards/editCard",
//   async ({ card_id, data }, { rejectWithValue }) => {
//     try {
//       const response = await axios.patch(`http://localhost:3000/cards/${card_id}`, data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// export const deleteCard = createAsyncThunk(
//   "cards/deleteCard",
//   async (card_id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`http://localhost:3000/cards/${card_id}`);
//       return card_id;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// export const addComment = createAsyncThunk(
//   "cards/addComment",
//   async ({ card_id, comment }, { rejectWithValue }) => {
//     try {
//       const response = await axios.patch(`http://localhost:3000/cards/${card_id}/comments`, { comment });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// const cardSlice = createSlice({
//   name: "cards",
//   initialState: {
//     cards: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch Cards
//       .addCase(fetchCards.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchCards.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.cards = action.payload;
//       })
//       .addCase(fetchCards.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       // Add Card
//       .addCase(addCard.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(addCard.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.cards.push(action.payload);
//       })
//       .addCase(addCard.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       // Edit Card
//       .addCase(editCard.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(editCard.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         const card = state.cards.find((c) => c.card_id === action.payload.card_id);
//         if (card) Object.assign(card, action.payload);
//       })
//       .addCase(editCard.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       // Delete Card
//       .addCase(deleteCard.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(deleteCard.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.cards = state.cards.filter((c) => c.card_id !== action.payload);
//       })
//       .addCase(deleteCard.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       // Add Comment
//       .addCase(addComment.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(addComment.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         const card = state.cards.find((c) => c.card_id === action.payload.card_id);
//         if (card) card.comments = action.payload.comments;
//       })
//       .addCase(addComment.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export default cardSlice.reducer;





















// import { createSlice } from "@reduxjs/toolkit";

// const cardSlice = createSlice({
//   name: "cards",
//   initialState: [
//     {
//       card_id: 111,
//       title: "Social media campaign",
//       description: "Plan campaign for product launch",
//       dueDate: "2025-09-18",
//       labels: ["Social", "Campaign"],
//       attachments: ["https://example.com/campaign-plan"],
//       comments: ["Brainstormed initial ideas."]
//     },
//     {
//       card_id: 112,
//       title: "Design new logo",
//       description: "Create a modern logo for the brand",
//       dueDate: "2025-09-20",
//       labels: ["Design", "Branding"],
//       attachments: [],
//       comments: []
//     },
//     {
//       card_id: 113,
//       title: "Update website",
//       description: "Implement new features on the homepage",
//       dueDate: "2025-09-25",
//       labels: ["Development", "Web"],
//       attachments: [],
//       comments: []
//     },
//     {
//       card_id: 211,
//       title: "Research competitors",
//       description: "Analyze competitor marketing strategies",
//       dueDate: "2025-09-15",
//       labels: ["Research", "Analysis"],
//       attachments: [],
//       comments: []
//     },
//     {
//       card_id: 212,
//       title: "Plan webinar",
//       description: "Organize a webinar for product demo",
//       dueDate: "2025-09-22",
//       labels: ["Event", "Webinar"],
//       attachments: [],
//       comments: []
//     },
//     {
//       card_id: 213,
//       title: "Create content calendar",
//       description: "Plan content for the next quarter",
//       dueDate: "2025-09-30",
//       labels: ["Content", "Planning"],
//       attachments: [],
//       comments: []
//     }
//   ],
//   reducers: {
//     addCard: (state, action) => {
//       state.push(action.payload);
//     },
//     editCard: (state, action) => {
//       const { card_id, data } = action.payload;
//       const card = state.find(c => c.card_id === card_id);
//       if (card) Object.assign(card, data);
//     },
//     deleteCard: (state, action) => {
//       return state.filter(c => c.card_id !== action.payload);
//     },
//     addComment: (state, action) => {
//       const { card_id, comment } = action.payload;
//       const card = state.find(c => c.card_id === card_id);
//       if (card) card.comments.push(comment);
//     }
//   }
// });

// export const { addCard, editCard, deleteCard, addComment } = cardSlice.actions;
// export default cardSlice.reducer;












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
