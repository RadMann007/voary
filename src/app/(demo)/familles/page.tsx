"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { databaseHelper } from "@/lib/utils";
import Link from "next/link";
import { Select, SelectContent, SelectLabel, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CreateFamillePage() {

  const [codeFamille, setCodeFamille] = useState<String>("");
  const [famille, setFamille] = useState<String>("");
  const [categorieId, setCategorieId] = useState("");

  const [categorieLst, setCategorieLst] = useState<CategorieInterface[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    getAllCategories();
  }, [])

  const getAllCategories = async () => {
    const db = await databaseHelper();
    const categories: Array<CategorieInterface> = await db.select("select * from categorie");
    setCategorieLst(categories)
  }

  const ajoutFamille = async () => {

    if (codeFamille == "" || famille == "") {
      toast({
        title: "Erreur!",
        description: "Erreur: Veuillez remplir tout les champs.",
        variant: "destructive"
      });
      return;
    }

    try {
      const db = await databaseHelper();
      await db.execute("insert into famille (code_famille, famille, categorie) values ($1, $2, $3)", [codeFamille, famille, categorieId]);
      toast({
        title: "Success!",
        description: "famille ajouté avec success!"
      });
      setCodeFamille("")
      setFamille("")
    } catch (error) {
      toast({
        title: "Erreur!",
        description: "Erreur: " + error,
        variant: "destructive"
      });
    }
  }

  return (
    <ContentLayout title="Famille">
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
            <BreadcrumbPage>Familles</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="p-4 mt-2">
        <CardHeader>
          <CardTitle>Nom famille</CardTitle>
          <CardDescription>
            <Link href={"/familles/listes"}>Voir listes</Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Select onValueChange={e => setCategorieId(e)}>
              <SelectTrigger className="">
                <SelectValue placeholder="CATEGORIE" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categorie</SelectLabel>
                  {
                    categorieLst.map((cate, index) => (
                      <SelectItem key={index} value={cate.id.toString()} > {cate.nom_categorie} </SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input autoComplete="off" value={codeFamille.toString()} placeholder="CODE FAMILLE" onChange={e => setCodeFamille(e.target.value)} />
          </div>

          <Input value={famille.toString()} placeholder="NOM FAMILLE" onChange={e => setFamille(e.target.value)} />
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button className="text-white" onClick={ajoutFamille}>Ajouter</Button>
        </CardFooter>
      </Card>
    </ContentLayout>

  );
}
