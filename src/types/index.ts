/**
 * 代表 AI 返回的、已解析的单次响应内容
 */
export interface StoryTurn {
  story: string;
  choices: string[];
}

/**
 * 代表游戏历史记录中的一个条目
 */
export interface HistoryItem {
  id: string; // 用于 React key，保证渲染效率
  story: string;
  choices: string[];
  playerChoice?: string; // 记录玩家在这一轮做出的选择
}

/**
 * 代表从 Dify API 返回的原始响应
 */
export interface DifyResponse {
  answer: string;
  conversation_id: string;
}
