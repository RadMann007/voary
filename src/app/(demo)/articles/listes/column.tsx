"use client";

import { Button } from "@/components/ui/button";
import { databaseHelper } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import ModificationComponent from "./ModificationComponent";
import { PackageIcon, Trash, ArrowBigUpDashIcon} from 'lucide-react';
// import { useToast } from "@/components/ui/use-toast";

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
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export const ColumnTableArticle: ColumnDef<ArticleUserInterface>[] = [

  {
    accessorKey: "designation",
    header: "DESIGNATION",
  },
  {
    accessorKey: "prix",
    header: "PRIX",
    cell:({row}) => {
      return <div> {row.original.prix} Ar </div>
    }
  },
  {
    accessorKey: "stock",
    header: "STOCK",
    cell: ({row}) => {
      if(row.original.stock === 0){
        return <span className="text-red-400 font-bold flex gap-2 items-center"><PackageIcon /> {row.original.stock} </span>
      }else{
        return <span className="text-green-400 font-bold flex"><PackageIcon /> {row.original.stock} </span>
      }
    }
  },
  {
    accessorKey: "nom",
    header: "UTILISATEUR",
  },
  {
    id: "actions",
    header: "ACTIONS",
    enableHiding: false,
    cell: ({ row }) => {
      const article = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const {toast}= useToast();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();
      // const { toast } = useToast()
      // eslint-disable-next-line react-hooks/rules-of-hooks
      // const router = useRouter();


      const goToStock = () => {
        router.push("/stocks?id="+article.code_famille)
      }

      const deleteTable = async () => {
        try {
          const db = await databaseHelper();
          await db.execute("DELETE from article WHERE id = $1", [article.id]);
          toast({title:"Success", description: "Article effacé avec success!"})
        } catch (error) {
          toast({title: "Erreur", description: "erreur! table article"})
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
                <AlertDialogTitle>Voulez-vous supprimer cette article ?</AlertDialogTitle>
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
          <ModificationComponent data={article} />
          <Button onClick={() => goToStock()} variant="outline" size="icon"> <ArrowBigUpDashIcon color="green" /> </Button>
         </div>
      );
    },
  },
];
