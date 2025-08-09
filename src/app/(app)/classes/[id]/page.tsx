import { classes, users as allStudents, lessons as allLessons } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ClassDetailsClient } from './_components/class-details-client';

export default function ClassDetailsPage({ params }: { params: { id: string } }) {
  const classInfo = classes.find((c) => c.id === params.id);

  if (!classInfo) {
    notFound();
  }

  const enrolledStudents = classInfo.studentIds.map(id => 
    allStudents.find(s => s.id === id)
  ).filter(Boolean);

  const lessons = allLessons.filter(l => l.classId === classInfo.id);

  return (
    <ClassDetailsClient
      classInfo={classInfo}
      enrolledStudents={enrolledStudents}
      lessons={lessons}
    />
  );
}
