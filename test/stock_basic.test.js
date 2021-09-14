import TuShare from '../src/main';
import './token';

test('stock_basic', async () => {
  const t = new TuShare(process.env.token);
  const result = await t.stock_basic({limit: 5, offset: 0});
  expect(result.isSuccess).toBe(true);
});
