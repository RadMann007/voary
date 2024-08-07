"use client";

import React, { useEffect, useState } from 'react';

import { databaseHelper } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { FactureTableData } from './data-tableFac';
import { columnsFacture } from './columnsFac';

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

export default function FacturePage() {

    const [factureLst, setFactureLst] = useState<FactureInterface[]>([]);

    useEffect(()=> {
        getAllFactures();
    },[])

    const getAllFactures = async () => {
        const db = await databaseHelper();
        const factures: Array<FactureInterface> = await db.select("select * from facture order by id desc");
        setFactureLst(factures);
    }

    // const total = factureLst.reduce((sum, cmd) => sum + cmd.montant, 0);

    return (
        <ContentLayout title="Facture">
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
            <BreadcrumbPage>Facture</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className='p-4 mt-2'>
            <h1 className='text-2xl font-bold flex justify-center text-primary underline mb-4'>LIST FACTURES</h1>
            <FactureTableData columns={columnsFacture} data={factureLst} />
        </Card>
    </ContentLayout>
        
    )
}
