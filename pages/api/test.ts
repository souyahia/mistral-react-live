import { NextApiRequest, NextApiResponse } from 'next';
import { Mistral } from '@mistralai/mistralai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.MISTRAL_API_KEY) {
    res.status(500).json({
      message: 'Internal server error : Mistral API Key not defined.',
    });
  }

  const mistral = new Mistral({
    apiKey: process.env.MISTRAL_API_KEY ?? '',
  });

  const result = await mistral.chat.complete({
    model: 'codestral-latest',
    messages: [
      {
        content: 'Produce React code to generate a small blue button.',
        role: 'user',
      },
    ],
  });

  res.status(200).json(result);
}
