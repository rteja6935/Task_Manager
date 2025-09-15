// // boardSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // ---------------------- API THUNKS ----------------------

// // Fetch all boards
// export const fetchBoards = createAsyncThunk(
//   "boards/fetchBoards",
//   async () => {
//     const res = await axios.get("http://localhost:3000/boards");
//     return res.data; // must be array
//   }
// );

// // Add new board
// export const addBoard = createAsyncThunk(
//   "boards/addBoard",
//   async (newBoard) => {
//     const res = await axios.post("http://localhost:3000/boards", newBoard);
//     return res.data; // created board
//   }
// );

// // Delete board
// export const deleteBoard = createAsyncThunk(
//   "boards/deleteBoard",
//   async (id) => {
//     await axios.delete(`http://localhost:3000/boards/${id}`);
//     return id;
//   }
// );

// // Edit board title
// export const editBoardTitleApi = createAsyncThunk(
//   "boards/editBoardTitleApi",
//   async ({ id, title }) => {
//     await axios.put(`http://localhost:3000/boards/${id}`, { title });
//     return { id, title };
//   }
// );

// // Add list to board
// export const addListToBoardApi = createAsyncThunk(
//   "boards/addListToBoardApi",
//   async ({ boardId, listId }) => {
//     await axios.post(`http://localhost:3000/boards/${boardId}/lists`, { listId });
//     return { boardId, listId };
//   }
// );

// // Move list inside board
// export const moveListApi = createAsyncThunk(
//   "boards/moveListApi",
//   async ({ boardId, sourceIndex, destinationIndex }) => {
//     await axios.put(`http://localhost:3000/boards/${boardId}/move-list`, {
//       sourceIndex,
//       destinationIndex,
//     });
//     return { boardId, sourceIndex, destinationIndex };
//   }
// );

// // ---------------------- SLICE ----------------------

// const boardSlice = createSlice({
//   name: "boards",
//   initialState: {
//     boards: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // ---- Fetch ----
//       .addCase(fetchBoards.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchBoards.fulfilled, (state, action) => {
//         state.loading = false;
//         state.boards = action.payload;
//       })
//       .addCase(fetchBoards.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })

//       // ---- Add ----
//       .addCase(addBoard.fulfilled, (state, action) => {
//         state.boards.push(action.payload);
//       })

//       // ---- Delete ----
//       .addCase(deleteBoard.fulfilled, (state, action) => {
//         state.boards = state.boards.filter(
//           (b) => b.Board_id !== action.payload
//         );
//       })

//       // ---- Edit Title ----
//       .addCase(editBoardTitleApi.fulfilled, (state, action) => {
//         const { id, title } = action.payload;
//         const board = state.boards.find((b) => b.Board_id === id);
//         if (board) board.title = title;
//       })

//       // ---- Add List ----
//       .addCase(addListToBoardApi.fulfilled, (state, action) => {
//         const { boardId, listId } = action.payload;
//         const board = state.boards.find((b) => b.Board_id === boardId);
//         if (board) board.Listids.push(listId);
//       })

//       // ---- Move List ----
//       .addCase(moveListApi.fulfilled, (state, action) => {
//         const { boardId, sourceIndex, destinationIndex } = action.payload;
//         const board = state.boards.find((b) => b.Board_id === boardId);
//         if (board) {
//           const [movedList] = board.Listids.splice(sourceIndex, 1);
//           board.Listids.splice(destinationIndex, 0, movedList);
//         }
//       });
//   },
// });

// export default boardSlice.reducer;






















// import { createSlice } from "@reduxjs/toolkit";

