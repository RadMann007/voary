"use client";

import { getAllTableSql } from "@/app/script/table_script";
import { databaseHelper } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";

function CommandePage() {

  const [tableList, setTableList] = useState<TableInterface[]>([]);

  useEffect(() => {
    getAllDataInDataBase();
  });

  const router = useRouter();


  const getAllDataInDataBase = async () => {
    const db = await databaseHelper();
    const tables: Array<TableInterface> = await db.select(getAllTableSql);
    setTableList(tables);
  };

  const getSommeTotal = async ({ id }: { id: string }) => {
    // const db = await databaseHelper();
    // const somme:Array<SommeInterface> = await db.select(getSommeTotalCommand, [id]);
    // console.log("somme",somme[0].total_prix)
    // return somme;
    router.push('/commandes/consultation?id=' + id);
  }

  return (
    <ContentLayout title="Commandes">
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
            <BreadcrumbPage>Commandes</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-4 w-full">
      <h1 className="text-3xl font-bold flex w-full justify-center text-primary underline font-serif mt-4">FAIRE UNE COMMANDE</h1>
      <div className="grid grid-cols-3 gap-2">
        {tableList.map((tb, index) => (
          <Card className="p-4 flex flex-col bg-muted" key={index}>
            <div className="flex flex-col justify-center items-center">
              <CardHeader className="text-3xl text-secondary-foreground font-bold flex items-center justify-center">
                TABLE {tb.id}
              </CardHeader>
              <CardContent className="flex justify-center items-center">
                {tb.disponible ? (
                  <h1 className="text-2xl text-primary font-bold">
                    DISPONIBLE
                  </h1>
                ) : (
                  <h1 className="text-2xl text-red-400 font-bold">OCCUPÉE</h1>
                )}{" "}
              </CardContent>

            </div>
            <div className="flex gap-2 flex-col">
              
              <Button
                className="w-full font-bold"
                variant="outline"
                onClick={() => getSommeTotal({ id: tb.id })}
              >
                CONSULTER
              </Button>
              <Button className="font-bold" onClick={() => router.push("/commandes/faire-commande?id=" + parseInt(tb.id))}>
                FAIRE UNE COMMANDE</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
    </ContentLayout>
  );
}

export default CommandePage;
