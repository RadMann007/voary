/* eslint-disable react/no-unescaped-entities */
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


export default function ModifyFamilleComponent({ famille }: { famille: FamilleInterface }) {

    const [code, setCode] = useState(famille.code_famille);
    const [nom, setNom] = useState(famille.famille);

    const changeFamille = async () => {
        const db = await databaseHelper();
        await db.execute("update famille set code_famille = $1, famille = $2 where id = $3",[code, nom, famille.id]);
        alert("Famille modifié avec success!");
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon"> <Pencil /> </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>MODIFIER {famille.famille} </SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            CODE FAMILLE
                        </Label>
                        <Input autoComplete="off" id="name" value={code} className="col-span-3" onChange={e => setCode(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            FAMILLE
                        </Label>
                        <Input autoComplete="off" id="username" value={nom} className="col-span-3" onChange={e => setNom(e.target.value)}/>
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button onClick={() => changeFamille()}>Modifier</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>

    )
}
