/* eslint-disable react-hooks/rules-of-hooks */
import { useToast } from "@/components/ui/use-toast";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Database from 'tauri-plugin-sql-api';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const databaseHelper = async () => {
  const db = await Database.load("sqlite:dboulanger.db");
  return db;
}

export const messageAlert = ({ title, message, typeMsg }: { title: string, message: string, typeMsg: string }) => {
  const { toast } = useToast();
  if (typeMsg === "erreur") {

    return toast({
      title: title,
      description: message,
      variant: "destructive"
    });

  } else {

    return toast({
      title: title,
      description: message
    });

  }
}
