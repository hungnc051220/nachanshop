const axios = require("axios");
const cheerio = require("cheerio");
const fetch = require('node-fetch');

const getRequest = async (link) => {
  try {
    const response = await axios.get(link);
    const $ = cheerio.load(response.data);
    const name = $(".detail-product").find('[itemprop="name"]').text();

    const productCode = link.slice(link.indexOf("sp-") + 3)

    const description = await getDesc(link, productCode);

    const data = {
      title: name,
      description,
    };
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getDesc = async (link, productCode) => {
  const response = await fetch("https://japana.vn/load-product/loadDataContentProduct", {
    "headers": {
      "accept": "text/html, */*; q=0.01",
      "accept-language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      "cookie": "PHPSESSID=ss8mhmuckm3a0q4kik4kd78lmj; __zi=3000.SSZzejyD4jyxY_cYWHeId3dVv-oF0b70AzNu_iqGHzjWYhxsnLGCt6A5lVcAKmxNAu6p-OvV1zStEG.1; product=2203%2C2203%2C2203%2C16257%2C16257%2C16257%2C16257%2C1242%2C16079%2C1242%2C1242%2C1058%2C4502%2C4502%2C881",
      "Referer": link,
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": `data=%22${productCode}%22`,
    "method": "POST"
  });

  const data = await response.text();
  return data;
}

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
