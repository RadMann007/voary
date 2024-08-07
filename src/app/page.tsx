/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { selectOneUsersSql } from "./script/user_script";
import { useToast } from "@/components/ui/use-toast";

import { databaseHelper } from "@/lib/utils";
import Image from "next/image";
import InscriptionComponent from "@/components/Inscription/InscriptionComponent";

export default function LoginPage() {
  const [nom, setNom] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userLst, setUserLst] = useState<ClientInterface[]>([])
  // const [isAdmin, setIsAdmin] = useState<boolean | string>(false);

  const route = useRouter();
  const { toast } = useToast();

  // const handleCheck = (value: boolean | string) => {
  //   console.log("check:", value);
  //   setIsAdmin(value);
  // };

  useEffect(()=> {
    getAllUser();
  },[userLst]);

  const getAllUser = async () => {
    const db = await databaseHelper();
      const usr: Array<ClientInterface> = await db.select("select * from users");
      setUserLst(usr)
  }

  const insert = async () => {
    setIsLoading(true);

    if (nom === "" || password === "") {
      toast({
        title: "Erreur!",
        description: "Veuillez remplire tout les champs!",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const db = await databaseHelper();
      const usr: Array<ClientInterface> = await db.select(selectOneUsersSql, [
        nom,
        password,
      ]);

      if (usr.length === 1) {
        localStorage.setItem("user_data_id", usr[0].id);
        localStorage.setItem("user_data_name", usr[0].nom);
        route.push("/entreprise");
        setIsLoading(false);
        return;
      }
    } catch (error) {
      toast({
        title: "Erreur!",
        description: "Erreur :" + error,
        variant: "destructive",
      });
      setNom("");
      setPassword("");
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    toast({
      title: "Erreur!",
      description: "Mot de passe ou nom d'utilisateur incorect!",
      variant: "destructive",
    });
  };

  return (
    <div className="h-screen lg:grid bg-yellow-800/10 backdrop-blur-sm lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      {
        userLst.length > 3 ? <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[450px] shadow-xl gap-6 border bg-white p-8 backdrop-blur-md rounded-3xl">
          <div className="grid gap-2 text-center">
            <div className="h-32">
              <Image
                src="restoLogo.png"
                alt="Image"
                width="1920"
                height="1080"
                className="h-full w-full object-cover bg-white/45 backdrop-blur-md"
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">NOM</Label>
              <Input
                id="email"
                type="email"
                placeholder="John"
                className="bg-muted"
                required
                autoComplete="off"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">MOT DE PASSE</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Mot de passe oubliée ?
                </Link>
              </div>
              <Input
                autoComplete="off"
                id="password"
                className="bg-muted"
                placeholder="Mot de passe"
                value={password}
                type="password"
                required
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </div>
            <Button
              onClick={insert}
              variant="default"
              type="submit"
              className="w-full text-white font-bold"
            >
              {isLoading ? "Chargement" : "Se connecter"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Pas encore de compte?{" "}
            <Label className="underline">
              S'inscrire
            </Label>
          </div>
        </div>
      </div> : <InscriptionComponent />
      }

      <div className="hidden bg-muted lg:block">
        <Image
          src="food5.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
