'use server';

import { karmaIndexSuggestions, type KarmaIndexSuggestionsInput } from '@/ai/flows/karma-index-suggestions';

export async function getKarmaSuggestion(input: KarmaIndexSuggestionsInput) {
  try {
    const result = await karmaIndexSuggestions(input);
    return { success: true, suggestion: result.suggestion };
  } catch (error) {
    console.error('Error in getKarmaSuggestion:', error);
    return { success: false, error: 'Failed to generate suggestion. Please check the server logs.' };
  }
}
