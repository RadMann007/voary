import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

function RecuComponent({ commandeLst }: { commandeLst: CommandeInterface[] }) {
    
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Ticket",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });
  return (
    <div>
      <Button>Print</Button>
    </div>
  );
}

export default RecuComponent;
