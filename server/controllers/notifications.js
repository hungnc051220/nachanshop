const mongoose = require("mongoose");
const Notification = require("../models/notification");

const updateNotification = async (req, res) => {
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send({ messsage: "ID không tồn tại" });

    const updatedNotification = await Notification.findByIdAndUpdate(
      _id,
      { mark: true },
      {
        new: true,
      }
    );

    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  updateNotification,
};
