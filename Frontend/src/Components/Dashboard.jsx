import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../CSS/DashBoard.css";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { fetchBoards,editBoardTitle, deleteBoard, addBoard } from "../Slices/BoardSlice";
import { MdCancel } from "react-icons/md";
import { TiTick } from "react-icons/ti";
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get boards from Redux store
  const boards = useSelector((state) => state.boards.boards);
  
  const [editingBoard, setEditingBoard] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const [addingBoard, setAddingBoard] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");
    useEffect(() => {
      dispatch(fetchBoards());
    
    }, []);
  const handleBoardClick = (id) => {
    navigate(`/home/BoardDetails/${id}`);
  };

  // Edit board
  const handleEditBoard = (id) => {
    if (!editingTitle.trim()) return;
    
    dispatch(editBoardTitle({ id, title: editingTitle }));
    setEditingBoard(null);
    setEditingTitle("");
  };

  // Delete board
  const handleDeleteBoard = (id) => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      dispatch(deleteBoard(id));
    }
  };

  // Add new board
  const handleAddBoard = () => {
    if (!newBoardTitle.trim()) return;
    
    const newBoardId = "b" + (boards.length + 1); // Generate unique ID
    
    const newBoard = {
      Board_id: newBoardId,
      title: newBoardTitle,
      Listids: [],
    };
    
    dispatch(addBoard(newBoard));
    setAddingBoard(false);
    setNewBoardTitle("");
  };

  return (
    <div className="sidebar">
      <h2 className="title">Your Boards</h2>
      <div className="boards-list">
        {boards.map((board) => (
          <div key={board.Board_id} className="board-card-wrapper">
            {editingBoard === board.Board_id ? (
              <div className="edit-board-card">
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <button onClick={() => handleEditBoard(board.Board_id)}>OK</button>
                <button onClick={() => setEditingBoard(null)}>Cancel</button>
              </div>
            ) : (
              <div className="board-card">
                <span onClick={() => handleBoardClick(board.Board_id)}>
                  {board.title}
                </span>
                <div className="board-actions">
                  <button
                    onClick={() => {
                      setEditingBoard(board.Board_id);
                      setEditingTitle(board.title);
                    }}
                  >
                    <CiEdit />
                  </button>
                  <button onClick={() => handleDeleteBoard(board.Board_id)}>
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add New Board */}
        <div className="board-card-wrapper">
          {addingBoard ? (
            <div className="edit-board-card">
              <input
                type="text"
                value={newBoardTitle}
                onChange={(e) => setNewBoardTitle(e.target.value)}
                placeholder="Enter board title"
              />
              <button onClick={handleAddBoard}><TiTick /></button>
              <button onClick={() => setAddingBoard(false)}><MdCancel /></button>
            </div>
          ) : (
            <div
              className="board-card new-board"
              onClick={() => setAddingBoard(true)}
            >
              + Create New Board
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

