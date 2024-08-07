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


export default function ModifyUserComponent({ user }: { user: ClientInterface }) {

    const [nom, setNom] = useState(user.nom);
    const [mdp, setMdp] = useState(user.password);
    const [rmdp, setRmdp] = useState("");

    const modifyUser = async () => {
        if(mdp !== rmdp){
            alert("Verifier le mot de passe!")
        }else{
            const db = await databaseHelper();
            await db.execute("update users set nom = $1, password = $2 where id = $3",[nom, mdp, user.id]);
            alert("utilisateur modifié avec success!")
        }
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon"> <Pencil /> </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>MODIFIER {user.nom} </SheetTitle>
                    <SheetDescription>
                        Modification d'un utilisateur
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            NOM UTILISATEUR
                        </Label>
                        <Input autoComplete="off" id="name" value={nom} className="col-span-3" onChange={e => setNom(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            MOT DE PASSE
                        </Label>
                        <Input autoComplete="off" type='password' id="password" value={mdp} className="col-span-3" onChange={e => setMdp(e.target.value)}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            REPETEZ LE MOT DE PASSE
                        </Label>
                        <Input autoComplete="off" type='password' id="rpassword" value={rmdp} className="col-span-3" onChange={e => setRmdp(e.target.value)}/>
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button onClick={() => modifyUser()}>MODIFIER</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>

    )
}
