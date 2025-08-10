
'use client';

import type { Lesson } from '@/lib/types';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Unlock, ArrowRight, FileVideo, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LessonSummaryProps {
    classId: string;
    lessons: Lesson[];
    isLocked: boolean;
    monthName: string;
}

export function LessonSummary({ classId, lessons, isLocked, monthName }: LessonSummaryProps) {
    if (!lessons || lessons.length === 0) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BookOpen />
                    Lessons for {monthName}
                </CardTitle>
                <CardDescription>
                    {isLocked ? "Access to these lessons is currently locked." : "Select a lesson to view the video."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {lessons.map(lesson => (
                        <LessonCard key={lesson.id} lesson={lesson} isLocked={isLocked} classId={classId} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

function LessonCard({ lesson, isLocked, classId }: { lesson: Lesson, isLocked: boolean, classId: string }) {
    const CardWrapper = isLocked ? 'div' : Link;
    const props = isLocked ? {} : { href: `/classes/${classId}/lessons/${lesson.id}` };

    return (
        <CardWrapper {...props} className={cn(
            "group",
            !isLocked && "hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        )}>
            <Card className={cn("flex flex-col h-full", isLocked && "bg-muted/50")}>
                 <CardHeader className="flex-row items-start gap-4 space-y-0">
                    <div className="p-2 bg-accent/10 rounded-lg">
                        {isLocked ? <Lock className="h-6 w-6 text-destructive"/> : <Unlock className="h-6 w-6 text-green-500" />}
                    </div>
                    <div>
                        <CardTitle className="text-base">{lesson.title}</CardTitle>
                        <CardDescription className="text-xs line-clamp-2">{lesson.description}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center">
                    <div className="w-full aspect-video bg-background rounded-lg flex items-center justify-center border">
                        <FileVideo className="h-12 w-12 text-muted-foreground" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full" disabled={isLocked}>
                        {isLocked ? "Access Locked" : "View Lesson"}
                        {!isLocked && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                </CardFooter>
            </Card>
        </CardWrapper>
    )
}
