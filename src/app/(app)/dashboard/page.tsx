import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { users, classes, institutes } from "@/lib/data";
import { Users, BookOpen, AlertCircle, ArrowRight, Building } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
  const totalStudents = users.length;
  const totalClasses = classes.length;
  const pendingPayments = users.filter(s => s.paymentStatus === 'Pending');
  const institute = institutes[0]; // In a real app, this would come from the user's session

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-foreground">{institute.name} Dashboard</h1>
        <p className="text-muted-foreground">Welcome! Here's an overview of your institute's activity.</p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/students" className="block">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">Currently enrolled</p>
            </CardContent>
          </Card>
        </Link>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClasses}</div>
            <p className="text-xs text-muted-foreground">Across all subjects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPayments.length}</div>
            <p className="text-xs text-muted-foreground">Students with outstanding balances</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2">
            <CardHeader>
            <CardTitle>Students with Pending Payments</CardTitle>
            </CardHeader>
            <CardContent>
            {/* Mobile View - Cards */}
            <div className="md:hidden">
                {pendingPayments.length > 0 ? (
                    <div className="space-y-4">
                    {pendingPayments.map((student) => (
                        <div key={student.id} className="border rounded-lg p-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Avatar>
                            <AvatarImage src={student.avatarUrl} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                            <Badge variant="destructive" className="mt-2">{student.paymentStatus}</Badge>
                            </div>
                        </div>
                        <Button asChild variant="ghost" size="icon">
                            <Link href={`/students/${student.id}`} aria-label={`View ${student.name}`}>
                            <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                        </div>
                    ))}
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground">All student payments are up to date.</p>
                )}
            </div>

            {/* Desktop View - Table */}
            <div className="hidden md:block overflow-x-auto">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pendingPayments.length > 0 ? (
                    pendingPayments.map((student) => (
                        <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell className="text-center">
                            <Badge variant="destructive">{student.paymentStatus}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <Button asChild variant="ghost" size="sm">
                            <Link href={`/students/${student.id}`}>View Student</Link>
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                        All student payments are up to date.
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
                </Table>
            </div>
            </CardContent>
        </Card>
        <Card className="md:col-span-1">
             <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    Institute Details
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <h3 className="font-semibold">{institute.name}</h3>
                <p className="text-sm text-muted-foreground">
                   Admin: {institute.adminEmail}
                </p>
                <Button variant="outline" size="sm" className="w-full mt-2">
                    Manage Institute Settings
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
