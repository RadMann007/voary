"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { databaseHelper } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Trash2 } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnTable: ColumnDef<TableInterface>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "disponible",
    header: "disponible",
    cell: ({row}) => {
      const status = row.original.disponible;
      if(status){
        return <div className="text-green-400 font-bold">Oui</div>
      }else{
        return <div className="text-red-400 font-bold">Non</div>
      }
    }
  },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => {
      const table_data = row.original;

      const deleteTable = async ({table_id}: {table_id: string}) => {
        try {
          const db = await databaseHelper();
          await db.execute("DELETE from ttable WHERE id = $1", [table_id]);
          window.location.reload();
        } catch (error) {
          alert(error);
        }
      };

      return <Badge className="p-2" onClick={e => deleteTable({table_id: table_data.id})}><Trash2 color="white" size={15} /> </Badge>
    },
  },
];
