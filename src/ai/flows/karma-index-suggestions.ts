'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating Karma Index suggestions.
 *
 * The flow uses an LLM to provide insightful suggestions for the Karma Index, adapting
 * displayed insights and information based on verified user actions to maintain
 * relevant community feedback.
 *
 * @exports {KarmaIndexSuggestionsInput} - Input type for the karmaIndexSuggestions function.
 * @exports {KarmaIndexSuggestionsOutput} - Output type for the karmaIndexSuggestions function.
 * @exports {karmaIndexSuggestions} - The main function to generate Karma Index suggestions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const KarmaIndexSuggestionsInputSchema = z.object({
  verifiedDeedsCount: z
    .number()
    .describe('The total number of verified deeds on the platform.'),
  recentdeeds: z
    .string()
    .describe('A list of recent deeds performed by users on the platform.'),
  activeUsersCount: z
    .number()
    .describe('The number of active users contributing to the platform.'),
});
export type KarmaIndexSuggestionsInput = z.infer<
  typeof KarmaIndexSuggestionsInputSchema
>;

const KarmaIndexSuggestionsOutputSchema = z.object({
  suggestion: z
    .string()
    .describe(
      'A helpful suggestion for the Karma Index, encouraging positive contributions.'
    ),
});

export type KarmaIndexSuggestionsOutput = z.infer<
  typeof KarmaIndexSuggestionsOutputSchema
>;

export async function karmaIndexSuggestions(
  input: KarmaIndexSuggestionsInput
): Promise<KarmaIndexSuggestionsOutput> {
  return karmaIndexSuggestionsFlow(input);
}

const karmaIndexSuggestionsPrompt = ai.definePrompt({
  name: 'karmaIndexSuggestionsPrompt',
  input: {schema: KarmaIndexSuggestionsInputSchema},
  output: {schema: KarmaIndexSuggestionsOutputSchema},
  prompt: `Based on the current state of the Karma Ledger platform, provide a suggestion for the Karma Index that encourages positive contributions.

  Here are some details about the platform:
  - Total verified deeds: {{{verifiedDeedsCount}}}
  - A List of recent deeds: {{{recentdeeds}}}
  - Number of active users: {{{activeUsersCount}}}
  
  Suggestion:`,
});

const karmaIndexSuggestionsFlow = ai.defineFlow(
  {
    name: 'karmaIndexSuggestionsFlow',
    inputSchema: KarmaIndexSuggestionsInputSchema,
    outputSchema: KarmaIndexSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await karmaIndexSuggestionsPrompt(input);
    return output!;
  }
);
