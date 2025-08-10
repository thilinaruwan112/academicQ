
'use client';

import type { Lesson } from '@/lib/types';
import { useState, useEffect, useRef } from 'react';
import type { Plyr as PlyrInstance } from 'plyr';
import dynamic from 'next/dynamic';
import { generateSummaryAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Loader2, Video, AlertCircle, PlayCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Plyr = dynamic(() => import('plyr-react'), { ssr: false });

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

    // In a real app, you would get the video data from the source.
    // For this demo, we can't download from YouTube, so we send a placeholder.
    const placeholderVideoDataUri = 'data:video/mp4;base64,AAAAHGZ0eXBtcDQyAAAAAWlzb21tcDQy';
    
    const result = await generateSummaryAction(placeholderVideoDataUri);

    if (result.error) {
        setError(result.error);
        toast({
            title: "Error Generating Summary",
            description: result.error,
            variant: "destructive",
        });
    } else if (result.summary) {
        setSummary(result.summary);
        toast({
            title: "Summary Generated",
            description: "The AI has successfully summarized the video.",
        });
    }
    
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
    </div>
  );
}
