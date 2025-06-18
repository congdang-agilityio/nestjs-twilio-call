import { VercelRequest, VercelResponse } from '@vercel/node';
import twilio from 'twilio';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const twiml = new twilio.twiml.VoiceResponse();
  const to = req.body?.To;

  const dial = twiml.dial();
  dial.number(to);

  res.setHeader('Content-Type', 'text/xml');
  res.send(twiml.toString());
}