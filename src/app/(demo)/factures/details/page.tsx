"use client";

import { databaseHelper } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

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

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function DetailFacturePage() {

    const [commandLst, setCommandLst] = useState<CommandePrixInterface[]>([]);

    const search_params = useSearchParams();
    const query = search_params.get("id");
    const numero_facture = query ? parseInt(query) : 1;

    useEffect(() => {
        getAllCommandes();
    })

    const getAllCommandes = async () => {
        //get commands
        const db = await databaseHelper();
        const commandes: Array<CommandePrixInterface> = await db.select("select commande.id, commande.numero_table, commande.quantite, article.designation, commande.prix, commande.facture_id from commande join article on article.id = commande.article where commande.facture_id = $1", [numero_facture]);
        setCommandLst(commandes);
    }

    const total = commandLst.reduce((sum, cmd) => sum + cmd.prix, 0);


    return (
        <ContentLayout title="Détails facture">
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
                        <BreadcrumbPage>Détails facture</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Card className='p-4 mt-2'>
                <h1 className='text-2xl font-bold flex justify-center text-primary underline mb-4'>DETAIL FACTURE</h1>
                <div className='flex justify-end'>
                    <Button className='text-white'><Printer size={15} className='mr-2' />Imprimer</Button>
                </div>
                <Table>
                    <TableCaption> Liste factures table </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Num Table</TableHead>
                            <TableHead >Qtt</TableHead>
                            <TableHead>Désignation</TableHead>
                            <TableHead>Montant</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            commandLst.map((cmd, index) => (
                                <TableRow key={index}>
                                    <TableCell > {cmd.numero_table} </TableCell>
                                    <TableCell > {cmd.quantite} </TableCell>
                                    <TableCell > {cmd.designation}</TableCell>
                                    <TableCell className='font-bold'> {cmd.prix} Ar</TableCell>
                                </TableRow>
                            ))
                        }
                        <TableRow className='bg-muted'>
                            <TableCell className='font-bold underline' > Total </TableCell>
                            <TableCell > - </TableCell>
                            <TableCell > - </TableCell>
                            <TableCell className='font-bold'> {total} Ar</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Card>
        </ContentLayout>


    )
}
