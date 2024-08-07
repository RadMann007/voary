export const insertFamilleSql: string = "INSERT INTO famille (code_famille, famille, categorie) VALUES ($1, $2, $3)";
export const getAllFamilleSql: string = "SELECT * FROM famille";