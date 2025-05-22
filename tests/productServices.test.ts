import { searchProducts } from '../src/services/productServices';

describe('🔍 Product Search', () => {
  it('✅ returns results for a valid query', () => {
    const results = searchProducts('red', 10, 0);
    expect(results.length).toBeGreaterThan(0);
  });

  it('✅ works case-insensitively', () => {
    const lower = searchProducts('red', 10, 0);
    const upper = searchProducts('RED', 10, 0);
    expect(upper.length).toBeGreaterThan(0);
    expect(lower[0].id).toEqual(upper[0].id);
  });

  it('✅ respects pagination: limit and skip', () => {
    const all = searchProducts('red', 100, 0);
    const first5 = searchProducts('red', 5, 0);
    const next5 = searchProducts('red', 5, 5);

    expect(first5.length).toBeLessThanOrEqual(5);
    expect(next5[0]?.id).not.toEqual(first5[0]?.id);
  });

  it('🚫 returns nothing for too short queries (<2 chars)', () => {
    const results = searchProducts('a', 10, 0);
    expect(results.length).toBe(0);
  });

  it('🚫 returns nothing if query has no match', () => {
    const results = searchProducts('asdkjasdnasnd', 10, 0);
    expect(results.length).toBe(0);
  });
});

