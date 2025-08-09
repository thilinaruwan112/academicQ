'use client';

import type { Lesson } from '@/lib/types';
import { useState, useEffect, useRef } from 'react';
import Plyr from "plyr-react";
import type { Plyr as PlyrInstance } from 'plyr';
import { generateSummaryAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Loader2, Video, AlertCircle, PlayCircle } from 'lucide-react';
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
  
  const [isClient, setIsClient] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const playerRef = useRef<PlyrInstance | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleSummarize = async () => {
    setIsLoading(true);
    setError('');
    setSummary('');

    setError("AI summarization from a YouTube URL is not yet implemented.");
    toast({
        title: "Feature Not Available",
        description: "Summarizing from a YouTube link is not supported in this demo.",
        variant: "destructive",
    });
    setIsLoading(false);
  };

  const handlePlay = () => {
    setShowVideo(true);
  };

  useEffect(() => {
    if (showVideo && playerRef.current) {
      playerRef.current.play();
    }
  }, [showVideo]);

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

  const plyrOptions = {
    youtube: {
      noCookie: true,
      rel: 0,
      showinfo: 0,
      modestbranding: 1,
      controls: 0,
    },
    // autoplay is handled by useEffect
  };

  return (
    <div className="space-y-6">
        <Card className="bg-muted/30">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Video />Lesson Recording</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="w-full aspect-video bg-background rounded-lg flex items-center justify-center border overflow-hidden relative">
                   {isClient ? (
                     <>
                      {!showVideo ? (
                        <div className="text-center">
                           <Button variant="ghost" size="lg" onClick={handlePlay}>
                              <PlayCircle className="h-16 w-16 text-primary" />
                           </Button>
                           <p className="text-muted-foreground mt-2">Click to play video</p>
                        </div>
                      ) : (
                         <div onContextMenu={(e) => e.preventDefault()} className="w-full h-full">
                            <Plyr 
                              ref={(player) => {
                                if (player?.plyr) {
                                  playerRef.current = player.plyr;
                                }
                              }}
                              source={{
                                type: 'video',
                                sources: [
                                  {
                                    src: lesson.youtubeUrl,
                                    provider: 'youtube',
                                  },
                                ],
                              }}
                              options={plyrOptions}
                            />
                        </div>
                      )}
                     </>
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
