'use client';

import type { Class, Student, Lesson } from '@/lib/types';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Lock, Unlock, Users, ListVideo, Eye } from 'lucide-react';
import { LessonView } from './lesson-view';

interface ClassDetailsClientProps {
  classInfo: Class;
  enrolledStudents: Student[];
  lessons: Lesson[];
}

export function ClassDetailsClient({ classInfo, enrolledStudents, lessons }: ClassDetailsClientProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(enrolledStudents[0]?.id || null);

  const selectedStudent = enrolledStudents.find(s => s.id === selectedStudentId);
  const isPaid = selectedStudent?.paymentStatus === 'Paid';

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-headline font-bold text-foreground">{classInfo.name}</h1>
        <p className="text-muted-foreground">{classInfo.description}</p>
        <p className="text-sm text-muted-foreground mt-2">Taught by {classInfo.teacher} &bull; {classInfo.schedule}</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="flex items-center gap-2">
                        <ListVideo />
                        Lessons
                    </CardTitle>
                    <CardDescription>
                        {selectedStudent ? `Viewing as ${selectedStudent.name}. Access is based on payment status.` : 'Select a student to see lesson access.'}
                    </CardDescription>
                </div>
                 <div className="w-48">
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
                <Accordion type="single" collapsible className="w-full">
                    {lessons.map(lesson => (
                        <AccordionItem value={lesson.id} key={lesson.id}>
                            <AccordionTrigger>
                                <div className="flex items-center gap-4">
                                    {isPaid ? <Unlock className="h-5 w-5 text-green-500" /> : <Lock className="h-5 w-5 text-destructive" />}
                                    <span className="text-left">{lesson.title}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4">
                                    <p className="text-muted-foreground">{lesson.description}</p>
                                    <LessonView lesson={lesson} isLocked={!isPaid} />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
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
