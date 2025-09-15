// APIs/BoardsApi.js

const express = require('express');
const router = express.Router();

// GET all boards
router.get('/', async (req, res) => {
  const BoardsCollection = req.app.get("BoardsCollection");
  try {
    const boards = await BoardsCollection.find().toArray();
    res.status(200).send(boards);
  } catch (err) {
    res.status(500).send({ message: "Error fetching boards", error: err.message });
  }
});

// POST a new board
router.post('/', async (req, res) => {
  const BoardsCollection = req.app.get("BoardsCollection");
  const newBoard = req.body;
  try {
    await BoardsCollection.insertOne(newBoard);
    res.status(201).send(newBoard);
  } catch (err) {
    res.status(500).send({ message: "Error adding board", error: err.message });
  }
});

// PUT - Update board title
router.put('/:id', async (req, res) => {
  const BoardsCollection = req.app.get("BoardsCollection");
  const boardId = req.params.id;
  const { title } = req.body;
  try {
    const result = await BoardsCollection.updateOne(
      { Board_id: boardId },
      { $set: { title: title } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Board not found" });
    }
    res.send({ Board_id: boardId, title });
  } catch (err) {
    res.status(500).send({ message: "Error updating board title", error: err.message });
  }
});

// DELETE - Remove board by ID
router.delete('/:id', async (req, res) => {
  const BoardsCollection = req.app.get("BoardsCollection");
  const boardId = req.params.id;
  try {
    const result = await BoardsCollection.deleteOne({ Board_id: boardId });
    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Board not found" });
    }
    res.send({ message: "Board deleted", Board_id: boardId });
  } catch (err) {
    res.status(500).send({ message: "Error deleting board", error: err.message });
  }
});

// POST - Add a list to a board
router.post('/:id/lists', async (req, res) => {
  const BoardsCollection = req.app.get("BoardsCollection");
  const boardId = req.params.id;
  const { listId } = req.body;
  try {
    const result = await BoardsCollection.updateOne(
      { Board_id: boardId },
      { $push: { Listids: listId } }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).send({ message: "Board not found or list not added" });
    }
    res.send({ boardId, listId });
  } catch (err) {
    res.status(500).send({ message: "Error adding list to board", error: err.message });
  }
});

// DELETE - Remove a list from a board
router.delete('/:id/lists/:listId', async (req, res) => {
  const BoardsCollection = req.app.get("BoardsCollection");
  const boardId = req.params.id;
  const listId = req.params.listId; // ensure it's a number
  try {
    const result = await BoardsCollection.updateOne(
      { Board_id: boardId },
      { $pull: { Listids: listId } }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).send({ message: "Board not found or list not removed" });
    }
    res.send({ boardId, listId });
  } catch (err) {
    res.status(500).send({ message: "Error removing list from board", error: err.message });
  }
});

// PUT - Move list within a board (reorder Listids array)
router.put('/:id/lists/move', async (req, res) => {
  const BoardsCollection = req.app.get("BoardsCollection");
  const boardId = req.params.id;
  const { sourceIndex, destinationIndex } = req.body;

  try {
    const board = await BoardsCollection.findOne({ Board_id: boardId });

    if (!board || !board.Listids) {
      return res.status(404).send({ message: "Board not found" });
    }

    const listIds = [...board.Listids];
    const [movedItem] = listIds.splice(sourceIndex, 1);
    listIds.splice(destinationIndex, 0, movedItem);

    await BoardsCollection.updateOne(
      { Board_id: boardId },
      { $set: { Listids: listIds } }
    );

    res.send({ boardId, sourceIndex, destinationIndex });
  } catch (err) {
    res.status(500).send({ message: "Error moving list in board", error: err.message });
  }
});

module.exports = router;
