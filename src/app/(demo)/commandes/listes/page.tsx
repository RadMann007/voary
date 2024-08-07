"use client";

import { DataTableComponent } from "@/components/Table/TableListComponent";
import { databaseHelper } from "@/lib/utils";

import { useEffect, useState } from "react";
import { columnCommand } from "./column";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAllCommandArticle } from "@/app/script/commande_script";

export default function CommandeListPage() {
  // numero_table, quantite, article

  const [commandList, setCommandList] = useState<CommandeArticleInterface[]>([]);

  useEffect(() => {
    getAllDataInDataBase();
  }, []);

  const getAllDataInDataBase = async () => {
    const db = await databaseHelper();
    const command_data: Array<CommandeArticleInterface> = await db.select(
      getAllCommandArticle
    );
    console.log(command_data);
    setCommandList(command_data);
  };

  return (
      <DataTableComponent columns={columnCommand} data={commandList} />
    );
}
