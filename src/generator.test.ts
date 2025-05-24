import { generatePassword } from './generator';

describe('generatePassword', () => {
  it('generates correct length', () => {
    expect(generatePassword({ length: 10 })).toHaveLength(10);
  });

  it('includes uppercase when upper=true', () => {
    const pwd = generatePassword({ length: 20, upper: true, lower: false, numbers: false, symbols: false });
    expect(/[A-Z]/.test(pwd)).toBe(true);
  });

  it('includes lowercase when lower=true', () => {
    const pwd = generatePassword({ length: 20, upper: false, lower: true, numbers: false, symbols: false });
    expect(/[a-z]/.test(pwd)).toBe(true);
  });

  it('includes digits when numbers=true', () => {
    const pwd = generatePassword({ length: 20, upper: false, lower: false, numbers: true, symbols: false });
    expect(/\d/.test(pwd)).toBe(true);
  });

  it('includes symbols when symbols=true', () => {
    const pwd = generatePassword({ length: 20, upper: false, lower: false, numbers: false, symbols: true });
    expect(/[^A-Za-z0-9]/.test(pwd)).toBe(true);
  });

  it('throws on zero length', () => {
    expect(() => generatePassword({ length: 0 })).toThrow('Length must be at least 1');
  });

  it('throws if no sets selected', () => {
    expect(() => generatePassword({ length: 5, upper: false, lower: false, numbers: false, symbols: false }))
      .toThrow('At least one character set must be selected');
  });

  it('produces different outputs on subsequent calls', () => {
    const a = generatePassword({ length: 8 });
    const b = generatePassword({ length: 8 });
    expect(a).not.toEqual(b);
  });
});
