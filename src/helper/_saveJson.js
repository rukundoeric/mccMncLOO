/* eslint-disable camelcase */
import json from 'jsonfile';
import axios from 'axios';
import scrapper from './_scrapper';

const filePath = `${__dirname}/../data/mcc-mnc-table.json`;

export default async (url) => {
  const { data: html } = await axios.get(url);
  const data_List = await scrapper(html);
  const error = json.writeFileSync(filePath, data_List, { spaces: 2 });
  if (error) {
    return {
      status: 500,
      message: 'Error',
      error
    };
  }
  return {
    status: 201,
    message: 'Data scrapped and saved successfully'
  };
};
