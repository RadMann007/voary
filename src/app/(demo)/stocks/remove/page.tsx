"use client";

import { getAllFamilleSql } from '@/app/script/famille_script';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select';
import { databaseHelper } from '@/lib/utils';
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

export default function RemovePage() {

  const [familleLst, setFamilleLst] = useState<FamilleInterface[]>([]);
  const [familleId, setFamilleId] = useState<string>("");
  const [articleID, setArticleID] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [articleLst, setArticleLst] = useState<ArticleInterface[]>([]);

  useEffect(() => {
    getAllFamilles();
  })

  const getAllFamilles = async () => {
    const db = await databaseHelper();
    const commandes: Array<FamilleInterface> = await db.select(getAllFamilleSql);
    setFamilleLst(commandes);
  }

  const getAllArticleByFamilleId = async ({ code }: { code: string }) => {
    const db = await databaseHelper();
    const articles: Array<ArticleInterface> = await db.select("select * from article where code_famille = $1", [code]);
    setArticleLst(articles);
  }

  const addStock = async () => {
    try {
      if (stock === 0) {
        alert("Veuillez ajouter un stock")
      } else {
        const db = await databaseHelper();
        await db.execute("UPDATE article SET stock = stock - $1 WHERE id = $2", [stock, articleID]);
        setStock(0)
        alert("Stock retiré avec success!");
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

    <ContentLayout title="Sortie">
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
            <BreadcrumbPage>Sortie stock</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className='p-4 flex flex-col gap-4 mt-2'>
      <h1 className='flex justify-center text-2xl text-red-400 underline font-bold'>SORTIR DU STOCK </h1>

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
                <SelectItem key={index} value={article.id}> {article.designation} - Stock: {article.stock} </SelectItem>
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
        <Button variant='destructive' color='danger' className='w-full font-bold' onClick={addStock}>RETIRER DE LA VENTE</Button>
      </div>
    </Card>
    </ContentLayout>

    
  )
}
