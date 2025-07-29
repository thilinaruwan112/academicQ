'use server';
/**
 * @fileOverview This file defines a Genkit flow for summarizing lesson videos using AI.
 *
 * - summarizeLessonVideo - A function that takes a video URL and generates a summary.
 * - SummarizeLessonVideoInput - The input type for the summarizeLessonVideo function.
 * - SummarizeLessonVideoOutput - The return type for the summarizeLessonVideo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeLessonVideoInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A video of a lesson, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SummarizeLessonVideoInput = z.infer<typeof SummarizeLessonVideoInputSchema>;

const SummarizeLessonVideoOutputSchema = z.object({
  summary: z.string().describe('A short summary of the lesson video.'),
});
export type SummarizeLessonVideoOutput = z.infer<typeof SummarizeLessonVideoOutputSchema>;

export async function summarizeLessonVideo(input: SummarizeLessonVideoInput): Promise<SummarizeLessonVideoOutput> {
  return summarizeLessonVideoFlow(input);
}

const summarizeLessonVideoPrompt = ai.definePrompt({
  name: 'summarizeLessonVideoPrompt',
  input: {schema: SummarizeLessonVideoInputSchema},
  output: {schema: SummarizeLessonVideoOutputSchema},
  prompt: `You are an AI assistant tasked with summarizing lesson videos.

  Please watch the following video and provide a concise summary of the key concepts discussed.
  
  Video: {{media url=videoDataUri}}
  
  Summary: `,
});

const summarizeLessonVideoFlow = ai.defineFlow(
  {
    name: 'summarizeLessonVideoFlow',
    inputSchema: SummarizeLessonVideoInputSchema,
    outputSchema: SummarizeLessonVideoOutputSchema,
  },
  async input => {
    const {output} = await summarizeLessonVideoPrompt(input);
    return output!;
  }
);
