"use client";

import { useToast } from "@/components/ui/use-toast";
import { databaseHelper } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";


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
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import ModifyCategoryComponent from "./modifierCategorie";


export const columnCategorie: ColumnDef<CategorieInterface>[] = [
 
  {
    accessorKey: "nom_categorie",
    header: "nom_categorie",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const categorie = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const {toast} = useToast();

      const deleteTable = async () => {
        try {
          const db = await databaseHelper();
          await db.execute("DELETE from categorie WHERE id = $1", [categorie.id]);
          toast({
            title: "Success!",
            description: "categorie supprimé avec success!",
            variant: "default",
          });
          window.location.reload();
        } catch (error) {
          toast({
            title: "Erreur!",
            description: "Erreur! facture existe deja!",
            variant: "destructive",
          });
        }
      };

      return (
        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger>
            <Button variant="destructive" size="icon"> <Trash /> </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Voulez-vous supprimer cette categorie ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irreversible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction  onClick={() => deleteTable()}>Supprimer</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <ModifyCategoryComponent categorie={categorie} />
         </div>
      )
    }
  }
];
