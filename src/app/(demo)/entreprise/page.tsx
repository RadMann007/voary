"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { databaseHelper } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from 'next/link';

export default function EntreprisePage() {

    const [info, setInfo] = useState<EntrepriseInterface[]>([]);
    const [fond, setFond] = useState<number>(0);

    useEffect(()=> {
        getInformations();
    },[fond]);

    const getInformations = async () => {
        const db = await databaseHelper();
        const entreprise: Array <EntrepriseInterface> = await db.select("select * from entreprise where id = 1 limit 1;");
        setInfo(entreprise)
    }

    const addMontantCaisse = async () => {
        const db = await databaseHelper();
        await db.execute("UPDATE entreprise SET fond_caisse = (SELECT fond_caisse FROM entreprise WHERE id = 1) + $1 WHERE id = 1;",[fond]);
        alert("fond de caisse ajouté avec success!")
        setFond(0)
    }

  return (
    <ContentLayout title="Entreprise">
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
            <BreadcrumbPage>Entreprise</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='flex flex-col gap-4 mt-2'>
     <Card className='p-4 bg-muted'>
        <CardHeader className='text-3xl font-bold'>Restaurant Voary</CardHeader>
        <CardContent>
            <div className='flex flex-col'>
                <h1 className='text-2xl'>Fond de caisse: {info[0]?.fond_caisse} Ar </h1>
                <h1 className='text-2xl'>Montant caisse: {info[0]?.montant_caisse} Ar </h1>
            </div>
        </CardContent>
    </Card>

    <Card className='bg-muted'>
        <CardHeader>
            <CardTitle>Ajouter fond de caisse</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-2'>
            <Input autoComplete="off" placeholder='Fond de caisse' value={fond} type='number' min={1} onChange={e => setFond(parseInt(e.target.value))}/>
            <Button onClick={addMontantCaisse}>Ajouter fond de caisse</Button>
        </CardContent>
    </Card>
   </div>
    </ContentLayout>
   
  )
}
