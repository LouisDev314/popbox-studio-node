import { Resend } from 'resend';
import getEnvConfig from '../config/env';

const { resendApiKey } = getEnvConfig();

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export default resend;
