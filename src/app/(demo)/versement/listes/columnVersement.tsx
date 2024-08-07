"use client"

import { formatMontant } from "@/app/script/montant_format";
import { Label } from "@/components/ui/label";
import { ColumnDef } from "@tanstack/react-table"

export const columnsVersement: ColumnDef<VersementInterface>[] = [
  {
    accessorKey: "dateversement",
    header: "Date",
  },
  {
    accessorKey: "nom_donateur",
    header: "Donateur",
    cell:({row}) => {
        const versement = row.original;
        return <Label > {versement.nom_donateur} </Label>
    }
  },
  {
    accessorKey: "nom_receveur",
    header: "Receveur",
    cell:({row}) => {
        const versement = row.original;
        return <Label > {versement.nom_receveur} </Label>
    }
  },
  {
    accessorKey: "mode_paiement",
    header: "Mode de paiement"
  },
  {
    accessorKey: "montant_caisse",
    header: "Montant en caisse",
    cell:({row}) => {
      const versement = row.original;
      return <Label > {formatMontant(versement.montant_caisse)} </Label>
  }
  },
  {
    accessorKey: "montant_recu",
    header: "Montant recu",
    cell: ({row}) => {
        const versement = row.original;
        return <Label> {formatMontant(versement.montant_recu)} </Label>
    }
  },
]
