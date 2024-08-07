/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { databaseHelper } from "@/lib/utils";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

export interface ProfilUserInterface {
  id: number
  poste: string
}

export default function UsersComponent() {
  const [nom, setNom] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [profilLst, setProfilLst] = useState<ProfilUserInterface[]>([]);
  const [profil, setProfil] = useState(1);

  const { toast } = useToast();

  useEffect(() => {
    getUserPoste();
  }, []);


  const getUserPoste = async () => {
    const db = await databaseHelper();
    const profils: Array<ProfilUserInterface> = await db.select("select * from profil");
    setProfilLst(profils);
  }

  const addUser = async () => {
    if (nom === "" || password == "") {
      alert("Erreur! Veuiller remplir tout les champs");
      return;
    }
    try {
      console.log("nom: ", nom, " password: ", password, "isAdmin: ", isAdmin);
      const db = await databaseHelper();
      await db.execute("insert into users (nom, admin, password, poste) values ($1, $2, $3, $4);", [nom, isAdmin, password, profil]);
      toast({
        title: "Success!",
        description: "Utilisateur ajouté avec success!",
      });
      setNom("");
      setPassword("");
    } catch (error) {
      toast({
        title: "Erreur!",
        description: "Erreur: " + error,
        variant: "destructive",
      });
    }
  };

  return (

    <ContentLayout title="Utilisateur">
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
            <BreadcrumbPage>Utilisateurs</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="p-4 mt-2">
        <CardHeader className="flex justify-center items-center text-2xl font-bold underline text-primary uppercase">Ajouter un utilisateur </CardHeader>
        <CardContent>
          <form className="flex flex-col items-start gap-2">
            <div className="grid grid-cols-2 gap-2 w-full">
              <Input
                autoComplete="off"
                placeholder="Nom"
                value={nom.toString()}
                onChange={(e) => setNom(e.target.value)}
              />

              <Select onValueChange={e => setProfil(parseInt(e))}>
                <SelectTrigger className="">
                  <SelectValue placeholder="Type de compte" />
                </SelectTrigger>
                <SelectContent>
                  {
                    profilLst.map(pr => <SelectItem key={pr.id} value={pr.id.toString()} > {pr.poste} </SelectItem>)
                  }
                </SelectContent>
              </Select>
            </div>

            <Input
              autoComplete="off"
              placeholder="Mot de passe"
              value={password.toString()}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex gap-2 items-center">
              <Checkbox defaultChecked={isAdmin} id="isAdmin" onCheckedChange={() => setIsAdmin(!isAdmin)} /> <label htmlFor="isAdmin">Admin</label>
            </div>

          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-start items-start gap-2 border-t px-6 py-4">
          <Button className="text-primary-foreground w-full" onClick={addUser}>
            Ajouter
          </Button>
          <Link className="flex text-primary underline" href="/users/profil">Créer profil s'il n'existe pas encore!</Link>
        </CardFooter>
      </Card>
    </ContentLayout>


  );
}
