import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
console.log('API Key length:', apiKey?.length); // Debug line
console.log('API Key starts with:', apiKey?.substring(0, 7)); // Debug line

if (!apiKey) {
  throw new Error('OpenAI API key is not defined in environment variables');
}

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
});

export default openai; 