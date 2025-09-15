import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../CSS/BoardDetails.css";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { LiaCommentSolid } from "react-icons/lia";
import { useSelector, useDispatch } from "react-redux";
  import { v4 as uuidv4 } from 'uuid';
import {
  fetchBoards,
  addBoard,
  editBoardTitle,
  deleteBoard,
  moveList,
  addListToBoard,
  deleteListFromBoard,
} from "../Slices/BoardSlice.js";
import {
  fetchLists,
  removeCardFromList,
  addCardToList,
  addList,
  moveCardBetweenLists,
  deleteList,
  editListTitle,
} from "../Slices/ListSlice.js";
import {
   fetchCards,
  addCard,
  editCard,
  deleteCard,
  addComment,
} from "../Slices/CardSlice.js";

const BoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards.boards);
  const lists = useSelector((state) => state.lists.lists);
  const cards = useSelector((state) => state.cards.cards);

  const board = boards.find(b => b.Board_id === id);
  console.log("Board Data:", board);
  const boardLists = board ? board.Listids
    .map(listId => lists.find(list => list.List_id === listId))
    .filter(list => list !== undefined) : [];

  const getCardsForList = (listId) => {
    const list = lists.find(l => l.List_id === listId);
    if (!list) return [];
    return list.card_ids
      .map(cardId => cards.find(c => c.card_id === cardId))
      .filter(card => card !== undefined);
  };

  const [activeList, setActiveList] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");
  const [newCardDueDate, setNewCardDueDate] = useState("");
  const [newCardLabels, setNewCardLabels] = useState("");
  const [newCardAttachments, setNewCardAttachments] = useState("");
  const [addingList, setAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const [editingList, setEditingList] = useState(null);
  const [editingListTitle, setEditingListTitle] = useState("");

  const [editingCard, setEditingCard] = useState(null);
  const [editingCardData, setEditingCardData] = useState({
    title: "",
    description: "",
    dueDate: "",
    labels: "",
    attachments: "",
  });

  const [editingBoard, setEditingBoard] = useState(false);
  const [editingBoardTitle, setEditingBoardTitle] = useState("");
  const [commentPopup, setCommentPopup] = useState(null);
  const [newComment, setNewComment] = useState("");

  const [draggedList, setDraggedList] = useState(null);
  const [draggedOverList, setDraggedOverList] = useState(null);
  const [draggedCard, setDraggedCard] = useState(null);
  const [draggedCardSource, setDraggedCardSource] = useState(null);
  const [isDraggingOverCards, setIsDraggingOverCards] = useState(false);

  useEffect(() => {
    if (board) setEditingBoardTitle(board.title);
    console.log("Board Data:", board);
  }, [board]);

  useEffect(() => {
    dispatch(fetchBoards());
    dispatch(fetchLists());
    dispatch(fetchCards());
  }, [dispatch, id]);
  // --- Board Functions ---
  const handleEditBoard = () => {
    if (!editingBoardTitle.trim()) return;
    dispatch(editBoardTitle({ id, title: editingBoardTitle }));
    dispatch(fetchBoards());
    setEditingBoard(false);
  };
  // const handleDeleteBoard = () => {
  //   dispatch(deleteBoard(id));
  //   dispatch(fetchBoards());
  //   alert("Board deleted!");
    
  // };

  // --- Card Functions ---
  const handleAddCard = (listId) => {
    if (!newCardTitle.trim()) return;
   
function generateCardId(prefix = "C") {
  const uuid = uuidv4(); // generates something like "8c08f0d4-9e25-4c91-8463-385e6f9f2a3d"
  const numericPart = parseInt(uuid.replace(/\D/g, "").slice(0, 4)); // extract first 4 digits
  return `${prefix}${numericPart}`;
}

const newCardId = generateCardId();

    const newCard = {
      card_id: newCardId,
      title: newCardTitle,
      description: newCardDescription,
      dueDate: newCardDueDate,
      labels: newCardLabels
        ? newCardLabels.split(",").map((l) => l.trim())
        : [],
      attachments: newCardAttachments
        ? newCardAttachments.split(",").map((a) => a.trim())
        : [],
      comments: [],
    };
    dispatch(addCard(newCard));
    dispatch(addCardToList({ listId, cardId: newCardId }));
    dispatch(moveCardBetweenLists({
      sourceListId: null,
      destinationListId: listId,
      cardId: newCardId
    }));
    dispatch(fetchCards());
    dispatch(fetchLists());
    setNewCardTitle("");
    setNewCardDescription("");
    setNewCardDueDate("");
    setNewCardLabels("");
    setNewCardAttachments("");
    setActiveList(null);
  };

  const handleEditCard = (listId, cardId) => {
    if (!editingCardData.title.trim()) return;
    const updatedCard = {
      title: editingCardData.title,
      description: editingCardData.description,
      dueDate: editingCardData.dueDate,
      labels: editingCardData.labels
        ? editingCardData.labels.split(",").map((l) => l.trim())
        : [],
      attachments: editingCardData.attachments
        ? editingCardData.attachments.split(",").map((a) => a.trim())
        : [],
    };
    dispatch(editCard({ card_id: cardId, data: updatedCard }));
    setEditingCard(null);
    setEditingCardData({
      title: "",
      description: "",
      dueDate: "",
      labels: "",
      attachments: "",
    });
    
    dispatch(fetchCards());
  };

  const handleDeleteCard = (listId, cardId) => {
    dispatch(moveCardBetweenLists({
      sourceListId: listId,
      destinationListId: null,
      cardId: cardId
    }));
    dispatch(deleteCard(cardId));
    dispatch(fetchCards());
  };

  // --- List Functions ---
  const handleAddList = () => {
    if (!newListTitle.trim()) return;
   function generateListId(prefix = "L") {
  const uuid = uuidv4(); // generates something like "8c08f0d4-9e25-4c91-8463-385e6f9f2a3d"
  const numericPart = parseInt(uuid.replace(/\D/g, "").slice(0, 4)); // extract first 4 digits
  return `${prefix}${numericPart}`;
}

const newListId = generateListId(); 
    const newList = {
      List_id: newListId,
      title: newListTitle,      
      card_ids: [],
    };
    dispatch(addList(newList));
    dispatch(addListToBoard({ boardId: id, listId: newListId }));
    dispatch(fetchLists());
    setNewListTitle("");
    setAddingList(false);
  };

  const handleEditList = (listId) => {
    if (!editingListTitle.trim()) return;
    dispatch(editListTitle({ listId, title: editingListTitle }));
    dispatch(fetchLists());
    setEditingList(null);
    setEditingListTitle("");

  };

  const handleDeleteList = (listId) => {
    // Delete all cards in the list
    const list = lists.find(l => l.List_id === listId);
    if (list && list.card_ids) {
      list.card_ids.forEach(cardId => {
        dispatch(deleteCard(cardId));
      });
    }
    // Delete the list from both list slice and board
    dispatch(deleteList(listId));
    dispatch(deleteListFromBoard({ boardId: id, listId }));
    dispatch(fetchLists());
    alert("List deleted!");
  };

  // --- Comment Functions ---
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    dispatch(addComment({
      card_id: commentPopup.cardId,
      comment: newComment
    }));
    dispatch(fetchCards());
    setNewComment("");
  };

  // --- Drag and Drop for Lists ---
  const handleListDragStart = (e, listId) => {
    setDraggedList(listId);
    e.dataTransfer.setData("listId", listId);
    e.dataTransfer.effectAllowed = "move";
    e.stopPropagation();
  };
  const handleListDragOver = (e, listId) => {
    e.preventDefault();
    setDraggedOverList(listId);
    e.stopPropagation();
  };
  const handleListDragEnd = () => {
    setDraggedList(null);
    setDraggedOverList(null);
  };
  const handleListDrop = (e, targetListId) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedList && draggedList !== targetListId) {
      const sourceIndex = boardLists.findIndex(list => list.List_id === draggedList);
      const targetIndex = boardLists.findIndex(list => list.List_id === targetListId);
      dispatch(moveList({
        boardId: id,
        sourceIndex,
        destinationIndex: targetIndex,
        listId: draggedList
      }));
    }
    setDraggedList(null);
    setDraggedOverList(null);
  };

  // --- Drag and Drop for Cards ---
  const handleCardDragStart = (e, cardId, sourceListId) => {
    setDraggedCard(cardId);
    setDraggedCardSource(sourceListId);
    e.dataTransfer.setData("cardId", cardId);
    e.dataTransfer.setData("sourceListId", sourceListId);
    e.dataTransfer.effectAllowed = "move";
    e.stopPropagation();
  };
  const handleCardDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOverCards(true);
    e.stopPropagation();
  };
  const handleCardDragLeave = () => {
    setIsDraggingOverCards(false);
  };
  const handleCardDragEnd = () => {
    setDraggedCard(null);
    setDraggedCardSource(null);
    setIsDraggingOverCards(false);
  };
  const handleCardDrop = (e, targetListId) => {
    e.preventDefault();
    setIsDraggingOverCards(false);
    e.stopPropagation();
    if (
      draggedCard &&
      draggedCardSource &&
      draggedCardSource !== targetListId
    ) {
      dispatch(moveCardBetweenLists({
        sourceListId: draggedCardSource,
        destinationListId: targetListId,
        cardId: draggedCard
      }));
    }
    setDraggedCard(null);
    setDraggedCardSource(null);
  };

  if (!board) return <div>Loading...</div>;
  return (
    <div className="board-detail">
      {/* Board Title */}
      <div className="board-header">
        {editingBoard ? (
          <div className="edit-board">
            <input
              type="text"
              value={editingBoardTitle}
              onChange={(e) => setEditingBoardTitle(e.target.value)}
            />
            <button onClick={handleEditBoard}>OK</button>
            <button onClick={() => setEditingBoard(false)}>Cancel</button>
          </div>
        ) : (
          <h2>
            {board.title}{" "}
            <button
              onClick={() => {
                setEditingBoard(true);
                setEditingBoardTitle(board.title);
              }}
            >
              <CiEdit />
            </button>
            {/* <button onClick={handleDeleteBoard}>
              <MdDeleteOutline />
            </button> */}
          </h2>
        )}
      </div>
      <div className="lists-container">
        {boardLists.map(list => (
          <div
            key={list.List_id}
            className={`list-column ${draggedList === list.List_id ? 'dragging' : ''} ${draggedOverList === list.List_id ? 'drag-over' : ''}`}
            draggable
            onDragStart={(e) => handleListDragStart(e, list.List_id)}
            onDragOver={(e) => handleListDragOver(e, list.List_id)}
            onDragEnd={handleListDragEnd}
            onDrop={(e) => handleListDrop(e, list.List_id)}
          >
            {editingList === list.List_id ? (
              <div className="edit-list">
                <input
                  type="text"
                  value={editingListTitle}
                  onChange={(e) => setEditingListTitle(e.target.value)}
                  placeholder="Enter list title"
                />
                <div className="btn-group">
                  <button onClick={() => handleEditList(list.List_id)}>OK</button>
                  <button onClick={() => setEditingList(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <h3>
                {list.title}
                <button
                  onClick={() => {
                    setEditingList(list.List_id);
                    setEditingListTitle(list.title);
                  }}
                >
                  <CiEdit />
                </button>
                <button onClick={() => handleDeleteList(list.List_id)}>
                  <MdDeleteOutline />
                </button>
              </h3>
            )}
            <div
              className={`cards ${isDraggingOverCards ? 'drop-zone' : ''}`}
              onDragOver={handleCardDragOver}
              onDragLeave={handleCardDragLeave}
              onDrop={(e) => handleCardDrop(e, list.List_id)}
            >
              {getCardsForList(list.List_id).map(card =>
                editingCard === card.card_id ? (
                  <div key={card.card_id} className="card-item edit-card">
                    <input
                      type="text"
                      value={editingCardData.title}
                      onChange={e =>
                        setEditingCardData({ ...editingCardData, title: e.target.value })
                      }
                      placeholder="Title"
                    />
                    <textarea
                      value={editingCardData.description}
                      onChange={e =>
                        setEditingCardData({ ...editingCardData, description: e.target.value })
                      }
                      placeholder="Description"
                    />
                    <input
                      type="date"
                      value={editingCardData.dueDate}
                      onChange={e =>
                        setEditingCardData({ ...editingCardData, dueDate: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      value={editingCardData.labels}
                      onChange={e =>
                        setEditingCardData({ ...editingCardData, labels: e.target.value })
                      }
                      placeholder="Labels (comma separated)"
                    />
                    <input
                      type="text"
                      value={editingCardData.attachments}
                      onChange={e =>
                        setEditingCardData({ ...editingCardData, attachments: e.target.value })
                      }
                      placeholder="Attachments (comma separated URLs)"
                    />
                    <button onClick={() => handleEditCard(list.List_id, card.card_id)}>
                      OK
                    </button>
                    <button onClick={() => setEditingCard(null)}>Cancel</button>
                  </div>
                ) : (
                  <div
                    key={card.card_id}
                    className={`card-item ${draggedCard === card.card_id ? 'card-dragging' : ''}`}
                    draggable
                    onDragStart={e => handleCardDragStart(e, card.card_id, list.List_id)}
                    onDragEnd={handleCardDragEnd}
                  >
                    <h4>{card.title}</h4>
                    {card.description && <p>{card.description}</p>}
                    {card.dueDate && (
                      <p>
                        <strong>Due:</strong> {card.dueDate}
                      </p>
                    )}
                    {card.labels && card.labels.length > 0 && (
                      <div className="labels">
                        {card.labels.map((label, i) => (
                          <span key={i} className="label">
                            {label}
                          </span>
                        ))}
                      </div>
                    )}
                    {card.attachments && card.attachments.length > 0 && (
                      <div className="attachments">
                        {card.attachments.map((att, i) => (
                          <a
                            key={i}
                            href={att}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Attachment {i + 1}
                          </a>
                        ))}
                      </div>
                    )}
                    <button
                      onClick={() => setCommentPopup({ listId: list.List_id, cardId: card.card_id })}>
                      <LiaCommentSolid />
                    </button>
                    <button
                      onClick={() => {
                        setEditingCard(card.card_id);
                        setEditingCardData({
                          title: card.title,
                          description: card.description || "",
                          dueDate: card.dueDate || "",
                          labels: card.labels ? card.labels.join(", ") : "",
                          attachments: card.attachments ? card.attachments.join(", ") : "",
                        });
                      }}
                    >
                      <CiEdit />
                    </button>
                    <button onClick={() => handleDeleteCard(list.List_id, card.card_id)}>
                      <MdDeleteOutline />
                    </button>
                  </div>
                )
              )}
            </div>

            {activeList === list.List_id ? (
              <div className="add-card-form">
                <input
                  type="text"
                  value={newCardTitle}
                  onChange={e => setNewCardTitle(e.target.value)}
                  placeholder="Enter card title"
                />
                <textarea
                  value={newCardDescription}
                  onChange={e => setNewCardDescription(e.target.value)}
                  placeholder="Enter description"
                />
                <input
                  type="date"
                  value={newCardDueDate}
                  onChange={e => setNewCardDueDate(e.target.value)}
                />
                <input
                  type="text"
                  value={newCardLabels}
                  onChange={e => setNewCardLabels(e.target.value)}
                  placeholder="Labels (comma separated)"
                />
                <input
                  type="text"
                  value={newCardAttachments}
                  onChange={e => setNewCardAttachments(e.target.value)}
                  placeholder="Attachments (comma separated URLs)"
                />
                <div className="btn-group">
                  <button onClick={() => handleAddCard(list.List_id)}>OK</button>
                  <button onClick={() => setActiveList(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <button
                className="add-card-btn"
                onClick={() => setActiveList(list.List_id)}
              >
                + Add Card
              </button>
            )}
          </div>
        ))}
        <div className="list-column add-list">
          {addingList ? (
            <div className="add-list-form">
              <input
                type="text"
                value={newListTitle}
                onChange={e => setNewListTitle(e.target.value)}
                placeholder="Enter list title"
              />
              <div className="btn-group">
                <button onClick={handleAddList}>OK</button>
                <button onClick={() => setAddingList(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setAddingList(true)}>+ Add New List</button>
          )}
        </div>
      </div>
      {commentPopup && (
        <div className="comment-popup">
          <div className="comment-popup-content">
            <h4>Comments</h4>
            {cards
              .find(c => c.card_id === commentPopup.cardId)
              ?.comments?.map((cmt, i) => (
                <p key={i} className="comment-item">
                  {cmt}
                </p>
              ))}
            <textarea
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Write a comment..."
            />
            <div className="btn-group">
              <button onClick={handleAddComment}>Save</button>
              <button onClick={() => setCommentPopup(null)}>✖</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};  
export default BoardDetail;