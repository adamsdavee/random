// src/generator.ts
export interface Options {
    length: number;
    upper?: boolean;
    lower?: boolean;
    numbers?: boolean;
    symbols?: boolean;
  }
  
  const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LOWER = 'abcdefghijklmnopqrstuvwxyz';
  const NUMS  = '0123456789';
  const SYMS  = '!@#$%^&*()_+[]{}|;:,.<>?';
  
  export function generatePassword(opts: Options): string {
    const { length, upper = true, lower = true, numbers = true, symbols = true } = opts;
    if (length < 1) throw new Error('Length must be at least 1');
  
    let chars = '';
    if (upper)   chars += UPPER;
    if (lower)   chars += LOWER;
    if (numbers) chars += NUMS;
    if (symbols) chars += SYMS;
    if (!chars) throw new Error('At least one character set must be selected');
  
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);               // cryptographically secure :contentReference[oaicite:8]{index=8}
    return Array.from(array).map(i => chars[i % chars.length]).join('');
  }
  