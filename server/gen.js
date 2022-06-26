const axios = require("axios");
const cheerio = require("cheerio");

const getRequest = async (link) => {
  try {
    const response = await axios.get(link);
    const $ = cheerio.load(response.data);
    const name = $(".product-detail-heading .product-name").text();
    const description = $(".product-detail-article .article-content").text();
    const url = "https://sakukostore.com.vn/";
    const listLinkImages = $(
      ".product-detail-images-wrap .swiper-slide .img"
    ).find("img");

    let images = [];
    listLinkImages.map((i, el) => {
      const image = url + $(el).attr("data-src");
      images.push(image);
    });

    const data = {
      title: name,
      description,
      productImages: images,
    };
    return data;
  } catch (error) {
    console.log(error);
  }
};

const generateMultiLink = async (req, res) => {
  // const { link } = req.body;
  const link =
    "https://sakukostore.com.vn/cham-soc-sac-dep/cham-soc-da/kem-duong";
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
  res.status(200).json(listData);
};

const link = "https://sakukostore.com.vn/cham-soc-sac-dep/cham-soc-da/kem-duong";
const strSplit = link.split("/");
console.log(strSplit);
