"use client";

import { getArticleByFamilleIdSql } from "@/app/script/article_script";
import { getAllFamilleSql } from "@/app/script/famille_script";
import { databaseHelper } from "@/lib/utils";
import React, { useEffect, useState, ChangeEvent } from "react";

import { Printer, CircleMinus, Trash2, PlusCircle, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { insertCommandeSql } from "@/app/script/commande_script";
// import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatMontant } from "@/app/script/montant_format";
import Link from "next/link";


function CommandePage() {
  const [famille, setFamille] = useState<FamilleInterface[]>([]);
  const [listArticles, setListArticles] = useState<ArticleInterface[]>([]);
  const [listCommand, setListCommand] = useState<ArticleInterface[]>([]);
  const [categorieLst, setCategorieLst] = useState<CategorieInterface[]>([]);
  const [categorieId, setCategorieId] = useState("");

  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    listCommand.reduce((acc, cmd) => {
      acc[cmd.id] = 1; // Initialiser chaque quantité à 1
      return acc;
    }, {} as { [key: string]: number })
  );

  useEffect(() => {
    getAllCategorie();
    getListArticles({ id: "1" })
  }, []);

  const search_params = useSearchParams();
  const query = search_params.get("id");
  const table_number = query ? parseInt(query) : 0;

  const getAllCategorie = async () => {
    const db = await databaseHelper();
    const categories: Array<CategorieInterface> = await db.select("select * from categorie");
    setCategorieLst(categories);
  }

  const getListArticles = async ({ id }: { id: string }) => {
    if (id !== "") {
      const db = await databaseHelper();
      const articles_data: Array<ArticleInterface> = await db.select(
        "SELECT * FROM article WHERE code_famille = $1 and stock != 0",
        [id]
      );
      setListArticles(articles_data);
    }
  };

  const getFamilleByCategorieId = async ({ id }: { id: string }) => {
    const db = await databaseHelper();
    const famillesById: Array<FamilleInterface> = await db.select("select * from famille where categorie = $1", [id]);
    console.log(famillesById)
    setFamille(famillesById);
  }

  const addCommand = async ({ art }: { art: ArticleInterface }) => {
    if (art.stock === 0) {
      // alert("Stock épuisé")
    } else {
      const nouvelleCommande: ArticleInterface = {
        id: art.id,
        code_famille: art.code_famille,
        designation: art.designation,
        prix: art.prix,
        user: art.user,
        stock: art.stock
      };

      setListCommand((prev) => [...prev, nouvelleCommande]);
    }

  }


  const handleQuantityChange = (id: string, quantity: number) => {
    setQuantities({
      ...quantities,
      [id]: quantity
    });
  };

  const handleRemoveItem = (id: string) => {
    setListCommand(listCommand.filter(cmd => cmd.id !== id));
    const updatedQuantities = { ...quantities };
    delete updatedQuantities[id];
    setQuantities(updatedQuantities);
  };

  const totalPrix = listCommand.reduce((total, cmd) => {
    const quantity = quantities[cmd.id] || 1; // Utiliser 1 par défaut si aucune quantité n'est définie
    return total + cmd.prix * quantity;
  }, 0);

  const faireCommande = async () => {
    const db = await databaseHelper();
    listCommand.map(async (c) => {
      if (quantities[c.id] !== undefined) {
        if (c.stock >= quantities[c.id]) {
          await db.execute("UPDATE ttable SET disponible = false Where id = $1", [table_number]);
          await db.execute("UPDATE article SET stock = stock - $1 WHERE id = $2", [quantities[c.id], c.id]);
          await db.execute(insertCommandeSql, [table_number, quantities[c.id], c.id, c.prix * quantities[c.id]]);
          db.close();

          setListCommand([])
        } else {
          alert("Verifier la quantité ajouté!")
          return
        }

      } else {
        alert("Veuillez ajouter la Quantité!")
      }

    });


  }

  return (
    <div className="flex gap-2 h-90vh">
      {/* MENU et LISTES */}
      <div className="w-3/4 p-2">
        <h1 className="text-2xl font-bold mb-2 text-primary flex justify-center underline">FAIRE UNE COMMANDE</h1>
        <Card className="grid grid-cols-2 gap-4 p-4 bg-muted">
          <Select onValueChange={e => getFamilleByCategorieId({ id: e })}>
            <SelectTrigger>
              <SelectValue placeholder="CATEGORIE" />
            </SelectTrigger>
            <SelectContent>
              {
                categorieLst.map((cate, index) => (
                  <SelectItem key={index} value={cate.id.toString()} > {cate.nom_categorie} </SelectItem>
                ))
              }
            </SelectContent>
          </Select>


          <Select onValueChange={e => getListArticles({ id: e })}>
            <SelectTrigger className="">
              <SelectValue placeholder="FAMILLE" />
            </SelectTrigger>
            <SelectContent>
              {
                famille.map((fam, index) => (
                  <SelectItem key={index} value={fam.id.toString()} > {fam.famille} </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </Card>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2">
          {listArticles.map((article, index) => (
            <Card key={index} className="w-250 bg-muted">
              <CardHeader className="flex flex-col justify-center items-center">
                <h2 className="font-bold uppercase text-primary truncate">{article.designation}</h2>
                <h2 className="font-serif">Stock: {article.stock} </h2>
              </CardHeader>
              <CardContent className="flex w-full justify-center items-center">
                <h2 className="font-serif font-semibold">{formatMontant(article.prix)} </h2>
                {/* <Image src="../../food5.jpg" alt="food" width={200} height={200}/> */}
              </CardContent>
              <CardFooter className="flex flex-col gap-2 justify-start items-center">
                <Button className="w-full" variant="default" onClick={() => addCommand({ art: article })}> <PlusCircle size={15} className="mr-2" /> Ajouter</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Panier */}
      <div className="flex flex-col justify-between w-1/4 bg-muted items-center">
        <div className="p-2 overflow-y-auto">
          <h1 className="flex justify-center text-primary text-xl font-bold mb-2 mt-2">COMMANDES TABLE {table_number} </h1>
          <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Désignation</TableHead>
                <TableHead>Qtt</TableHead>
                <TableHead>Supprimer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                listCommand.map((cmd, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium"> {cmd.designation} </TableCell>
                    <TableCell>
                      <Input
                        autoComplete="off"
                        type="number"
                        className="w-16 rounded mr-2 border-primary"
                        value={quantities[cmd.id]}
                        min="1"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleQuantityChange(cmd.id, parseInt(e.target.value))}
                      />
                    </TableCell>
                    <TableCell>
                      <Trash2 size={25} onClick={() => handleRemoveItem(cmd.id)} />
                    </TableCell>
                  </TableRow>
                ))
              }

            </TableBody>
          </Table>

        </div>

        <div className="flex flex-col items-center justify-center p-4 gap-4 w-full">
          <div className="font-bold text-2xl flex justify-center">Montant: {totalPrix} Ar</div>
          <Button color="primary" className=" w-full p-2" onClick={() => faireCommande()}><Printer size={15} className="mr-2" />Ticket cuisine </Button>
          <Link className="bg-green-500 font-bold w-full p-2 flex justify-center items-center" href="/commandes">Consulter</Link>
        </div>
      </div>
    </div>
  );
}

export default CommandePage;
