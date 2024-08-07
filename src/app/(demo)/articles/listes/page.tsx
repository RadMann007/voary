"use client";

import { useEffect, useState } from "react";
import { databaseHelper } from "@/lib/utils";
import { ColumnTableArticle } from "./column";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { articleJoinUserSql } from "@/app/script/article_script";
import { ArticleTable } from "./ArticleTable";
import { Card } from "@/components/ui/card";

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

function ListeFamillePage() {
  const [articles, setArticles] = useState<ArticleUserInterface[]>([]);

  useEffect(() => {
    affiche();
  }, []);

  const affiche = async () => {
    const db = await databaseHelper();

    const resp: Array<ArticleUserInterface> = await db.select(articleJoinUserSql);
    setArticles(resp);
    db.close();
  };

  return (

    <ContentLayout title="Liste articles">
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
            <BreadcrumbPage>Liste articles</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col w-full mt-4">
        <Card className="p-8 bg-muted">
          <Button className="flex gap-2 text-white max-w-min">
            <Plus size={15} />
            <Link href="/dashboard/articles/">Créer Article</Link>
          </Button>
          <ArticleTable columns={ColumnTableArticle} data={articles} />
        </Card>
      </div>
    </ContentLayout>

  );
}

export default ListeFamillePage;
