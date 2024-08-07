"use client";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

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


import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { cn, databaseHelper } from "@/lib/utils";
import { fr } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";
import { formatMontant } from "@/app/script/montant_format";
import { useRouter } from "next/navigation";

export default function VersementPage() {

    const [date, setDate] = useState<Date>();
    const [donateur, setDonateur] = useState("");
    const [receveur, setReceveur] = useState("");
    const [typePayment, setTypePayment] = useState<string>("Espece");
    const [montantRecu, setMontantRecu] = useState<number>(0);
    const [montantCaisse, setMontantCaisse] = useState<number>(0);
    const [totalMontantCaisse, setTotalMontantCaisse] = useState(0);

    const [caisseInfo, setCaisseInfo] = useState<EntrepriseInterface[]>([]);

    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        getFondCaisse();
    })

    const getFondCaisse = async () => {
        const db = await databaseHelper();
        const fcaisse: Array<EntrepriseInterface> = await db.select("select * from entreprise where id = 1 limit 1;");
        setCaisseInfo(fcaisse);
        setMontantCaisse(fcaisse[0].montant_caisse);
        setTotalMontantCaisse(fcaisse[0].montant_caisse);
    }

    const faireVersement = async () => {
        const db = await databaseHelper();
        const ma_date = date && format(date, "dd-MM-yyyy");

        if ((date === undefined) || donateur === "" || receveur === "") {
            alert("veuillez remplir tout les champs!");
            return;
        }

        if (montantCaisse > totalMontantCaisse) {
            alert("verifier le montant svp!");
            return;
        } else {

            if (montantRecu > montantCaisse) {
                alert("Verifier le montant svp!");
                return;
            }

            if (montantRecu === 0) {
                alert("Ajouter un montant valide");
                return;
            }

            const data: VersementInterface = {
                id: 0,
                dateversement: ma_date,
                mode_paiement: typePayment,
                montant_recu: montantRecu,
                nom_donateur: donateur,
                nom_receveur: receveur,
                montant_caisse: montantCaisse
            }


            await db.execute("insert into versement (montant_recu, dateversement, nom_donateur, mode_paiement, nom_receveur, montant_caisse) values ($1, $2, $3, $4, $5, $6)", [
                data.montant_recu, data.dateversement, data.nom_donateur, data.mode_paiement, data.nom_receveur, montantCaisse
            ]);

            await db.execute("UPDATE entreprise SET montant_caisse = (SELECT montant_caisse FROM entreprise WHERE id = 1) - $1 WHERE id = 1;", [montantRecu]);
            // await db.execute("UPDATE entreprise SET fond_caisse = (SELECT fond_caisse FROM entreprise WHERE id = 1) + $1 WHERE id = 1;", [montantRecu]);

            setDonateur("");
            setReceveur("");
            setMontantRecu(0);
            setMontantCaisse(0);

            toast({
                title: "Success!",
                description: "versement réussie!",
                variant: "default",
            });

            router.push("/versement/listes")
        }
    }

    return (

        <ContentLayout title="Faire un vérsement">
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
                        <BreadcrumbPage>Faire un vérsement</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Card className="p-10 mt-4">
                <CardHeader>
                    <CardDescription>
                        <Label className='text-2xl w-full flex justify-start'>Montant de caisse: {formatMontant(totalMontantCaisse)} </Label>
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">

                    {/* Date */}
                    <div className="flex items-center">
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
                                    {date ? format(date, "PPP", { locale: fr }) : <span>Choisir la date</span>}
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

                    {/* Donateur */}
                    <div className="flex items-center">
                        <Label className='w-2/6'>Nom du donateur:</Label>
                        <Input autoComplete="off" placeholder='Donateur' value={donateur} onChange={e => setDonateur(e.target.value)} />
                    </div>

                    {/* Receveur */}
                    <div className="flex items-center">
                        <Label className='w-2/6'>Nom du receveur:</Label>
                        <Input autoComplete="off" placeholder='Receveur' value={receveur} onChange={e => setReceveur(e.target.value)} />
                    </div>

                    {/* Mode de paiement */}
                    <div className='flex items-center'>
                        <Label className='w-2/6'>Mode de paiement</Label>
                        <div className='w-full'>
                            <Select onValueChange={e => setTypePayment(e)}>
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

                    {/* Montant caisse */}
                    <div className='flex items-center'>
                        <Label className='w-2/6'>Montant caisse</Label>
                        <Input autoComplete="off" disabled min={1} type='number' value={montantCaisse} onChange={e => setMontantCaisse(parseInt(e.target.value))} placeholder='0 Ar' />
                    </div>

                    {/* Montant */}
                    <div className='flex items-center'>
                        <Label className='w-2/6'>Montant recu</Label>
                        <Input autoComplete="off" min={1} type='number' value={montantRecu} onChange={e => setMontantRecu(parseInt(e.target.value))} placeholder='0 Ar' />
                    </div>

                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button className="w-full" onClick={faireVersement}>Valider</Button>
                </CardFooter>
            </Card>
        </ContentLayout>

    )
}
