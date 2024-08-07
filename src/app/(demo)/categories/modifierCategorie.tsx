"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { databaseHelper } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';


export default function ModifyCategoryComponent({ categorie }: { categorie: CategorieInterface }) {

    const [nom, setNom] = useState(categorie.nom_categorie);
    const {toast}= useToast();

    const modifyCategory = async () => {

        try {
            const db = await databaseHelper();
            await db.execute("UPDATE categorie SET nom_categorie = $1 WHERE id = $2", [nom, categorie.id]);
        } catch (error) {
            toast({title:"Erreur", description: "Erreur table Catégorie: "+error, variant: "destructive"})
        }
    }
    

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon"> <Pencil /> </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>MODIFIER {categorie.nom_categorie} </SheetTitle>
                    <SheetDescription>
                        Modification catégorie.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="categorie" className="text-right">
                            CATEGORIE
                        </Label>
                        <Input autoComplete="off" id="categorie" value={nom} className="col-span-3" onChange={e => setNom(e.target.value)}/>
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button onClick={modifyCategory} type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>

    )
}
