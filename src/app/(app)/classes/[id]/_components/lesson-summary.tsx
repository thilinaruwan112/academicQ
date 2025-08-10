
'use client';

import type { Lesson, User } from '@/lib/types';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Unlock, ArrowRight, FileVideo, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface LessonSummaryProps {
    classId: string;
    lessons: Lesson[];
    monthName: string;
    enrolledStudents: User[];
}

export function LessonSummary({ classId, lessons, monthName, enrolledStudents }: LessonSummaryProps) {
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(enrolledStudents[0]?.id || null);

    const selectedStudent = useMemo(() => {
        return enrolledStudents.find(s => s.id === selectedStudentId);
    }, [selectedStudentId, enrolledStudents]);

    const isPaid = !!selectedStudent && selectedStudent.paymentStatus === 'Paid';
    const isLocked = !isPaid;

    if (!lessons || lessons.length === 0) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle>No Lessons Found</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">There are no lessons available for {monthName}.</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Lessons for {monthName}</CardTitle>
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
            </div>
            <div className="lg:col-span-1 space-y-6">
                <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Eye /> Student View</CardTitle>
                    <CardDescription>Select a student to see their access status.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Select onValueChange={setSelectedStudentId} defaultValue={selectedStudentId || undefined}>
                    <SelectTrigger id="student-view" aria-label="View as student">
                        <SelectValue placeholder="View as..." />
                    </SelectTrigger>
                    <SelectContent>
                        {enrolledStudents.map(student => (
                        <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                    {selectedStudent && (
                    <div className="mt-4 flex items-center justify-between text-sm p-3 rounded-lg bg-muted/50">
                       <span>{selectedStudent.name}'s Status:</span>
                       <Badge variant={isPaid ? 'secondary' : 'destructive'}>{isPaid ? 'Paid' : 'Pending'}</Badge>
                    </div>
                    )}
                </CardContent>
                </Card>
            </div>
        </div>

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
