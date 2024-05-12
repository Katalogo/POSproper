import { Activity, CreditCard, IndianRupee, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getClients } from "@/lib/cru";

async function getClientsD() {
  const cru = await getClients();
  // console.log(cru);
  return cru.clients;
}

export default async function QuickCards() {
  const data = await getClientsD();
  const ClientCount = data.length;
  const totalRev = data.reduce((sum, client) => sum + client.totalR, 0);
  const formatN = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(totalRev);
  const totalD = data.reduce((sum, client) => sum + client.totalDue, 0);
  const formatD = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(totalD);
  // console.log({ data });
  console.log("quickCards");
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatN} </div>
            {/* <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ClientCount}</div>
            {/* <p className="text-xs text-muted-foreground">
              +18% from last month
            </p> */}
          </CardContent>
        </Card>
        {/* <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card> */}
        <Card
          x-chunk="dashboard-01-chunk-3"
          className="border-red-600 bg-red-200"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Due</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatD} </div>
            <p className="text-xs text-muted-foreground">
              Detailed breakdown in Clients page
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
