
'use client';

import type { Class, User, Lesson } from '@/lib/types';
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, ListVideo, Eye, Calendar, Lock, Unlock } from 'lucide-react';
import { format, getMonth, getYear } from 'date-fns';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ClassDetailsClientProps {
  classInfo: Class;
  enrolledStudents: User[];
  lessons: Lesson[];
}

export function ClassDetailsClient({ classInfo, enrolledStudents, lessons }: ClassDetailsClientProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(enrolledStudents[0]?.id || null);

  const selectedStudent = enrolledStudents.find(s => s.id === selectedStudentId);
  const isPaid = selectedStudent?.paymentStatus === 'Paid';

  const lessonsByMonth = useMemo(() => {
    return lessons.reduce((acc, lesson) => {
      const monthKey = `${getYear(new Date(lesson.date))}-${(getMonth(new Date(lesson.date)) + 1).toString().padStart(2, '0')}`;
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push(lesson);
      return acc;
    }, {} as Record<string, Lesson[]>);
  }, [lessons]);
  
  const sortedMonths = useMemo(() => {
    return Object.keys(lessonsByMonth).sort((a, b) => {
        const [yearA, monthA] = a.split('-').map(Number);
        const [yearB, monthB] = b.split('-').map(Number);
        return yearB - yearA || monthB - monthA;
    });
  }, [lessonsByMonth]);

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-foreground">{classInfo.name}</h1>
            <p className="text-muted-foreground">{classInfo.description}</p>
            <p className="text-sm text-muted-foreground mt-2">Taught by {classInfo.teacher} &bull; {classInfo.schedule}</p>
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
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-8">
           <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar />
                        Course Content by Month
                    </CardTitle>
                    <CardDescription>
                       Select a month to view the lessons. Access is based on student payment status.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sortedMonths.map(monthKey => {
                            const [year, monthNum] = monthKey.split('-').map(Number);
                            const monthName = format(new Date(year, monthNum - 1), 'MMMM yyyy');
                            const monthLessons = lessonsByMonth[monthKey];
                            return (
                                <MonthCard 
                                    key={monthKey}
                                    classId={classInfo.id}
                                    monthId={monthKey}
                                    monthName={monthName}
                                    lessonCount={monthLessons.length}
                                    isLocked={!isPaid}
                                />
                            )
                        })}
                    </div>
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


function MonthCard({ classId, monthId, monthName, lessonCount, isLocked }: { classId: string, monthId: string, monthName: string, lessonCount: number, isLocked: boolean }) {
    const cardContent = (
        <Card className="h-full group-hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{monthName}</CardTitle>
                    {isLocked ? <Lock className="h-5 w-5 text-destructive"/> : <Unlock className="h-5 w-5 text-green-500" />}
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <ListVideo className="h-4 w-4" />
                    <span className="text-sm">{lessonCount} {lessonCount === 1 ? 'lesson' : 'lessons'}</span>
                </div>
            </CardContent>
        </Card>
    );

    if (isLocked) {
        return <div className="cursor-not-allowed opacity-70 group">{cardContent}</div>;
    }

    return (
        <Link href={`/classes/${classId}/month/${monthId}`} className="text-left p-0 w-full rounded-lg transition-all group">
            {cardContent}
        </Link>
    );
}
