"use client"

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

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

import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { cn, databaseHelper } from "@/lib/utils";
import { fr } from "date-fns/locale";

import { Calendar as CalendarIcon } from "lucide-react"
import { formatMontant } from '@/app/script/montant_format';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface CommandeJointureInterface {
    designation: string;
    total_quantite: number;
    total_prix: number;
    date_facture: string;
}

export interface FamilleFactureJointureInterface {
    famille: string
    total_quantite: number
    total_prix: number
}


export default function RecaPage({ className }: any) {

    const today = new Date();
    const [date, setDate] = useState<DateRange | undefined>({
        from: today,
        to: addDays(today, 5)
    });

    useEffect(() => {
        getInformations();
    }, []);

    const [info, setInfo] = useState<EntrepriseInterface[]>([]);
    const [factureLst, setFactureLst] = useState<FactureInterface[]>([]);
    const [versementLst, setVersementLst] = useState<VersementInterface[]>([]);
    const [commandeLst, setCommandeLst] = useState<CommandeJointureInterface[]>([]);
    const [FamilleLst, setFamilleLst] = useState<FamilleFactureJointureInterface[]>([]);

    const FactureRecap = ({ factures }: { factures: FactureInterface[] }) => {

        const total = factures.reduce((sum, cmd) => sum + cmd.montant, 0);

        return (
            <Card className='p-2 overflow-y-scroll'>
                <h1 className='flex justify-center font-bold text-2xl underline text-primary font-serif'>Factures</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead className="hidden sm:table-cell">n° facture</TableHead>
                            <TableHead className="hidden sm:table-cell">Montant</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            factures.map((fac, index) => (
                                <TableRow key={index} className="">
                                    <TableCell><div className="font-medium"> {fac.date_facture} </div></TableCell>
                                    <TableCell><div className="font-medium"> {fac.nom_facture} </div></TableCell>
                                    <TableCell><div className="font-medium"> {formatMontant(fac.montant)} </div></TableCell>
                                </TableRow>
                            ))
                        }

                        <TableRow className="bg-muted">
                            <TableCell><div className="font-medium"> Total </div></TableCell>
                            <TableCell><div className="font-medium"> - </div></TableCell>
                            <TableCell><div className="font-medium"> {formatMontant(total)} </div></TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </Card>
        )
    }

    const VersementRecap = ({ versements }: { versements: VersementInterface[] }) => {

        const total = versements.reduce((sum, cmd) => sum + cmd.montant_recu, 0);

        return (
            <Card className='p-2 overflow-y-scroll'>
                <h1 className='flex justify-center font-bold text-2xl underline text-primary font-serif'>Versement</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead className="hidden sm:table-cell">Donateur</TableHead>
                            <TableHead className="hidden sm:table-cell">Receveur</TableHead>
                            <TableHead className="hidden sm:table-cell">Montant caisse</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            versements.map((verse, index) => (
                                <TableRow key={index} className="">
                                    <TableCell><div className="font-medium"> {verse.dateversement} </div></TableCell>
                                    <TableCell><div className="font-medium"> {verse.nom_donateur} </div></TableCell>
                                    <TableCell><div className="font-medium"> {verse.nom_receveur} </div></TableCell>
                                    <TableCell><div className="font-medium"> {formatMontant(verse.montant_recu)} </div></TableCell>
                                </TableRow>
                            ))
                        }

                        <TableRow className="bg-muted">
                            <TableCell><div className="font-medium"> Total </div></TableCell>
                            <TableCell><div className="font-medium"> - </div></TableCell>
                            <TableCell><div className="font-medium"> - </div></TableCell>
                            <TableCell><div className="font-medium"> {formatMontant(total)} </div></TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </Card>
        )
    }

    const CommandeRecap = ({ commandes }: { commandes: CommandeJointureInterface[] }) => {

        const total = commandes.reduce((sum, cmd) => sum + cmd.total_prix, 0);

        return (
            <Card className='p-2 overflow-y-scroll'>
                <h1 className='flex justify-center font-bold text-2xl underline text-primary font-serif'>Commandes</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden sm:table-cell">Désignation</TableHead>
                            <TableHead className="hidden sm:table-cell">Total Qtt</TableHead>
                            <TableHead className="hidden sm:table-cell">Total Prix</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            commandes.map((cmd, index) => (
                                <TableRow key={index} className="">
                                    <TableCell><div className="font-medium"> {cmd.designation} </div></TableCell>
                                    <TableCell><div className="font-medium"> {cmd.total_quantite} </div></TableCell>
                                    <TableCell><div className="font-medium"> {formatMontant(cmd.total_prix)} </div></TableCell>
                                </TableRow>
                            ))
                        }

                        <TableRow className="bg-muted">
                            <TableCell><div className="font-medium"> Total </div></TableCell>
                            <TableCell><div className="font-medium"> - </div></TableCell>
                            <TableCell><div className="font-medium"> {formatMontant(total)} </div></TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </Card>
        )
    }

    const FamilleRecap = ({ familles }: { familles: FamilleFactureJointureInterface[] }) => {

        const total = familles.reduce((sum, fml) => sum + fml.total_prix, 0);

        return (
            <Card className='p-2 overflow-y-scroll'>
                <h1 className='flex justify-center font-bold text-2xl underline text-primary font-serif'>Familles</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden sm:table-cell">Famille</TableHead>
                            <TableHead className="hidden sm:table-cell">Total Qtt</TableHead>
                            <TableHead className="hidden sm:table-cell">Total Prix</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            familles.map((fml, index) => (
                                <TableRow key={index} className="">
                                    <TableCell><div className="font-medium"> {fml.famille} </div></TableCell>
                                    <TableCell><div className="font-medium"> {fml.total_quantite} </div></TableCell>
                                    <TableCell><div className="font-medium"> {formatMontant(fml.total_prix)} </div></TableCell>
                                </TableRow>
                            ))
                        }

                        <TableRow className="bg-muted">
                            <TableCell><div className="font-medium"> Total </div></TableCell>
                            <TableCell><div className="font-medium"> - </div></TableCell>
                            <TableCell><div className="font-medium"> {formatMontant(total)} </div></TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </Card>
        )
    }

    const getCommandeByFactureDate = async ({ dateDebut, dateFin }: { dateDebut: string | undefined, dateFin: string | undefined }) => {
        const db = await databaseHelper();
        const commandes: Array<CommandeJointureInterface> = await db.select("SELECT article.designation, SUM(commande.quantite) AS total_quantite, SUM(commande.prix) AS total_prix FROM facture JOIN commande ON facture.id = commande.facture_id JOIN article ON commande.article = article.id WHERE facture.date_facture BETWEEN $1 AND $2 GROUP BY article.designation;", [dateDebut, dateFin])
        // const commandes: Array<CommandeJointureInterface> = await db.select("select facture.nom_facture, facture.date_facture, article.designation, commande.quantite, commande.prix from facture join commande on facture.id = commande.facture_id join article on commande.article = article.id where facture.date_facture BETWEEN $1 and $2;", [dateDebut, dateFin])
        setCommandeLst(commandes);
    }

    const getFamilleByFactureDate = async ({ dateDebut, dateFin }: { dateDebut: string | undefined, dateFin: string | undefined }) => {
        const db = await databaseHelper();
        const familles: Array<FamilleFactureJointureInterface> = await db.select("select facture.montant as total_prix, sum(commande.quantite) as total_quantite, famille.famille as famille from facture join commande on facture.id = commande.facture_id join article on commande.article = article.id join famille on article.code_famille = famille.id where facture.date_facture between $1 and $2 group by famille.famille",[dateDebut, dateFin])
        setFamilleLst(familles);
    }

    const getInformations = async () => {
        const db = await databaseHelper();
        const entreprise: Array<EntrepriseInterface> = await db.select("select * from entreprise where id = 1 limit 1;");
        setInfo(entreprise)
    }

    const getAllFactures = async ({ dateDebut, dateFin }: { dateDebut: string | undefined, dateFin: string | undefined }) => {
        const db = await databaseHelper();
        const factures: Array<FactureInterface> = await db.select("select * from facture where date_facture BETWEEN $1 and $2;", [dateDebut, dateFin]);
        setFactureLst(factures);
    }

    const getVersementByDate = async ({ dateDebut, dateFin }: { dateDebut: string | undefined, dateFin: string | undefined }) => {
        const db = await databaseHelper();
        const versements: Array<VersementInterface> = await db.select("select * from versement where nom_donateur !='' and dateversement BETWEEN $1 and $2;", [dateDebut, dateFin]);
        setVersementLst(versements);
    }

    const affiche = () => {
        const dateDebut = date?.from && format(date.from, "dd-MM-yyyy");
        let dateFin = date?.to && format(date.to, "dd-MM-yyyy");

        if (dateFin === undefined) {
            dateFin = dateDebut;
        }

        getAllFactures({ dateDebut: dateDebut, dateFin: dateFin });
        getVersementByDate({ dateDebut: dateDebut, dateFin: dateFin });
        getCommandeByFactureDate({ dateDebut: dateDebut, dateFin: dateFin });
        getFamilleByFactureDate({ dateDebut: dateDebut, dateFin: dateFin });
    }

    return (
        <ContentLayout title="Récap">
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
              <BreadcrumbPage>Récap</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className='flex flex-col gap-2 mt-2'>
            {/* Date */}
            <Card>
                <CardHeader>
                    <CardTitle className='text-2xl'> <Label className='text-2xl underline'> Fond de caisse: </Label> {formatMontant(info[0]?.fond_caisse)} </CardTitle>
                </CardHeader>
                <CardContent className='flex gap-2 justify-start'>
                    <div className={cn("grid gap-2", className)}>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    id="date"
                                    variant={"outline"}
                                    className={cn(
                                        "w-[300px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {format(date.from, "dd LLL y", { locale: fr })} -{" "}
                                                {format(date.to, "dd LLL y", { locale: fr })}
                                            </>
                                        ) : (
                                            format(date.from, "dd LLL y", { locale: fr })
                                        )
                                    ) : (
                                        <span>Choisir la date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={2}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <Button className='bg-primary' onClick={affiche}>Valider</Button>
                </CardContent>
            </Card>

            {/* Versement et Facture et commande */}
            <ScrollArea className="h-[600px] w-full p-4">
                <div className='grid grid-cols-2 gap-2'>
                    {
                        versementLst.length > 0 && <VersementRecap versements={versementLst} />
                    }

                    {
                        factureLst.length > 0 && <FactureRecap factures={factureLst} />
                    }

                    {
                        commandeLst.length > 0 && <CommandeRecap commandes={commandeLst} />
                    }

                    {
                        FamilleLst.length > 0 && <FamilleRecap familles={FamilleLst} />
                    }
                </div>
            </ScrollArea>

        </div>
      </ContentLayout>

        
    )
}