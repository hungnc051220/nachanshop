const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const API_URL = "https://services.ghtklab.com";

const getFee = async (req, res) => {
  const { province, district, weight } = req.body;
  try {
    const paramUrl = `${API_URL}/services/shipment/fee?pick_province=Thành phố Hà Nội&pick_district=Quận Ba Đình&province=${province}&district=${district}&weight=${weight}&deliver_option=none`;
    const encode = encodeURI(paramUrl);

    const response = await fetch(encode, {
      headers: { Token: "B6Cb74D40E35ffcBb572951CaD4b27aAF336AEd7" },
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ messsage: error.message });
  }
};

const createOrder = async (req, res) => {
  const orderData = req.body;
  try {
    const response = await fetch(`${API_URL}/services/shipment/order/`, {
      method: "POST",
      body: JSON.stringify(orderData),
      headers: {
        "Content-Type": "application/json",
        Token: "B6Cb74D40E35ffcBb572951CaD4b27aAF336AEd7",
      },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ messsage: error.message });
  }
};

const checkOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`${API_URL}/services/shipment/v2/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Token: "B6Cb74D40E35ffcBb572951CaD4b27aAF336AEd7",
      },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ messsage: error.message });
  }
};

module.exports = {
  getFee,
  createOrder,
  checkOrder
};
