
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { AddPaymentForm } from './_components/add-payment-form';

export default function AddPaymentPage() {
  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center text-sm text-muted-foreground mb-2 flex-wrap">
            <Link href="/payments" className="hover:underline">Payments</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>Add Payment</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-foreground">Record a New Payment</h1>
        <p className="text-muted-foreground mt-1">Select a student and enter the payment details below.</p>
      </header>

      <AddPaymentForm />

    </div>
  );
}
