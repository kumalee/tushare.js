const TuShare = require('../dist/tushare.js');
const dotenv = require('./token');

test('stock_basic', async () => {
  const t = new TuShare(dotenv.parsed['token']);
  const result = await t.stock_basic();
  expect(result.isSuccess).toBe(true);
});
