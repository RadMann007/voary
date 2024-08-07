"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { databaseHelper } from "@/lib/utils"
import ModifyFamilleComponent from "./modifierFamille"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsFamille: ColumnDef<FamilleInterface>[] = [
  {
    accessorKey: "code_famille",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Code Famille
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="Upercase">{row.getValue("code_famille")}</div>,
  },
  {
    accessorKey: "famille",
    header: "Famille",
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const famille = row.original;

      const deleteFamille = async ({ id }: { id: string }) => {
        //
        try {
          const db = await databaseHelper();
          await db.execute("DELETE from famille WHERE id = $1", [id]);
        } catch (error) {
          alert("Erreur! Vous ne pouvez pas supprimer cette famille");
        }
      }

      return (
        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger>
            <Button variant="destructive" size="icon" > <Trash /> </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Voulez-vous supprimer cette famille ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irreversible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteFamille({ id: famille.id })}>Supprimer</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <ModifyFamilleComponent famille={famille} />
        </div>
      )
    },
  },
]
