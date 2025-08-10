
import { classes, users as allStudents, lessons as allLessons } from '@/lib/data';
import { notFound } from 'next/navigation';
import { LessonSummary } from '../../_components/lesson-summary';
import type { Lesson } from '@/lib/types';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { format, getMonth, getYear } from 'date-fns';

export default function MonthLessonsPage({ params }: { params: { id: string, monthId: string } }) {
  const classInfo = classes.find((c) => c.id === params.id);
  
  if (!classInfo) {
    notFound();
  }

  const [year, month] = params.monthId.split('-').map(Number);
  if (isNaN(year) || isNaN(month)) {
      notFound();
  }

  const lessonsForMonth = allLessons.filter(l => {
    const lessonDate = new Date(l.date);
    return l.classId === classInfo.id && getYear(lessonDate) === year && (getMonth(lessonDate) + 1) === month;
  });

  const enrolledStudents = classInfo.studentIds.map(id => 
    allStudents.find(s => s.id === id)
  ).filter(Boolean);

  const monthName = format(new Date(year, month - 1), 'MMMM yyyy');

  return (
    <div className="space-y-6">
        <header>
            <div className="flex items-center text-sm text-muted-foreground mb-2 flex-wrap">
                <Link href="/classes" className="hover:underline">Classes</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link href={`/classes/${classInfo.id}`} className="hover:underline truncate">{classInfo.name}</Link>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-foreground">Lessons for {monthName}</h1>
        </header>

        <LessonSummary 
            classId={classInfo.id}
            lessons={lessonsForMonth}
            monthName={monthName}
            enrolledStudents={enrolledStudents}
        />
    </div>
  );
}

