import { VercelRequest, VercelResponse } from '@vercel/node';
import twilio from 'twilio';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const identity = req.query.identity?.toString() || 'anonymous';

  const AccessToken = twilio.jwt.AccessToken;
  const VoiceGrant = AccessToken.VoiceGrant;

  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_API_KEY!,
    process.env.TWILIO_API_SECRET!,
    { identity }
  );

  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: process.env.TWIML_APP_SID!,
    incomingAllow: true
  });

  token.addGrant(voiceGrant);

  res.status(200).json({ token: token.toJwt() });
}
