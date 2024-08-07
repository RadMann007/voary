"use client"

import { getAllCommandeByTableIdSql } from '@/app/script/commande_script';
import { cn, databaseHelper } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { fr } from 'date-fns/locale'
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
import { CheckCircle2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useToast } from '@/components/ui/use-toast';

export interface UserInterface {
    id: number
    nom: string
    admin: boolean
    poste: number
}

function ConsultationPage() {

    const [commandeLst, setCommandLst] = useState<CommandePrixInterface[]>([]);
    const [montant_recu, setMontantRecu] = useState<number>(0);
    const [montant_retourne, setMontantRetourne] = useState<number>(0);
    const [typePayment, setTypePayment] = useState<string>("Espece");
    const [date, setDate] = React.useState<Date>();
    const [client, setClient] = useState("");
    // const [userLst, setUserLst] = useState<UserInterface[]>([]);

    const search_params = useSearchParams();
    const query = search_params.get("id");
    const table_number = query ? parseInt(query) : 1;

    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        getCommandLst({ id: table_number });
        // getAllUser()
    });

    // const getAllUser = async () => {
    //     const db = await databaseHelper();
    //     const users: Array<UserInterface> = await db.select("select * from users where id != 1 and id !=2");
    //     setUserLst(users);
    // }

    const getCommandLst = async ({ id }: { id: number }) => {
        const db = await databaseHelper();
        const commandes: Array<CommandePrixInterface> = await db.select(getAllCommandeByTableIdSql, [id]);
        setCommandLst(commandes);
    }

    const handleChangeMontantRecu = ({ value }: { value: number }) => {
        setMontantRecu(value)
        let montant = (total - value) * -1;
        setMontantRetourne(montant);
    }

    const total = commandeLst.reduce((sum, cmd) => sum + (cmd.prix * cmd.quantite), 0);

    const handleChangeTypePayment = ({ typePay }: { typePay: string }) => {
        setTypePayment(typePay);
        if (typePay != "Espece") {
            setMontantRecu(total)
        } else {
            setMontantRecu(0)
        }
        setMontantRetourne(0);
    }

    const faireVersement = async ({versement}: {versement: VersementInterface}) => {
        const db = await databaseHelper();
        await db.execute("insert into versement (montant_caisse, dateversement, nom_donateur, mode_paiement) values ($1, $2, $3, $4)",
            [versement.montant_caisse, versement.dateversement, versement.nom_donateur, versement.mode_paiement])
    }

    const ajoutMontantDeCaisse = async () => {
        const db = await databaseHelper();
        await db.execute("UPDATE entreprise SET montant_caisse = (SELECT montant_caisse FROM entreprise WHERE id = 1) + $1 WHERE id = 1;",[total]);
    }

    const createFacture = async () => {
        if (montant_recu < total) {
            toast({
                title: "Success!",
                description: "montant insuffisant",
                variant: "destructive",
              });
        } else {
            //make payment
            const db = await databaseHelper();
            const val: { nombre_factures: number }[] = await db.select("SELECT COUNT(*) AS nombre_factures FROM facture;");
            const facture_length: number = val[0].nombre_factures + 1;

            const ma_date = date && format(date, "dd-MM-yyyy")

            await db.execute("INSERT INTO facture (nom_facture, montant, date_facture) VALUES ($1, $2, $3);", ["FAC-000" + facture_length, total, ma_date]);
            const last_fac: Array<FactureInterface> = await db.select("SELECT * FROM facture ORDER BY id DESC LIMIT 1;");
            const last_fac_id: number = last_fac[0].id;

            await db.execute("UPDATE commande SET en_cours = false, facture_id = $1 where numero_table = $2 and en_cours = true", [last_fac_id, table_number]);
            await db.execute("UPDATE ttable SET disponible = true Where id = $1 and disponible = false", [table_number]);

            const dataVersement: VersementInterface = {
                id: 0,
                dateversement: ma_date,
                mode_paiement: typePayment,
                montant_caisse: total,
                nom_receveur: "",
                nom_donateur:"",
                montant_recu: 0
            }

            faireVersement({versement: dataVersement});
            ajoutMontantDeCaisse();

            db.close();

            toast({
                title: "Success!",
                description: "Facture crée avec success !",
                variant: "default",
              });

              setClient("")
              setMontantRecu(0)
              setMontantRetourne(0);
              router.push("/factures")

        }
    }


    return (
        <div className='flex flex-col gap-2'>
            <Card className='p-4 overflow-x-auto h-2/3'>
                <div className='flex gap-2 justify-center'>
                    <h1 className='text-2xl font-bold underline text-green-300 mb-4'>CREER FACTURE TABLE{table_number}</h1>
                    {/* {JSON.stringify(userLst)} */}
                </div>
                <Table>
                    <TableCaption> Liste commande table: {table_number} </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Qtt</TableHead>
                            <TableHead >Désignation</TableHead>
                            <TableHead >Prix Unitaire</TableHead>
                            <TableHead>Montant</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            commandeLst.map((cmd, index) => (
                                <TableRow key={index}>
                                    <TableCell > {cmd.quantite} </TableCell>
                                    <TableCell > {cmd.designation} </TableCell>
                                    <TableCell > {cmd.prix} </TableCell>
                                    <TableCell > {(cmd.prix) * cmd.quantite} Ar</TableCell>
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
            
            <Card className='p-4 flex flex-col gap-3'>
                <div className='flex items-center'>
                    <Label className='w-2/6'>Date:</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP", {locale: fr}) : <span>Choisir la date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                            lang='fr-FR'
                            locale={fr}
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className='flex items-center'>
                    <Label className='w-2/6'>Nom du client:</Label>
                    {/* <Select onValueChange={e => setClient(parseInt(e))}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Utilisateur" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    userLst.map((usr, index) => <SelectItem key={index} value={usr.poste.toString()} > {usr.nom} </SelectItem>)
                                }
                            </SelectContent>
                        </Select> */}
                    <Input autoComplete="off" placeholder='Client' value={client} onChange={e => setClient(e.target.value)}/>
                </div>
                <div className='flex items-center'>
                    <Label className='w-2/6'>Mode de paiement</Label>
                    <div className='w-full'>
                        <Select onValueChange={e => handleChangeTypePayment({ typePay: e })}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Moyen de paiement" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Espece">Espece</SelectItem>
                                <SelectItem value="Mobile">Mobile</SelectItem>
                                <SelectItem value="Cheque">Cheque</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='flex items-center'>
                    <Label className='w-2/6'>Montant recu</Label>
                    <Input autoComplete="off" type='number' value={montant_recu} onChange={e => handleChangeMontantRecu({ value: parseInt(e.target.value) })} placeholder='0 Ar' />
                </div>
                <div className='flex items-center'>
                    <Label className='w-2/6'>Montant retourné</Label>
                    <Input autoComplete="off" disabled value={montant_retourne} placeholder='0 Ar' />
                </div>

                <Button color='success' className='text-white' disabled={commandeLst.length === 0 ? true : false} onClick={createFacture}><CheckCircle2 size={15} className='mr-2' /> Valider facture</Button>
            </Card>
        </div>
    )
}

export default ConsultationPage;