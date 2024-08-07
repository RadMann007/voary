"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button";

import {Pen, Recycle} from 'lucide-react';

export default function TableFormComponent() {

    const table_header = ["Customer", "Type", "Status", "Date", "Amount", "Actions"];
    const table_value = [
        {customer: "John", type:"Sale", status:"completed", date: "2023-06-23", amount: 2500}
    ]

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
                {
                    table_header.map(head =><TableHead key={head}> {head} </TableHead>)
                }
            </TableRow>
          </TableHeader>

          <TableBody>
            {
                table_value.map((table, index) =>(
                    <TableRow key={index} className="bg-accent">
              <TableCell>
                <div className="font-medium"> {table.customer} </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell"> {table.type} </TableCell>
              <TableCell className="hidden sm:table-cell">{table.status}</TableCell>
              <TableCell className="hidden md:table-cell">{table.date}</TableCell>
              <TableCell className="text-right">{table.amount} Ar</TableCell>
              <TableCell className="text-right flex justify-center gap-2">
                <Button variant="outline" className="rounded-full" onClick={()=> alert(table.customer)}><Pen className="h-4 w-4" /> </Button>
                <Button variant="outline" className="rounded-full" onClick={()=> alert(table.customer)}><Recycle className="h-4 w-4" /> </Button>
              </TableCell>
            </TableRow>
                ))
            }
            
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
