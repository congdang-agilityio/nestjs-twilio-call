import { VercelRequest, VercelResponse } from '@vercel/node';
import twilio from 'twilio';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const twiml = new twilio.twiml.VoiceResponse();
  const to = req.query.To?.toString();
  console.log(to);

  if (to) {
    console.log('dialing');
    const dial = twiml.dial();
    dial.number(to);
  } else {
    twiml.say('Thanks for calling!');
  }

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml.toString());
}
