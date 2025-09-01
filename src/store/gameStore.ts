import { create } from 'zustand';
import { streamMessageToDify } from '../api/dify';
import type { HistoryItem, StoryTurn, DifyResponse } from '../types';

interface GameState {
  storyContext: string;
  conversationId: string | null;
  history: HistoryItem[];
  isLoading: boolean;
  error: string | null;
}

interface GameActions {
  startGame: (context: string) => void;
  makeChoice: (choice: string) => void;
  resetGame: () => void;
}

const SEPARATOR = '|||CHOICES|||';

const initialState: GameState = {
  storyContext: '',
  conversationId: null,
  history: [],
  isLoading: false,
  error: null,
};

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  ...initialState,

  startGame: (context: string) => {
    set({ ...initialState, storyContext: context });
    get().makeChoice('开始游戏');
  },

  resetGame: () => {
    set(initialState);
  },

  makeChoice: (choice: string) => {
    const { conversationId, storyContext, history } = get(); // 确保每次都从 state 中获取 storyContext

    set((state) => ({
      isLoading: true,
      error: null,
      history: conversationId
        ? state.history.map((item, index) =>
            index === state.history.length - 1
              ? { ...item, playerChoice: choice }
              : item
          )
        : [],
    }));

    const placeholderId = `turn-${Date.now()}`;
    const placeholder: HistoryItem = { id: placeholderId, story: '', choices: [] };
    set((state) => ({ history: [...state.history, placeholder] }));

    const onDelta = (chunk: string) => {
      set((state) => {
        const currentStory = state.history.find((item) => item.id === placeholderId)?.story || '';
        if (currentStory.includes(SEPARATOR)) return state;
        let storyChunk = chunk;
        if (chunk.includes(SEPARATOR)) {
          storyChunk = chunk.split(SEPARATOR)[0];
        }
        return {
          history: state.history.map((item) =>
            item.id === placeholderId
              ? { ...item, story: item.story + storyChunk }
              : item
          ),
        };
      });
    };

    const onComplete = (response: DifyResponse) => {
      const fullText = response.answer;
      let storyText = '';
      let choicesJson = '';

      if (fullText.includes(SEPARATOR)) {
        const parts = fullText.split(SEPARATOR);
        storyText = parts[0].trim();
        choicesJson = parts[1] || '';
      } else {
        storyText = fullText.trim();
        choicesJson = '{"choices": []}';
      }

      try {
        const finalChoicesData: Pick<StoryTurn, 'choices'> = JSON.parse(choicesJson);
        set((state) => ({
          isLoading: false,
          conversationId: response.conversation_id,
          history: state.history.map((item) =>
            item.id === placeholderId
              ? { ...item, story: storyText, choices: finalChoicesData.choices || [] }
              : item
          ),
        }));
      } catch (e) {
        set((state) => ({
          isLoading: false,
          error: 'Failed to parse choices data.',
          history: state.history.map((item) =>
            item.id === placeholderId
              ? { ...item, story: storyText, choices: [] }
              : item
          ),
        }));
      }
    };

    const onError = (error: Error) => {
      set({ isLoading: false, error: error.message || 'An unknown error occurred.' });
    };

    // 使用从 state 中获取的 storyContext
    streamMessageToDify(choice, conversationId, storyContext, onDelta, onComplete, onError);
  },
}));
