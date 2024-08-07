export const insertFactureSql: string = "INSERT INTO facture (nom_facture, montant) VALUES ($1, $2);";
export const getNumberFacture: string = "SELECT COUNT(*) AS nombre_factures FROM facture;";