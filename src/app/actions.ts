'use server';

import { summarizeLessonVideo } from '@/ai/flows/summarize-lesson-video';

export async function generateSummaryAction(videoDataUri: string) {
  try {
    if (!videoDataUri) {
      return { error: 'Video data is missing.' };
    }
    const result = await summarizeLessonVideo({ videoDataUri });
    return { summary: result.summary };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || 'An unknown error occurred.' };
  }
}
