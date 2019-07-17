const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item Model
const Item = require("../../models/Item");

// @route   GET api/items
// @desc    Get All items
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create item
// @access  Private
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    title: req.body.title,
    desc: req.body.desc,
    end_date: req.body.end_date
  });

  newItem.save().then(item => res.json(item));
});

// @route POST UPDATE/:Id
// @desc Update item
router.post("/update/:id", (req, res) => {
  Item.findById(req.params.id, (err, item) => {
    if (!item) res.status(404).json({ success: false });
    else {
      item.title = req.body.title;
      item.desc = req.body.desc;
      item.end_date = req.body.end_date;
    }
    item
      .save()
      .then(item => {
        res.json({ success: true });
      })
      .catch(err => res.status(404).json({ success: false }));
  });
});

// @route   DELTE api/items/:id
// @desc    Delete item
// @access  Private
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
