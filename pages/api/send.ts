import { NextApiRequest, NextApiResponse } from 'next';
import { Mistral } from '@mistralai/mistralai';

const messageRegex = /<message>(.+)<\/message>/;
const codeRegex = /```jsx((?:.|\n)+)```/;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.MISTRAL_API_KEY) {
    res.status(500).json({
      message: 'Internal server error : Mistral API Key not defined.',
    });
    return;
  }

  if (!process.env.MISTRAL_AGENT_ID) {
    res.status(500).json({
      message: 'Internal server error : Mistral Agent ID not defined.',
    });
    return;
  }

  const { body } = req;
  let content = `<prompt>${body.message}</prompt>\n`;
  if (body.code) {
    content += `\n\`\`\`jsx\n${body.code}\`\`\`\n`;
  }

  const mistral = new Mistral({
    apiKey: process.env.MISTRAL_API_KEY ?? '',
  });

  const result = await mistral.agents.complete({
    agentId: process.env.MISTRAL_AGENT_ID ?? '',
    messages: [
      {
        content,
        role: 'user',
      },
    ],
  });

  const responseContent = result.choices?.[0].message?.content;

  if (!responseContent) {
    res.status(500).json({
      message: 'Internal server error : No content in Assistant reply.',
    });
    return;
  }

  const messageMatch = responseContent.match(messageRegex);

  if (!messageMatch || messageMatch.length === 0) {
    res.status(500).json({
      message: 'Internal server error : Unprocessable Assistant reply.',
    });
    return;
  }

  const message = messageMatch[1];
  const code = responseContent.match(codeRegex)?.[1];

  res.status(200).json({ message, code });
}
