"use client";

import { getAllFamilleSql } from '@/app/script/famille_script';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { databaseHelper } from '@/lib/utils';
import { PlusCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

export default function StockPage() {

  const [familleLst, setFamilleLst] = useState<FamilleInterface[]>([]);
  const [familleId, setFamilleId] = useState<string>("");
  const [articleID, setArticleID] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [articleLst, setArticleLst] = useState<ArticleInterface[]>([]);

  const { toast } = useToast();

  const search_params = useSearchParams();
  const query = search_params.get("id");
  const id_famille = query ? parseInt(query) : null;

  useEffect(() => {
    getAllFamilles();
  })

  const getAllFamilles = async () => {
    const db = await databaseHelper();
    if (id_famille === null) {
      const commandes: Array<FamilleInterface> = await db.select(getAllFamilleSql);
      setFamilleLst(commandes);
    } else {
      const commandes: Array<FamilleInterface> = await db.select("select * from famille where id = $1;", [id_famille]);
      setFamilleLst(commandes);
    }
  }

  const getAllArticleByFamilleId = async ({ code }: { code: string }) => {
    const db = await databaseHelper();
    const articles: Array<ArticleInterface> = await db.select("select * from article where code_famille = $1", [code]);
    setArticleLst(articles);
  }

  const addStock = async () => {
    try {
      if (stock === 0) {
        toast({
          title: "Erreur!",
          description: "Veuillez ajouter un stock!",
          variant: "destructive",
        });
      } else {
        const db = await databaseHelper();
        await db.execute("UPDATE article SET stock = stock + $1 WHERE id = $2", [stock, articleID]);
        setStock(0);
        toast({
          title: "Success!",
          description: "Stock ajouté avec success!"
        });
      }

    } catch (error) {
      alert(error)
    }

  }

  const handleFamilleChange = async ({ famille }: { famille: string }) => {
    setFamilleId(famille);
    getAllArticleByFamilleId({ code: famille });
  }


  return (

    <ContentLayout title="Stocks">
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
            <BreadcrumbPage>Entrée stock</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className='p-4 flex flex-col gap-4 mt-2'>
        <h1 className='flex justify-center text-2xl text-primary underline font-bold'>ENTREE STOCK </h1>

        {/* FAMILLE */}
        <div className='flex w-full items-center'>
          <Label className='w-2/6'>FAMILLE</Label>
          <Select onValueChange={e => handleFamilleChange({ famille: e })}>
            <SelectTrigger>
              <SelectValue placeholder="Familles" />
            </SelectTrigger>
            <SelectContent>
              {
                familleLst.map((famille, index) => (
                  <SelectItem key={index} value={famille.id}> {famille.famille} </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>

        {/* ARTICLE */}
        <div className='flex w-full items-center'>
          <Label className='w-2/6'>ARTICLE</Label>
          <Select onValueChange={e => setArticleID(e)}>
            <SelectTrigger>
              <SelectValue placeholder="Article" />
            </SelectTrigger>
            <SelectContent>
              {
                articleLst.map((article, index) => (
                  <SelectItem key={index} value={article.id}> {article.designation} - Stock {article.stock} </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>

        {/* STOCK */}
        <div className='flex w-full items-center'>
          <Label className='w-2/6'>STOCK:</Label>
          <Input autoComplete="off" type='number' min={1} value={stock} placeholder='Stock' onChange={e => setStock(parseInt(e.target.value))} />
        </div>
        <div className='flex w-full items-center'>
          <Label className='w-2/6'></Label>
          <Button variant="default" className='w-full font-bold text-white' onClick={addStock}>AJOUTER</Button>
        </div>
      </Card>
    </ContentLayout>


  )
}
