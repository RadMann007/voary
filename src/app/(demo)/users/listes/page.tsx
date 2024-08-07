"use client";

import { useEffect, useState } from "react";
import { databaseHelper } from "@/lib/utils";
import { DataTableComponent } from "@/components/Table/TableListComponent";
import { columns } from "./columns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import Link from "next/link";

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

function ListUsers() {
  const [users, setUsers] = useState<ClientInterface[]>([]);

  useEffect(() => {
    affiche();
  });

  const router = useRouter();

  const affiche = async () => {

    const db = await databaseHelper();

    const resp: Array<ClientInterface> = await db.select("select * from users where id != 1 and id != 2");
    setUsers(resp);
    db.close();
  };

  return (

    <ContentLayout title="Liste utilisateur">
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
            <BreadcrumbPage>Liste utilisateur</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="p-8 mt-2">
        <Button onClick={() => router.push("/users/profil")}>Ajouter profil</Button>
        <DataTableComponent columns={columns} data={users} />
      </Card>
    </ContentLayout>


  );
}

export default ListUsers;
