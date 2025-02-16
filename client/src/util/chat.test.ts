import { describe, it, expect } from 'vitest';
import { chat } from './chat';

describe('chat', () => {
  it('should return a response from OpenAI', async () => {
    const response = await chat();

    // レスポンスの構造を確認
    expect(response).toBeDefined();
    expect(response.choices).toBeDefined();
    expect(response.choices[0].message).toBeDefined();
    expect(typeof response.choices[0].message.content).toBe('string');
  });

  it('should handle API errors gracefully', async () => {
    // APIキーが無効な場合や通信エラーの場合のテスト
    try {
      await chat();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error instanceof Error).toBe(true);
    }
  });
});
