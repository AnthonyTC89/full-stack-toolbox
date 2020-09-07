const express = require('express');

const data = ['hello', 'world'];

const router = express.Router();
router.get('/api/data', async (req, res) => {
  try {
    res.json(data);
  } catch (err) {
    res.sendStatus(404);
  }
});

router.post('/api/data', async (req, res) => {
  try {
    const { text } = req.body;
    data.push(text);
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(404);
  }
});

router.delete('/api/data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    data.splice(id, 1);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
