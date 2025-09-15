// APIs/ListsApi.js

const express = require("express");
const router = express.Router();

// GET all lists
router.get("/", async (req, res) => {
  const ListsCollection = req.app.get("ListsCollection");
  try {
    const lists = await ListsCollection.find().toArray();
    res.status(200).send(lists);
  } catch (err) {
    res.status(500).send({ message: "Error fetching lists", error: err.message });
  }
});

// POST a new list
router.post("/", async (req, res) => {
  const ListsCollection = req.app.get("ListsCollection");
  const newList = req.body;
  try {
    await ListsCollection.insertOne(newList);
    res.status(201).send(newList);
  } catch (err) {
    res.status(500).send({ message: "Error adding list", error: err.message });
  }
});


// PUT - Move a card between lists
router.put("/moveCard", async (req, res) => {
  const ListsCollection = req.app.get("ListsCollection");
  const { sourceListId, destinationListId, cardId } = req.body;

  try {
    const sourceList = await ListsCollection.findOne({ List_id: sourceListId });
    const destList = await ListsCollection.findOne({ List_id: destinationListId });

    if (!sourceList || !destList) {
      return res.status(404).send({ message: "Source or destination list not found" });
    }

    // Remove card from source
    await ListsCollection.updateOne(
      { List_id: sourceListId },
      { $pull: { card_ids: cardId } }
    );

    // Add card to destination
    await ListsCollection.updateOne(
      { List_id: destinationListId },
      { $push: { card_ids: cardId } }
    );

    res.send({ sourceListId, destinationListId, cardId });
  } catch (err) {
    res.status(500).send({ message: "Error moving card", error: err.message });
  }
});
// PUT - Edit list title
router.put("/:id", async (req, res) => {
  const ListsCollection = req.app.get("ListsCollection");
  const listId = req.params.id;
  const { title } = req.body;

  try {
    const result = await ListsCollection.updateOne(
      { List_id: listId },
      { $set: { title } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "List not found" });
    }
    res.send({ List_id: listId, title });
  } catch (err) {
    res.status(500).send({ message: "Error editing list", error: err.message });
  }
});

// DELETE a list
router.delete("/:id", async (req, res) => {
  const ListsCollection = req.app.get("ListsCollection");
  const listId = req.params.id;
  try {
    const result = await ListsCollection.deleteOne({ List_id: listId });
    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "List not found" });
    }
    res.send({ message: "List deleted", List_id: listId });
  } catch (err) {
    res.status(500).send({ message: "Error deleting list", error: err.message });
  }
});

// POST - Add a card to a list
router.post("/:id/cards", async (req, res) => {
  const ListsCollection = req.app.get("ListsCollection");
  const listId = req.params.id;
  const { cardId } = req.body;

  try {
    const result = await ListsCollection.updateOne(
      { List_id: listId },
      { $push: { card_ids: cardId } }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).send({ message: "List not found or card not added" });
    }
    res.send({ listId, cardId });
  } catch (err) {
    res.status(500).send({ message: "Error adding card", error: err.message });
  }
});

// DELETE - Remove a card from a list
router.delete("/:id/cards/:cardId", async (req, res) => {
  const ListsCollection = req.app.get("ListsCollection");
  const listId = req.params.id;
  const cardId = req.params.cardId;

  try {
    const result = await ListsCollection.updateOne(
      { List_id: listId },
      { $pull: { card_ids: cardId } }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).send({ message: "Card not found in list" });
    }
    res.send({ listId, cardId });
  } catch (err) {
    res.status(500).send({ message: "Error removing card", error: err.message });
  }
});


module.exports = router;

