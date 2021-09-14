import d from 'dotenv';
import TuShare from '../src/main';

d.config();
const t = new TuShare(process.env.token);

describe('TuShare Class', () => {
  test('api not found', async () => {
    try {
      const result = await t.query({ api_name: 'not_exits_api', params: { limit: 5, offset: 0 }});
    } catch (e) {
      expect(e.toString()).toBe('Error: API not Found');
    }
  });

  test('query failed', async () => {
    const result = await t.query({ api_name: 'stock_basic', params: { limit: -5, offset: 0 }});
    expect(result.isSuccess).toBe(false);
  });

  test('stock_basic', async () => {
    const result = await t.query({ api_name: 'stock_basic', params: { limit: 5, offset: 0 }});
    expect(result.isSuccess).toBe(true);
  });
});
