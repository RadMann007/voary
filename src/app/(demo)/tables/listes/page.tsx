"use client";

import { useEffect, useState } from "react";
import { databaseHelper } from "@/lib/utils";
import { DataTableComponent } from "@/components/Table/TableListComponent";
import { columnTable } from "./column";
import { getAllTableSql } from "@/app/script/table_script";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
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
  const [tables, setTables] = useState<TableInterface[]>([]);

  useEffect(() => {
    affiche();
  });

  const affiche = async () => {
    const db = await databaseHelper();

    const resp: Array<TableInterface> = await db.select(getAllTableSql);
    setTables(resp);
    db.close();
  };

  return (
    <ContentLayout title="Ajout table">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/enreprise">Accueil</Link>
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
            <BreadcrumbPage>Ajout table</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="flex flex-col p-8 mt-4">
      <Button className="flex gap-2 max-w-min text-white">
        <Plus size={15} />
        <Link href="/tables/">Creer Table</Link>
      </Button>
      <DataTableComponent columns={columnTable} data={tables} />
    </Card>
    </ContentLayout>

    
  );
}

export default ListeFamillePage;
