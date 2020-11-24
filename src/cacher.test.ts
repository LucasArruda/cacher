import Cacher from './cacher';

describe("Cacher", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('.set', () => {
    test('adds properly', () => {
      const key = 'a_key_0';
      const value = 'a_value';

      expect(Cacher.get(key)).toBe(undefined);
      Cacher.set(key, value);
      expect(Cacher.get(key)).toEqual(value);
    });

    test('replaces if already added', () => {
      const key = 'a_key_1';
      const value = 'a_value';
      const another_value = 'another_value';

      Cacher.set(key, value);
      expect(Cacher.get(key)).toEqual(value);
      Cacher.set(key, another_value);
      expect(Cacher.get(key)).toEqual(another_value);
    });
  });

  describe('.get', () => {
    test('gets properly', () => {
      const key = 'a_key_2';
      const value = 'a_value';

      expect(Cacher.get(key)).toBe(undefined);
      Cacher.set(key, value);
      expect(Cacher.get(key)).toEqual(value);
    });
  });

  describe('.has', () => {
    test('return false if not found', () => {
      expect(Cacher.has('not_inserted')).toBe(false);
    });

    test('return true if found', () => {
      const key = 'a_key_3';
      const value = 'a_value';

      Cacher.set(key, value);
      expect(Cacher.has(key)).toBe(true);
    });
  });

  describe('.del', () => {

    test('deletes properly', () => {
      const key = 'a_key_4';
      const value = 'a_value';

      Cacher.set(key, value);
      expect(Cacher.del(key)).toBe(true);
      expect(Cacher.has(key)).toBe(false);
    });

    test('return false if not found', () => {
      expect(Cacher.has('not_inserted')).toBe(false);
    });

    test('return true if deleted', () => {
      const key = 'a_key_5';
      const value = 'a_value';

      Cacher.set(key, value);
      expect(Cacher.del(key)).toBe(true);
      expect(Cacher.has(key)).toBe(false);
    });
  });
});