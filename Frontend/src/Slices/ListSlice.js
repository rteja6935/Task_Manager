// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // ---------------------- API THUNKS ----------------------

// // Fetch all lists
// export const fetchLists = createAsyncThunk(
//   "lists/fetchLists",
//   async () => {
//     const res = await axios.get("http://localhost:3000/lists");
//     return res.data;
//   }
// );

// // Add new list
// export const addList = createAsyncThunk(
//   "lists/addList",
//   async (newList) => {
//     const res = await axios.post("http://localhost:3000/lists", newList);
//     return res.data;
//   }
// );

// // Add card to list
// export const addCardToList = createAsyncThunk(
//   "lists/addCardToList",
//   async ({ listId, cardId }) => {
//     await axios.post(`http://localhost:3000/lists/${listId}/cards`, { cardId });
//     return { listId, cardId };
//   }
// );

// // Remove card from list
// export const removeCardFromList = createAsyncThunk(
//   "lists/removeCardFromList",
//   async ({ listId, cardId }) => {
//     await axios.delete(`http://localhost:3000/lists/${listId}/cards/${cardId}`);
//     return { listId, cardId };
//   }
// );

// // Move card between lists
// export const moveCardBetweenLists = createAsyncThunk(
//   "lists/moveCardBetweenLists",
//   async ({ sourceListId, destinationListId, cardId }) => {
//     await axios.put(`http://localhost:3000/lists/move-card`, {
//       sourceListId,
//       destinationListId,
//       cardId
//     });
//     return { sourceListId, destinationListId, cardId };
//   }
// );

// // ---------------------- SLICE ----------------------

// const listSlice = createSlice({
//   name: "lists",
//   initialState: {
//     lists: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // ---- Fetch ----
//       .addCase(fetchLists.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchLists.fulfilled, (state, action) => {
//         state.loading = false;
//         state.lists = action.payload;
//       })
//       .addCase(fetchLists.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })

//       // ---- Add ----
//       .addCase(addList.fulfilled, (state, action) => {
//         state.lists.push(action.payload);
//       })

//       // ---- Add Card to List ----
//       .addCase(addCardToList.fulfilled, (state, action) => {
//         const { listId, cardId } = action.payload;
//         const list = state.lists.find(l => l.List_id === listId);
//         if (list) list.card_ids.push(cardId);
//       })

//       // ---- Remove Card from List ----
//       .addCase(removeCardFromList.fulfilled, (state, action) => {
//         const { listId, cardId } = action.payload;
//         const list = state.lists.find(l => l.List_id === listId);
//         if (list) {
//           list.card_ids = list.card_ids.filter(id => id !== cardId);
//         }
//       })

//       // ---- Move Card Between Lists ----
//       .addCase(moveCardBetweenLists.fulfilled, (state, action) => {
//         const { sourceListId, destinationListId, cardId } = action.payload;
        
//         // Remove card from source list
//         const sourceList = state.lists.find(l => l.List_id === sourceListId);
//         if (sourceList) {
//           sourceList.card_ids = sourceList.card_ids.filter(id => id !== cardId);
//         }
        
//         // Add card to destination list
//         const destinationList = state.lists.find(l => l.List_id === destinationListId);
//         if (destinationList) {
//           destinationList.card_ids.push(cardId);
//         }
//       });
//   }
// });

// export default listSlice.reducer;





















// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async thunk to fetch all lists
// export const fetchLists = createAsyncThunk(
//   "lists/fetchLists",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("http://localhost:3000/lists");
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// // Async thunk to edit list title
// export const editListTitle = createAsyncThunk(
//   "lists/editListTitle",
//   async ({ listId, title }, { rejectWithValue }) => {
//     try {
//       console.log("Editing list123:", listId, title);
//       const response = await axios.patch(`http://localhost:3000/lists/${listId}`, { title });
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );
// // Async thunk to delete a list
// export const deleteList = createAsyncThunk(
//   "lists/deleteList",
//   async ({ listId, boardId }, { rejectWithValue }) => {
//     try {
//       await axios.delete(`http://localhost:3000/lists/${listId}`);
//       return { listId, boardId };
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// // Async thunks for API calls
// export const addList = createAsyncThunk(
//   "lists/addList",
//   async (listData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("http://localhost:3000/lists", listData);
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// export const addCardToList = createAsyncThunk(
//   "lists/addCardToList",
//   async ({ listId, cardId }, { rejectWithValue }) => {
//     try {
//       const response = await axios.patch(`http://localhost:3000/lists/${listId}/cards`, { cardId });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// export const removeCardFromList = createAsyncThunk(
//   "lists/removeCardFromList",
//   async ({ listId, cardId }, { rejectWithValue }) => {
//     try {
//       const response = await axios.patch(`http://localhost:3000/lists/${listId}/cards/remove`, { cardId });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// export const moveCardBetweenLists = createAsyncThunk(
//   "lists/moveCardBetweenLists",
//   async ({ sourceListId, destinationListId, cardId }, { rejectWithValue }) => {
//     try {
//       const response = await axios.patch(`http://localhost:3000/lists/move-card`, {
//         sourceListId,
//         destinationListId,
//         cardId,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// const listSlice = createSlice({
//   name: "lists",
//   initialState: {
//     lists: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch Lists
//       .addCase(fetchLists.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchLists.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.lists = action.payload;
//       })
//       .addCase(fetchLists.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       // Add List
//       .addCase(addList.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(addList.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.lists.push(action.payload);
//       })
//       .addCase(addList.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       // Add Card to List
//       .addCase(addCardToList.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(addCardToList.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         const list = state.lists.find((l) => l.List_id === action.payload.List_id);
//         if (list) list.card_ids = action.payload.card_ids;
//       })
//       .addCase(addCardToList.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       // Edit List Title
//       .addCase(editListTitle.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(editListTitle.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         const list = state.lists.find((l) => l.List_id === action.payload.List_id);
//         if (list) list.title = action.payload.title;
//       })
//       .addCase(editListTitle.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       // Delete List
//       .addCase(deleteList.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(deleteList.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.lists = state.lists.filter((l) => l.List_id !== action.payload.listId);
//       })
//       .addCase(deleteList.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       // Remove Card from List
//       .addCase(removeCardFromList.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(removeCardFromList.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         const list = state.lists.find((l) => l.List_id === action.payload.List_id);
//         if (list) list.card_ids = action.payload.card_ids;
//       })
//       .addCase(removeCardFromList.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       // Move Card Between Lists
//       .addCase(moveCardBetweenLists.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(moveCardBetweenLists.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         const { sourceListId, destinationListId, card_ids } = action.payload;
//         const sourceList = state.lists.find((l) => l.List_id === sourceListId);
//         const destinationList = state.lists.find((l) => l.List_id === destinationListId);
//         if (sourceList) sourceList.card_ids = card_ids.source;
//         if (destinationList) destinationList.card_ids = card_ids.destination;
//       })
//       .addCase(moveCardBetweenLists.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export default listSlice.reducer;











// import { createSlice } from "@reduxjs/toolkit";

// const listSlice = createSlice({
//   name: "lists",
//   initialState: [
//     { List_id: 1, title: "To Do", card_ids: [111, 112] },
//     { List_id: 2, title: "In Progress", card_ids: [113] },
//     { List_id: 31, title: "Ideas", card_ids: [211, 212] },
//     { List_id: 42, title: "Backlog", card_ids: [213] }
//   ],
//   reducers: {
//     addList: (state, action) => {
//       state.push(action.payload);
//     },
//     addCardToList: (state, action) => {
//       const { listId, cardId } = action.payload;
//       const list = state.find(l => l.List_id === listId);
//       if (list) list.card_ids.push(cardId);
//     },
//     removeCardFromList: (state, action) => {
//       const { listId, cardId } = action.payload;
//       const list = state.find(l => l.List_id === listId);
//       if (list) {
//         list.card_ids = list.card_ids.filter(id => id !== cardId);
//       }
//     },
//     moveCardBetweenLists: (state, action) => {
//       const { sourceListId, destinationListId, cardId } = action.payload;
//       const sourceList = state.find(l => l.List_id === sourceListId);
//       if (sourceList) {
//         sourceList.card_ids = sourceList.card_ids.filter(id => id !== cardId);
//       }
//       const destinationList = state.find(l => l.List_id === destinationListId);
//       if (destinationList) {
//         destinationList.card_ids.push(cardId);
//       }
//     },
//     deleteList: (state, action) => {
//       return state.filter(l => l.List_id !== action.payload);
//     },
//     editListTitle: (state, action) => {
//       const { listId, title } = action.payload;
//       const list = state.find(l => l.List_id === listId);
//       if (list) list.title = title;
//     }
//   }
// });

// export const { addList, addCardToList, removeCardFromList, moveCardBetweenLists, deleteList, editListTitle } = listSlice.actions;
// export default listSlice.reducer;








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
