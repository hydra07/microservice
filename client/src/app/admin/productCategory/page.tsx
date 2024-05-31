import isAuth from "@/components/privateRouter";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

export default function ProductCategory() {
  const data : Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "acsa@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "ascsac@as.com",
    },
  ];
  return (
    <>
      <h1>Product Category</h1>
      <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
    </>
  );
}
// export default isAuth(AdminDashboard);
