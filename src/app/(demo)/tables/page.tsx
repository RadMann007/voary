"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { databaseHelper } from "@/lib/utils";
import { PlusCircle } from "lucide-react";


import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";


export default function TableComponent() {

  const { toast } = useToast();

  const ajoutTable = async () => {
    try {
      const db = await databaseHelper();
      await db.execute("INSERT INTO ttable (disponible) VALUES (true)");
      toast({
        title: "Success!",
        description: "Table ajouté avec success!"
      });
    } catch (error) {
      toast({
        title: "Erreur!",
        description: "Erreur: "+error,
        variant: "destructive"
      });
    }
  }

  return (

    <ContentLayout title="Table">
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
            <BreadcrumbPage>Table</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="p-4 mt-2">
      <CardHeader>
        <CardTitle>Nom de la table</CardTitle>
        <CardDescription>
          <Link href="/tables/listes">voir la listes</Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
      <Button className="text-white" onClick={ajoutTable}> <PlusCircle className="mr-2" /> AJOUTER</Button>
      </CardContent>
    </Card>
    </ContentLayout>

    
  );
}
