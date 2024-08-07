"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { ShoppingBasket } from "lucide-react";

import { databaseHelper } from "@/lib/utils";
import { getAllArticleSql } from "@/app/script/article_script";
import { updateStatutTableSql } from "@/app/script/table_script";
import { insertCommandeSql } from "@/app/script/commande_script";

function FaireCommandeComponent({ table_id }: { table_id: number }) {
  const [quantite, setQuantite] = useState(0);
  const [article, setArticle] = useState(0);
  const [listArticles, setListArticles] = useState<ArticleInterface[]>([]);

  useEffect(() => {
    getAllDataInDataBase();
  }, []);

  const getAllDataInDataBase = async () => {
    const db = await databaseHelper();
    const articles_data: Array<ArticleInterface> = await db.select(
      getAllArticleSql
    );
    setListArticles(articles_data);
  };

  const onSubmit = async () => {
    try {
      const db = await databaseHelper();

      await db.execute(insertCommandeSql, [table_id, quantite, article]);
      await db.execute(updateStatutTableSql, [0, table_id]);

      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <ShoppingBasket className="mr-2 h-4 w-4" />
            Commande
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modifier Article</DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription> */}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex w-full items-center gap-4">
              <div className="w-full flex items-center justify-evenly gap-2">
                <Label htmlFor="article" className="text-right">
                  Article
                </Label>
                <select
                  onChange={(e) => setArticle(parseInt(e.target.value))}
                  className="w-full "
                >
                  <option
                    className="text-primary-foreground"
                    disabled
                    selected
                    hidden
                  >
                    Code Famille
                  </option>
                  {listArticles.map((lst) => (
                    <option
                      key={lst.id}
                      value={lst.id}
                      className="text-primary-foreground"
                    >
                      {lst.id + " - " + lst.designation}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantite" className="text-right">
                Quantite
              </Label>
              <Input
              autoComplete="off"
                id="quantite"
                defaultValue={quantite}
                className="col-span-3"
                onChange={(e) => setQuantite(parseInt(e.target.value))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={onSubmit}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FaireCommandeComponent;
