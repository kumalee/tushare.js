import axios from "axios";
import { api, endpoint } from "./const";

type QueryParam = {
  api_name: string,
  params?: any,
  fields?: string[],
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

interface Tu {
  token: String;
  api: any;
  query(param: QueryParam): Promise<Result>; //method
  formatData(data: QueryData): any;
}

class TuShare implements Tu {
  token: string;
  api: any;

  constructor(token: string) {
    let _this = this;
    _this.token = token;
    _this.api = api;
  }

  /**
   *
   * @param {queryParam} param
   * @param {any} params
   * @param {array} fields
   */
  async query(param: QueryParam): Promise<Result> {
    const { api_name, params, fields } = param;
    if (!this.api[api_name]) {
      throw new Error("API not Found");
    }

    // if fields not set, output all fields of current api
    const _fields = (fields && fields.length) ? fields : this.api[api_name].fields;

    try {
      const response = await axios.post(endpoint, {
        api_name: api_name,
        token: this.token,
        params,
        fields: _fields,
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

export default TuShare;
