import type { NextApiRequest, NextApiResponse } from 'next';

interface IData {
  status: string;
}

export default function handler(
  _: NextApiRequest,
  res: NextApiResponse<IData>,
) {
  res.status(200).json({ status: 'Okay' });
}
