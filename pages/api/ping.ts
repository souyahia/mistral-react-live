import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    message: 'Greetings from mistral-react-live api.',
    date: new Date().toISOString(),
    url: req.url,
  });
}
