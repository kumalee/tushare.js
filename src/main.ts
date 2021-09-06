import axios from "axios";
import { api } from "./const";

type QueryParam = {
  apiName: string,
  params: any,
  fields: string[],
};

type QueryData = {
  fields: string[],
  items: string[],
  length: number,
}

type Result = {
  isSuccess: boolean,
  data?: [],
  hasMore?: boolean,
};

class Tushare {
  token: string;
  api: any;

  constructor(token: string) {
    this.token = token;
    this.api = api;
  }

  /**
   *
   * @param {queryParam} param
   * @param {any} params
   * @param {array} fields
   */
  async query(param: QueryParam): Promise<Result> {
    const { apiName, params, fields } = param;
    if (!this.api[apiName]) {
      throw new Error("API not Found");
    }

    try {
      const response = await axios.post(this.api.url, {
        api: apiName,
        token: this.token,
        params,
        fields: fields,
      });
      if (response && response.data && response.data.code === 0) {
        let fields = response.data.data.fields;
        let items = response.data.data.items;
        let hasMore = response.data.data.has_more;

        let data = await this.formatData({ fields, items, length: items.length });

        return {
          isSuccess: true,
          data,
          hasMore,
        };
      } else {
        return {
          isSuccess: false,
        };
      }
    } catch (error) {
      throw error;
    }
  }


  /**
   * format data to an array like [{field: value}]
   * @param {Array} data
   */
  formatData(data: QueryData): any {
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
}

export default Tushare;
