"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {Delete} from 'lucide-react';



export const columnCommand: ColumnDef<CommandeArticleInterface>[] = [
 
  {
    accessorKey: "numero_table",
    header: "NUMERO TABLE",
  },
  {
    accessorKey: "quantite",
    header: "QUANTITE",
  },
  {
    accessorKey: "designation",
    header: "DESIGNATION",
    // header: "ARTICLE",
  },
  {
    id: "actions",
    header: "ACTIONS",
    enableHiding: false,
    cell: ({ row }) => {
      // const table_data = row.original;

      // const deleteTable = async (table_id: string) => {
      //   try {
      //     const db = await databaseHelper();
      //     await db.execute("DELETE from article WHERE id = $1", [table_id]);
      //     window.location.reload();
      //   } catch (error) {
      //     alert(error);
      //   }
      // };

      return (
        <div className="flex gap-2">
          <Button variant="destructive"> <Delete className="mr-2 h-4 w-4" /> Effacer</Button>
        </div>
      );
    },
  },
];