// const boardSlice = createSlice({
//   name: "boards",
//   initialState: [
//     { Board_id: "b1", title: "Project A", Listids: [1, 2] },
//     { Board_id: "b2", title: "Marketing", Listids: [31, 42] },
//   ],
//   reducers: {
//     addBoard: (state, action) => {
//       state.push(action.payload);
//     },
//     editBoardTitle: (state, action) => {
//       const { id, title } = action.payload;
//       const board = state.find((b) => b.Board_id === id);
//       if (board) board.title = title;
//     },
//     addListToBoard: (state, action) => {
//       const { boardId, listId } = action.payload;
//       const board = state.find((b) => b.Board_id === boardId);
//       if (board) board.Listids.push(listId);
//     },
//     deleteListFromBoard: (state, action) => {
//       const { boardId, listId } = action.payload;
//       const board = state.find((b) => b.Board_id === boardId);
//       if (board) {
//         board.Listids = board.Listids.filter(id => id !== listId);
//       }
//     },
//     deleteBoard: (state, action) => {
//       return state.filter((b) => b.Board_id !== action.payload);
//     },
//     moveList: (state, action) => {
//       const { boardId, sourceIndex, destinationIndex } = action.payload;
//       const board = state.find((b) => b.Board_id === boardId);
//       if (board) {
//         const [movedList] = board.Listids.splice(sourceIndex, 1);
//         board.Listids.splice(destinationIndex, 0, movedList);
//       }
//     },
//   },
// });

// export const {
//   addBoard,
//   editBoardTitle,
//   addListToBoard,
//   deleteListFromBoard,
//   deleteBoard,
//   moveList,
// } = boardSlice.actions;

// export default boardSlice.reducer;










import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../utils/axiosInstance";



// Async Thunks

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  const response = await axios.get("/boards");
  return response.data;
});

export const addBoard = createAsyncThunk("boards/addBoard", async (boardData) => {
  const response = await axios.post("/boards", boardData);
  return response.data;
});

export const editBoardTitle = createAsyncThunk("boards/editBoardTitle", async ({ id, title }) => {
  const response = await axios.put(`/boards/${id}`, { title });
  return response.data;
});

export const deleteBoard = createAsyncThunk("boards/deleteBoard", async (id) => {
  await axios.delete(`/boards/${id}`);
  return id;
});

export const addListToBoard = createAsyncThunk("boards/addListToBoard", async ({ boardId, listId }) => {
  const response = await axios.post(`/boards/${boardId}/lists`, { listId });
  return { boardId, listId };
});

export const deleteListFromBoard = createAsyncThunk("boards/deleteListFromBoard", async ({ boardId, listId }) => {
  await axios.delete(`/boards/${boardId}/lists/${listId}`);
  return { boardId, listId };
});

export const moveList = createAsyncThunk("boards/moveList", async ({ boardId, sourceIndex, destinationIndex }) => {
  const response = await axios.put(`/boards/${boardId}/lists/move`, {
    sourceIndex,
    destinationIndex,
  });
  return { boardId, sourceIndex, destinationIndex };
});

const boardSlice = createSlice({
  name: "boards",
  initialState: {
    boards: [],
    loading: false,
    error: null,
  },
  reducers: {}, // all logic handled in extraReducers
  extraReducers: (builder) => {
    builder
      // FETCH BOARDS
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ADD BOARD
      .addCase(addBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload);
      })

      // EDIT BOARD TITLE
      .addCase(editBoardTitle.fulfilled, (state, action) => {
        const { Board_id, title } = action.payload;
        const board = state.boards.find((b) => b.Board_id === Board_id);
        if (board) board.title = title;
      })

      // DELETE BOARD
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter((b) => b.Board_id !== action.payload);
      })

      // ADD LIST TO BOARD
      .addCase(addListToBoard.fulfilled, (state, action) => {
        const { boardId, listId } = action.payload;
        const board = state.boards.find((b) => b.Board_id === boardId);
        if (board) board.Listids.push(listId);
      })

      // DELETE LIST FROM BOARD
      .addCase(deleteListFromBoard.fulfilled, (state, action) => {
        const { boardId, listId } = action.payload;
        const board = state.boards.find((b) => b.Board_id === boardId);
        if (board) {
          board.Listids = board.Listids.filter((id) => id !== listId);
        }
      })

      // MOVE LIST
      .addCase(moveList.fulfilled, (state, action) => {
        const { boardId, sourceIndex, destinationIndex } = action.payload;
        const board = state.boards.find((b) => b.Board_id === boardId);
        if (board) {
          const [moved] = board.Listids.splice(sourceIndex, 1);
          board.Listids.splice(destinationIndex, 0, moved);
        }
      });
  },
});

export default boardSlice.reducer;


