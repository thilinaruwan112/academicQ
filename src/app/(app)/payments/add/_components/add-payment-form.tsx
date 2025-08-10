
'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { users as allUsers, payments as allPayments } from '@/lib/data';
import { Loader2, DollarSign, CalendarIcon, Info, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const addPaymentSchema = z.object({
  studentId: z.string({ required_error: 'Please select a student.' }),
  amount: z.coerce.number().positive({ message: 'Amount must be a positive number.' }),
  date: z.date({ required_error: 'Please select a payment date.' }),
});

type AddPaymentFormValues = z.infer<typeof addPaymentSchema>;

export function AddPaymentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<AddPaymentFormValues>({
    resolver: zodResolver(addPaymentSchema),
  });

  const selectedStudentId = form.watch('studentId');

  const studentInfo = useMemo(() => {
    if (!selectedStudentId) return null;
    const student = allUsers.find(u => u.id === selectedStudentId);
    if (!student) return null;

    const studentPayments = allPayments.filter(p => p.studentId === selectedStudentId && p.status === 'Paid');
    const totalPaid = studentPayments.reduce((acc, p) => acc + p.amount, 0);

    return {
      name: student.name,
      paymentStatus: student.paymentStatus,
      totalPaid,
    };
  }, [selectedStudentId]);

  const onSubmit = async (data: AddPaymentFormValues) => {
    setIsSubmitting(true);
    // In a real application, you would make an API call here to save the payment.
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Payment Recorded (Simulation)',
      description: `Payment of $${data.amount} for ${studentInfo?.name} on ${format(data.date, 'PPP')} has been recorded.`,
    });
    
    setIsSubmitting(false);
    form.reset();
    router.push('/payments');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a student..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allUsers.map(user => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {studentInfo && (
                <div className="flex items-center p-3 text-sm border rounded-lg bg-muted/50">
                    <Info className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                        <p>
                            Status: <Badge variant={studentInfo.paymentStatus === 'Paid' ? 'secondary' : 'destructive'} className="ml-1">{studentInfo.paymentStatus}</Badge>
                        </p>
                        <p className="text-muted-foreground">
                            Total paid to date: ${studentInfo.totalPaid.toFixed(2)}
                        </p>
                    </div>
                </div>
            )}

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                   <div className="relative">
                     <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     <FormControl>
                        <Input type="number" step="0.01" placeholder="e.g. 150.00" {...field} className="pl-8" />
                     </FormControl>
                   </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Payment Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
                <Link href="/payments">
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Cancel
                </Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Record Payment'
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
