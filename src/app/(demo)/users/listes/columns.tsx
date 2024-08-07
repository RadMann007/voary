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
import ModifyUserComponent from "./modifyUser"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ClientInterface>[] = [
  {
    accessorKey: "nom",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("nom")}</div>,
  },
  {
    accessorKey: "password",
    header: "Password"
  },
  {
    accessorKey: "admin",
    header: "Admin",
    cell:({row}) => {
      const status = row.original.admin;
      if(status ==="true"){
        return <div className="text-green-400 font-bold">Oui</div>
      }else{
        return <div className="text-red-400 font-bold">Non</div>
      }
    }
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original

      const deleteUser = async ({id} : {id: string}) => {
          //
          try {
            const db = await databaseHelper();
            await db.execute("DELETE from users WHERE id = $1", [id]);
          } catch (error) {
            alert("Erreur! Vous ne pouvez pas supprimer cette famille");
          }
        
      }

      return(
        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger>
            <Button variant="destructive" size="icon"> <Trash /> </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Voulez-vous supprimer cette Utilisateur ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irreversible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction  onClick={() => deleteUser({id: user.id})}>Supprimer</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <ModifyUserComponent user={user} />
        </div>
      )
    },
  },
]
