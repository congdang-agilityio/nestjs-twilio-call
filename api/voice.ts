import { VercelRequest, VercelResponse } from '@vercel/node';
import twilio from 'twilio';

export default function handler(req: VercelRequest, res: VercelResponse) {
  console.log("Request received: ", req.body);
  const twiml = new twilio.twiml.VoiceResponse();
  let to = req.body.To?.toString();
  console.log("Calling number: ", to);

  if (!to) {
    to = '+84907627151';
    console.log('dialing');
    const dial = twiml.dial({
      callerId: '+84907627151'
    });
    dial.number(to);
  } else {
    twiml.say('Thanks for calling!');
  }

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml.toString());
}
