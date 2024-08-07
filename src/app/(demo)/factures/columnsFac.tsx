"use client"

import { formatDateOnly, formatHoursOnly } from "@/app/script/date_format";
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link";


export const columnsFacture: ColumnDef<FactureInterface>[] = [
  {
    accessorKey: "nom_facture",
    header: "N° Facture",
  },
  {
    accessorKey: "montant",
    header: "Montant",
  },
  {
    accessorKey: "date_facture",
    header: "Date",
    cell: ({row}) => {
        const table_data = row.original;
        return <div> {formatDateOnly({ma_date: table_data.date_facture})} </div>
    }
  },
  {
    accessorKey: "id",
    header: "Action",
    cell:({row}) => {
        const table_data = row.original;
        return <Link className='text-blue-400 underline' href={'/factures/details?id='+table_data.id} >Détails </Link>
    }
  },
]
