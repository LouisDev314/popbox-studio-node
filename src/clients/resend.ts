import { Resend } from 'resend';
import getEnvConfig from '../config/env';

const resend = new Resend(getEnvConfig().resendApiKey);

export default resend;
