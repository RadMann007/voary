"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from '@/components/ui/card';
import { databaseHelper } from '@/lib/utils';
import { CategorieTable } from './tableCategorie';
import { columnCategorie } from './column';

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
import { useToast } from '@/components/ui/use-toast';

export default function CategoriesPage() {
  const [categorieLst, setCategorieLst] = useState<CategorieInterface[]>([]);

  const {toast} = useToast();

  useEffect(() => {
    getAllCategorie()
  }, []);

  const getAllCategorie = async () => {
    const db = await databaseHelper();
    const categories: Array<CategorieInterface> = await db.select("select * from categorie;");
    setCategorieLst(categories)
  }

  const formSchema = z.object({
    nom_categorie: z.string().min(3, { message: "le nom doit contenir au moins 3 caracteres" })
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const db = await databaseHelper();
    try {
      await db.execute("insert into categorie (nom_categorie) values ($1)", [values.nom_categorie]);
    } catch (error) {
      toast({title: "Erreur", description: "Erreur BDD Catégorie", variant: "destructive"})
    }
    form.reset();
    getAllCategorie()
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom_categorie: ""
    },
  })

  return (
    <ContentLayout title="Categories">
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
            <BreadcrumbPage>Categories</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='flex flex-col justify-between h-full p-2 gap-4'>
        <Card className='p-4 h-1/5 bg-muted'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
              <div className='grid grid-cols-1 gap-4'>
                <FormField
                  control={form.control}
                  name="nom_categorie"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input autoComplete="off" placeholder="Nom categorie" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">Ajouter</Button>
            </form>
          </Form>
        </Card>

        <div className="flex flex-col h-full gap-2">
          <Card className='p-4 h-full bg-muted'>
            <CategorieTable columns={columnCategorie} data={categorieLst} />
          </Card>
        </div>
      </div>
    </ContentLayout>
  );
}
