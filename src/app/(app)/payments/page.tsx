
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-foreground">Payments</h1>
        <p className="text-muted-foreground">Track and manage student payments.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Payment Management</CardTitle>
          <CardDescription>
            This section will contain tools for tracking invoices, processing payments, and viewing payment history.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[300px] text-center">
            <CreditCard className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Payment features are coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
