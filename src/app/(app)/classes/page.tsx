import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { classes } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ClassesPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-headline font-bold text-foreground">Classes</h1>
        <p className="text-muted-foreground">Browse and manage class schedules and lessons.</p>
      </header>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => (
          <Card key={cls.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={cls.imageUrl}
                  alt={cls.name}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="online course"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle className="font-headline text-xl mb-2">{cls.name}</CardTitle>
              <CardDescription>{cls.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-foreground">{cls.teacher}</p>
                <p className="text-xs text-muted-foreground">{cls.schedule}</p>
              </div>
              <Button asChild size="sm">
                <Link href={`/classes/${cls.id}`}>
                  View Class
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
