'use client';

import type { Lesson } from '@/lib/types';
import { useState } from 'react';
import { generateSummaryAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Loader2, Video, Upload, AlertCircle, FileVideo } from 'lucide-react';

interface LessonViewProps {
  lesson: Lesson;
  isLocked: boolean;
}

export function LessonView({ lesson, isLocked }: LessonViewProps) {
  const { toast } = useToast();
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
        setError('');
      } else {
        setError('Please select a valid video file.');
        setVideoFile(null);
      }
    }
  };

  const handleSummarize = async () => {
    if (!videoFile) {
      setError('Please select a video file first.');
      return;
    }
    setIsLoading(true);
    setError('');
    setSummary('');

    const reader = new FileReader();
    reader.readAsDataURL(videoFile);
    reader.onload = async () => {
      const videoDataUri = reader.result as string;
      const result = await generateSummaryAction(videoDataUri);
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
    };
    reader.onerror = () => {
        setError("Failed to read the video file.");
        setIsLoading(false);
    }
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
                <CardDescription>This is a placeholder for the lesson video content.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full aspect-video bg-background rounded-lg flex items-center justify-center border">
                    <FileVideo className="h-16 w-16 text-muted-foreground" />
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Wand2 />AI Video Summarization</CardTitle>
                <CardDescription>Upload a video to generate a summary. (For demonstration purposes)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-grow">
                        <Input id="video-upload" type="file" accept="video/*" onChange={handleFileChange} />
                        {videoFile && <p className="text-xs text-muted-foreground mt-2">Selected: {videoFile.name}</p>}
                    </div>
                    <Button onClick={handleSummarize} disabled={isLoading || !videoFile}>
                    {isLoading ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                        </>
                    ) : (
                        <>
                        <Upload className="mr-2 h-4 w-4" />
                        Generate Summary
                        </>
                    )}
                    </Button>
                </div>

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
