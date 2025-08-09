'use client';

import type { Class, User, Lesson } from '@/lib/types';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Lock, Unlock, Users, ListVideo, Eye, ArrowRight, FileVideo } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ClassDetailsClientProps {
  classInfo: Class;
  enrolledStudents: User[];
  lessons: Lesson[];
}

export function ClassDetailsClient({ classInfo, enrolledStudents, lessons }: ClassDetailsClientProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(enrolledStudents[0]?.id || null);

  const selectedStudent = enrolledStudents.find(s => s.id === selectedStudentId);
  const isPaid = selectedStudent?.paymentStatus === 'Paid';

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-foreground">{classInfo.name}</h1>
        <p className="text-muted-foreground">{classInfo.description}</p>
        <p className="text-sm text-muted-foreground mt-2">Taught by {classInfo.teacher} &bull; {classInfo.schedule}</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <Card>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
                <div>
                    <CardTitle className="flex items-center gap-2">
                        <ListVideo />
                        Lessons
                    </CardTitle>
                    <CardDescription>
                        {selectedStudent ? `Viewing as ${selectedStudent.name}. Access is based on payment status.` : 'Select a student to see lesson access.'}
                    </CardDescription>
                </div>
                 <div className="w-full sm:w-48">
                    <Select onValueChange={setSelectedStudentId} defaultValue={selectedStudentId || undefined}>
                        <SelectTrigger id="student-view" aria-label="View as student">
                            <Eye className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="View as..." />
                        </SelectTrigger>
                        <SelectContent>
                            {enrolledStudents.map(student => (
                            <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {lessons.map(lesson => (
                        <LessonCard key={lesson.id} lesson={lesson} isLocked={!isPaid} classId={classInfo.id} />
                    ))}
                </div>
                {!selectedStudent && <p className="text-center text-muted-foreground mt-4">Please select a student to view lesson content.</p>}
            </CardContent>
           </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users />
                Enrolled Students
              </CardTitle>
              <CardDescription>{enrolledStudents.length} student(s) enrolled.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {enrolledStudents.map(student => (
                  <li key={student.id} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={student.avatarUrl} alt={student.name} />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
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
                        <CardTitle>{lesson.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{lesson.description}</CardDescription>
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
