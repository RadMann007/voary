"use client"

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


import { ShoppingCart, Table2, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { selectAllUsersSql } from "@/app/script/user_script";
import { databaseHelper } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"
import { getAllArticleSql } from "@/app/script/article_script";
import { getAllTableSql } from "@/app/script/table_script";
import { getAllFamilleSql } from "@/app/script/famille_script";
import { formatMontant } from "@/app/script/montant_format";

export default function DashboardPage() {
  const [userNbr, setUserNbr] = useState(0);
  const [articleNbr, setArticleNbr] = useState(0);
  const [tableNbr, setTableNbr] = useState(0);
  const [famillesNbr, setFamilleNbr] = useState(0);
  const [info, setInfo] = useState<EntrepriseInterface[]>([]);

  useEffect(() => {
    getAllData();
    getInformations();
  },[])

  const getInformations = async () => {
    const db = await databaseHelper();
    const entreprise: Array<EntrepriseInterface> = await db.select("select * from entreprise where id = 1 limit 1;");
    setInfo(entreprise)
  }

  const getAllData = async () => {
    try {
      const db = await databaseHelper();

      const users: Array<ClientInterface> = await db.select(selectAllUsersSql);
      const articles: Array<ArticleInterface> = await db.select(getAllArticleSql);
      const tables: Array<TableInterface> = await db.select(getAllTableSql);
      const familles: Array<FamilleInterface> = await db.select(getAllFamilleSql);

      setUserNbr(users.length - 2);
      setArticleNbr(articles.length);
      setTableNbr(tables.length);
      setFamilleNbr(familles.length)
    } catch (error) {

    }
  }
  const menu_item = [
    {
      title: "Total des Utilisateurs",
      icon: <Users />,
      total: userNbr
    },
    {
      title: "Total des Articles",
      icon: <Users />,
      total: articleNbr
    },
    {
      title: "Total des Tables",
      icon: <Table2 />,
      total: tableNbr
    },
    {
      title: "Total des Familles",
      icon: <ShoppingCart />,
      total: famillesNbr
    },
    {
      title: "Total des Commandes",
      icon: <ShoppingCart />,
      total: famillesNbr
    },
  ];
  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col p-4">
        <div className="flex justify-around items-center gap-4">
          {menu_item.map((menu, index) => (
            <Card key={index} className="bg-muted">
              <CardHeader className="pb-2">
                <CardDescription> {menu.title} </CardDescription>
                <CardTitle className="text-2xl flex items-center justify-center gap-2"> {menu.icon} {menu.total} </CardTitle>
              </CardHeader>
              {/* <CardContent>
              <div className="text-xs text-muted-foreground">{menu.icon}</div>
            </CardContent> */}
              <CardFooter>
                <Progress value={menu.total} />
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="w-full mt-4">
          {/* <ListCommand /> */}
          <Card className="sm:col-span-2 bg-muted">
            <CardHeader className="pb-3">
              <CardTitle>Montant de caisse</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Total montant de caisse
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col gap-2 items-start">
              <h1 className="text-2xl font-bold">Total: {formatMontant(info[0]?.montant_caisse)} </h1>
            </CardFooter>
          </Card>
        </div>
      </div>
    </ContentLayout>
  );
}
