const express = require('express');

const data = ['hello', 'world'];

const router = express.Router();

router.get('/api/data', async (req, res) => {
  try {
    res.status(200).send(data);
  } catch (err) {
    res.sendStatus(404);
  }
});

router.post('/api/data', async (req, res) => {
  try {
    const { text } = req.body;
    if (text) {
      data.push(text);
      res.sendStatus(201);
    } else {
      res.sendStatus(404);
    }
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
