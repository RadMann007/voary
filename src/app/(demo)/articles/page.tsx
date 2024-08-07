"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { databaseHelper, messageAlert } from "@/lib/utils";
import { getAllFamilleSql } from "@/app/script/famille_script";
import { insertArticleSql } from "@/app/script/article_script";

interface ProduitInter {
  id: number
  nom_produit: string
  famille_id: number
  stock: number
}

export default function CreateArticlePage() {
  const [code_famille, setCode] = useState(0);
  const [prix, setPrix] = useState<number>();
  const [designation, setDesignation] = useState("");
  const [user, setUser] = useState(0);

  const [list, setList] = useState<FamilleInterface[]>([]);
  // const [produits, setProduits] = useState<ProduitInter[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    getAllData();
  });



  const getAllData = async () => {
    const db = await databaseHelper();
    const user_id = localStorage.getItem("user_data_id");
    setUser(user_id ? parseInt(user_id) : 0);

    const resp: Array<FamilleInterface> = await db.select(getAllFamilleSql);
    // const produitLst: Array<ProduitInter> = await db.select("select * from produit");
    // setProduits(produitLst);
    setList(resp);
  };

  const ajoutTable = async () => {
    try {
      const db = await databaseHelper();
      await db.execute(insertArticleSql, [
        code_famille,
        prix,
        designation,
        user,
      ]);

      toast({ title: "Success!", description: "Ajout avec success!" })

      setPrix(0);
      setDesignation("");
    } catch (error) {
      toast({ title: "Erreur", description: "Erreur BDD article", variant: "destructive" })
    }
  };

  return (
    <ContentLayout title="Article">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Accueil</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Tableau de bord</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Article</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="p-4 mt-5">
        <CardHeader>
          {/* <CardTitle className="text-2xl">Article</CardTitle> */}
          <CardDescription>
            <Link href="/articles/listes">voir la listes</Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col items-start gap-2">
            <select
              onChange={(e) => setCode(parseInt(e.target.value))}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option
                className=""
                disabled
                selected
                hidden
              >
                Code Famille
              </option>
              {list.map((lst) => (
                <option
                  key={lst.id}
                  value={lst.id}
                  className=""
                >
                  {lst.code_famille + " - " + lst.famille}
                </option>
              ))}
            </select>

            <Input placeholder="NOM ARTICLE" autoComplete="off" value={designation} onChange={e => setDesignation(e.target.value)} />

            <Input
              autoComplete="off"
              type="number"
              min={1}
              placeholder="PRIX"
              value={prix}
              onChange={(e) => setPrix(parseInt(e.target.value))}
            />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button className="text-white" onClick={ajoutTable}>Ajouter</Button>
        </CardFooter>
      </Card>
    </ContentLayout>
  );
}
