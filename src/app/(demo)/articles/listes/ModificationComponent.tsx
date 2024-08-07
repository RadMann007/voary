"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {Pencil} from 'lucide-react';

import { databaseHelper } from "@/lib/utils";
import { updateArticleSql } from "@/app/script/article_script";
import { useToast } from "@/components/ui/use-toast";

function ModificationComponent({ data }: { data: ArticleUserInterface }) {

  const [code, setCode] = useState(data.code_famille);
  const [prix, setPrix] = useState(data.prix);
  const [designation, setDesignation] = useState(data.designation);

  const {toast} = useToast();


  const onSubmit = async () => {
    console.log("ID: ",data.id, "code: ", code," prix: ",prix," designation: ",designation);
    
    try {
      const db = await databaseHelper();
      await db.execute(updateArticleSql, [code, prix, designation, 1, data.id]);
      
      window.location.reload();
    } catch (error) {
      toast({title:"Erreur", description: "Erreur table article: "+error, variant: "destructive"})
    }
  }

  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
        <Button variant="outline" size="icon"> <Pencil /> </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modifier Article</DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription> */}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                CODE FAMILLE
              </Label>
              <Input
              autoComplete="off"
              disabled
                id="code"
                defaultValue={code}
                className="col-span-3"
                onChange={e => setCode(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prix" className="text-right">
                PRIX
              </Label>
              <Input
              autoComplete="off"
                id="prix"
                defaultValue={prix}
                className="col-span-3"
                onChange={e => setPrix(parseInt(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="designation" className="text-right">
                DESIGNATION
              </Label>
              <Input
              autoComplete="off"
                id="designation"
                defaultValue={designation}
                className="col-span-3"
                onChange={e => setDesignation(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="text-white" onClick={onSubmit}>Modifier</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ModificationComponent;
