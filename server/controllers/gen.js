const axios = require("axios");
const cheerio = require("cheerio");

const getRequest = async (link) => {
  try {
    const response = await axios.get(link);
    const $ = cheerio.load(response.data);
    const name = $(".detail-product").find('[itemprop="name"]').text();
    const description = $(".info-detail-2").html().replace(/\s\s+/g, "");

   const productImage = $('.thumb').find('img').attr('data-lazy');

    const data = {
      title: name,
      description,
      productImage
    };
    return data;
  } catch (error) {
    console.log(error);
  }
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
    const listLink = [];

    await Promise.all($(".item-product-custom").map(async (i, el) => {
        const links = $(el).find('a').attr('href');
        const data = await getRequest(links);
        listLink.push(data);
    }))

    res.json(listLink);
}

module.exports = {
  generateLink,
  generateMultiLink
};
