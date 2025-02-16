import { OpenAIClient } from '@azure/openai';
import { AzureKeyCredential } from '@azure/core-auth';

// Azure OpenAI Serviceの設定
const endpoint = process.env.AZURE_OPENAI_ENDPOINT || '';
const apiKey = process.env.AZURE_OPENAI_API_KEY || '';
const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || '';

const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));

export const chat = async () => {
  try {
    const result = await client.getChatCompletions(
      deploymentName, // デプロイメント名（例：gpt-35-turbo）
      [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Write a haiku about recursion in programming.' },
      ],
      {
        maxTokens: 1000,
        temperature: 0.7,
      }
    );

    return result;
  } catch (error) {
    console.error('Azure OpenAI Error:', error);
    throw error;
  }
};


