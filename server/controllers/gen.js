const axios = require("axios");
const cheerio = require("cheerio");

const getRequest = async (link) => {
  try {
    const response = await axios.get(link);
    const $ = cheerio.load(response.data);
    const name = $(".product-detail-heading .product-name").text();
    const description = $(".article-content").html();

    const listLinkImages = $(
      ".product-detail-images-wrap .swiper-slide .img"
    ).find("img");

    const url = "https://sakukostore.com.vn/";
    let images = [];
    listLinkImages.map((i, el) => {
      const image = url + $(el).attr("data-src");
      images.push(image);
    });

    const strSplit = link.split("/");
    const mainCategory = strSplit[3];
    const category = strSplit[4];
    const subCategory = strSplit[5];

    const data = {
      name,
      description,
      productImages: images,
      mainCategory,
      category,
      subCategory,
    };
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getDesc = async (link, productCode) => {
  const response = await axios.get(
    "https://japana.vn/load-product/loadDataContentProduct",
    {
      headers: {
        accept: "text/html, */*; q=0.01",
        "accept-language":
          "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        cookie:
          "PHPSESSID=ss8mhmuckm3a0q4kik4kd78lmj; __zi=3000.SSZzejyD4jyxY_cYWHeId3dVv-oF0b70AzNu_iqGHzjWYhxsnLGCt6A5lVcAKmxNAu6p-OvV1zStEG.1; product=2203%2C2203%2C2203%2C16257%2C16257%2C16257%2C16257%2C1242%2C16079%2C1242%2C1242%2C1058%2C4502%2C4502%2C881",
        Referer: link,
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: `data=%22${productCode}%22`,
      method: "POST",
    }
  );

  const data = response.data;
  return data;
};

const generateLink = async (req, res) => {
  const { link } = req.body;
  const data = await getRequest(link);
  res.json(data);
};

const generateMultiLink = async (req, res) => {
  const { link } = req.body;
  const response = await axios.get(link);
  const $ = cheerio.load(response.data);
  const listData = [];

  await Promise.all(
    $(".product-list .product-item").map(async (i, el) => {
      const links = $(el).find("a").attr("href");
      const data = await getRequest(links);
      listData.push(data);
    })
  );

  res.json(listData);
};

module.exports = {
  generateLink,
  generateMultiLink,
};
