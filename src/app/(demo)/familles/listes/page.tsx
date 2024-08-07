"use client";

import { useEffect, useState } from "react";
import { databaseHelper } from "@/lib/utils";
import { DataTableComponent } from "@/components/Table/TableListComponent";
import { columnsFamille } from "./column";
import { getAllFamilleSql } from "@/app/script/famille_script";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";


import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

function ListeFamillePage() {
    const [famille, setFamille] = useState<FamilleInterface[]>([]);

  useEffect(() => {
    affiche();
  }, []);

  const affiche = async () => {

    const db = await databaseHelper();

    const resp: Array<FamilleInterface> = await db.select(getAllFamilleSql);
    setFamille(resp);
    db.close();
  };

  return (
    <ContentLayout title="Liste famille">
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
            <BreadcrumbPage>Liste famille</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="flex flex-col p-4 mt-2">
      <Button className="flex gap-2 max-w-min text-white">
        {" "}
        <Plus size={15} />
        <Link href="/familles/">Creer Famille</Link>
      </Button>
      <DataTableComponent columns={columnsFamille} data={famille} />
    </Card>
    </ContentLayout>

    
  );
}

export default ListeFamillePage;
