import axios from "axios";
import { api } from "./const";

class Tushare {
  constructor() {

  }
}

/**
 *
 * @param {string} apiName
 * @param {object} params
 * @param {array} fields
 */
const query = async ({
  apiName = "",
  params = {},
  fields = [],
}) => {
  if (!apiName && apiName === "") {
    throw new Error("API is required");
  } else if (!api[apiName]) {
    throw new Error("API not Found");
  }

  try {
    const response = await axios.post(api.url, {
      api: apiName,
      token: process.env.TUSHARE_TOKEN,
      params,
      fields: fields,
    });
    if (response && response.data && response.data.code === 0) {
      let fields = response.data.data.fields;
      let items = response.data.data.items;
      let hasMore = response.data.data.has_more;

      let data = await formatData({ fields, items });

      return [
        true,
        data,
        hasMore,
      ];
    } else {
      return [false]
    }
  } catch (error) {
    throw error;
  }
}

/**
 * format data to an array like [{field: value}]
 * @param {Array} data
 */
const formatData = async (data) => {
    if (!data || data.length <= 0) return data;
    let fields = data.fields;
    let items = data.items;
    let result = [];
    if (!fields || fields.length === 0 || !items || items.length === 0) {
        return result;
    }
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
        let newItem = {};
        for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
            newItem[fields[fieldIndex]] = items[itemIndex][fieldIndex];
        }
        result.push(newItem);
    }
    return result;
}

export default query;
