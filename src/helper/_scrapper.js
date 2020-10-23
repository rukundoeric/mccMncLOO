import cheerio from "cheerio";
import _ from "lodash";

export default async (html) => {
  let $ = cheerio.load(html);
  let data_list = [];
  $("table#mncmccTable")
    .find("tbody tr")
    .each((i, element) => {
      let $row = $(element);
      let item = {};

      let col = $row.children();

      item.mcc = _.trim($(col[0]).text());
      item.mnc = _.trim($(col[1]).text());
      item.iso = _.trim($(col[2]).text());
      item.country = _.trim($(col[3]).text());
      item.countrycode = _.trim($(col[4]).text());
      item.network = _.trim($(col[5]).text());

      data_list.push(item);
    });
  return data_list;
};
