import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { students, classes } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function StudentsPage() {
  const getStudentClasses = (classIds: string[]) => {
    return classIds.map(id => classes.find(c => c.id === id)?.name).filter(Boolean).join(', ');
  };
  
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-foreground">Students</h1>
        <p className="text-muted-foreground">Manage your student database.</p>
      </header>
      
      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead className="hidden sm:table-cell">Enrolled Classes</TableHead>
                  <TableHead className="text-center">Payment Status</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={student.avatarUrl} alt={student.name} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">{getStudentClasses(student.classIds)}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={student.paymentStatus === 'Paid' ? 'secondary' : 'destructive'}>
                        {student.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/students/${student.id}`} aria-label={`View ${student.name}`}>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
