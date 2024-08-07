"use client";

import React, { useState } from 'react'
import { Card } from "@/components/ui/card";
import { databaseHelper } from '@/lib/utils';
import Database from 'tauri-plugin-sql-api';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function InscriptionComponent() {

    const [nom, setNom] = useState("")
    const [mdp, setMdp] = useState("");
    const [rmdp, setRmdp] = useState("");

    const inscrire = async () => {
        if(mdp !== rmdp){
            alert("Verifier votre mot de passe")
            return
        }else{
            //inscription!
            const db: Database = await databaseHelper();
            await db.execute("insert into users (nom, admin, password) values ($1, $2, $3)", [nom, 'true', mdp]);
            setNom("")
            setMdp("")
            setRmdp("")
            alert("Admin ajoutée avec success!")
            window.location.reload();
        }
    }

  return (
    <Card className='flex flex-col bg-white justify-center gap-4 p-24'>
        <label className='flex items-center justify-center text-2xl font-bold'>Inscription Admin</label>
        <Input autoComplete='off' placeholder='Nom' value={nom} onChange={e => setNom(e.target.value)}/>
        <Input autoComplete="off" type='password' placeholder='Password' value={mdp} onChange={e => setMdp(e.target.value)}/>
        <Input autoComplete="off" type='password' placeholder='Repetez le Mot de passe' value={rmdp} onChange={e => setRmdp(e.target.value)} />
        <Button variant='default' color='primary' onClick={inscrire}>Inscription</Button>
    </Card>
  )
}
