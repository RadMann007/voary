"use client"

import { databaseHelper } from '@/lib/utils';
import React, { useEffect, useState } from 'react'
import { VersementTable } from './table-versement';
import { columnsVersement } from './columnVersement';
import { Card } from '@/components/ui/card';

import Link from "next/link";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

export default function VersementList() {

    const [versementLst, setVersementLst] = useState<VersementInterface[]>([]);

    useEffect(()=> {
        getAllFactures();
    },[])

    const getAllFactures = async () => {
        const db = await databaseHelper();
        const versements: Array<VersementInterface> = await db.select("select * from versement where nom_donateur != '' order by id desc");
        setVersementLst(versements);
    }


  return (

    <ContentLayout title="Liste versements">
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
            <BreadcrumbPage>Liste versements</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className='p-8 mt-4 bg-muted'>
        <VersementTable columns={columnsVersement} data={versementLst}/>
    </Card>
    </ContentLayout>
    
  )
}
