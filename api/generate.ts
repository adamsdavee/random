import { generatePassword } from '../src/generator';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const length = Number(req.query.length) || 12;
  try {
    const pwd = generatePassword({ length });
    res.status(200).json({ password: pwd });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
