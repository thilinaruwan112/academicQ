'use client';

import type { Lesson } from '@/lib/types';
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import { generateSummaryAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Loader2, Video, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface LessonViewProps {
  lesson: Lesson;
  isLocked: boolean;
}

export function LessonView({ lesson, isLocked }: LessonViewProps) {
  const { toast } = useToast();
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // This state will ensure the component is only rendered on the client, avoiding hydration issues.
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleSummarize = async () => {
    setIsLoading(true);
    setError('');
    setSummary('');

    // The summarization logic expects a data URI, but we have a URL.
    // For this demonstration, we'll show an error.
    // A real implementation would need to either:
    // 1. Download the video server-side from the URL.
    // 2. Use a different AI model that accepts a URL directly.
    setError("AI summarization from a YouTube URL is not yet implemented.");
    toast({
        title: "Feature Not Available",
        description: "Summarizing from a YouTube link is not supported in this demo.",
        variant: "destructive",
    });
    setIsLoading(false);

    // Placeholder for actual summarization call if it were implemented
    /*
    const result = await generateSummaryAction(lesson.youtubeUrl);
    if (result.error) {
      setError(result.error);
      toast({
        title: "Summarization Failed",
        description: result.error,
        variant: "destructive",
      });
    } else if (result.summary) {
      setSummary(result.summary);
      toast({
        title: "Summary Generated!",
        description: "The AI has successfully summarized the video.",
      });
    }
    setIsLoading(false);
    */
  };

  if (isLocked) {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Access Locked</AlertTitle>
            <AlertDescription>
            This student's monthly payment is pending. Access to this lesson is restricted.
            </AlertDescription>
        </Alert>
    );
  }

  return (
    <div className="space-y-6">
        <Card className="bg-muted/30">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Video />Lesson Recording</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="w-full aspect-video bg-background rounded-lg flex items-center justify-center border overflow-hidden">
                   {isClient ? (
                    <ReactPlayer
                      url={lesson.youtubeUrl}
                      width="100%"
                      height="100%"
                      controls={true}
                      config={{
                        youtube: {
                          playerVars: { 
                            showinfo: 0,
                            controls: 1,
                            modestbranding: 1,
                            rel: 0,
                           }
                        }
                      }}
                    />
                  ) : (
                    <Skeleton className="w-full h-full" />
                  )}
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Wand2 />AI Video Summarization</CardTitle>
                <CardDescription>Generate a summary from the lesson video.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <Button onClick={handleSummarize} disabled={isLoading}>
                {isLoading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                    </>
                ) : (
                    <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Summary
                    </>
                )}
                </Button>

                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {summary && (
                    <Alert>
                        <Wand2 className="h-4 w-4" />
                        <AlertTitle>Generated Summary</AlertTitle>
                        <AlertDescription className="prose prose-sm dark:prose-invert">
                            {summary}
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
