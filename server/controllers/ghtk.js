const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const API_URL = "https://services.ghtklab.com";

const getFee = async (req, res) => {
  const {
    pick_province,
    pick_district,
    province,
    district,
    address,
    weight,
  } = req.body;
  try {
    const response = await fetch(
      `${API_URL}//services/shipment/fee?pick_province=${pick_province}&pick_district=${pick_district}&province=${province}&district=${district}&address=${address}&weight=${weight}&deliver_option=none`,
      {
        headers: { token: "B6Cb74D40E35ffcBb572951CaD4b27aAF336AEd7" },
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ messsage: error.message });
  }
};

module.exports = {
  getFee,
};
