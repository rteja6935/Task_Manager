// APIs/CardsApi.js

const express = require("express");
const router = express.Router();

// Get all cards
router.get("/", async (req, res) => {
  const CardsCollection = req.app.get("CardsCollection");
  try {
    const cards = await CardsCollection.find().toArray();
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send({ message: "Error fetching cards", error: err.message });
  }
});

// Add a new card
router.post("/", async (req, res) => {
  const CardsCollection = req.app.get("CardsCollection");
  const newCard = req.body;

  try {
    await CardsCollection.insertOne(newCard);
    res.status(201).send(newCard);
  } catch (err) {
    res.status(500).send({ message: "Error adding card", error: err.message });
  }
});

// Edit card
router.put("/:id", async (req, res) => {
  const CardsCollection = req.app.get("CardsCollection");
  const cardId = req.params.id;
  const updatedData = req.body;

  try {
    const result = await CardsCollection.findOneAndUpdate(
      { card_id: cardId },
      { $set: updatedData },
      { returnDocument: 'after' }
    );
    console.log(result);
    if (!result) {
      return res.status(404).send({ message: "Card not found" });
    }

    res.send(result);
  } catch (err) {
    res.status(500).send({ message: "Error editing card", error: err.message });
  }
});

// Delete card
router.delete("/:id", async (req, res) => {
  const CardsCollection = req.app.get("CardsCollection");
  const cardId = req.params.id;

  try {
    const result = await CardsCollection.deleteOne({ card_id: cardId });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Card not found" });
    }

    res.send({ message: "Card deleted", card_id: cardId });
  } catch (err) {
    res.status(500).send({ message: "Error deleting card", error: err.message });
  }
});

// Add a comment to a card
router.post("/:id/comments", async (req, res) => {
  const CardsCollection = req.app.get("CardsCollection");
  const cardId = req.params.id;
  const { comment } = req.body;

  try {
    const result = await CardsCollection.updateOne(
      { card_id: cardId },
      { $push: { comments: comment } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Card not found" });
    }

    res.send({ card_id: cardId, comment });
  } catch (err) {
    res.status(500).send({ message: "Error adding comment", error: err.message });
  }
});

module.exports = router;
