export const insertCommandeSql: string = "INSERT INTO commande (numero_table, quantite, article, prix) VALUES ($1, $2, $3, $4)";
export const getAllCommandeSql: string = "SELECT * FROM commande ORDER BY id DESC";

export const getAllCommandeByIdSql: string = "SELECT * FROM commande WHERE id = $1";

export const getAllCommandeByTableIdSql: string = "select commande.id,commande.numero_table,commande.quantite, article.designation,article.prix from commande join article on commande.article = article.id where numero_table = $1 AND en_cours = true;";

export const updateCommandeSql: string = "UPDATE commande SET numero_table = $1, quantite = $2, article = $3 WHERE id = $4";
export const deleteCommandeSql: string = "DELETE FROM commande WHERE id = $1";

export const getAllCommandArticle: string ="SELECT commande.id,commande.numero_table,commande.quantite,article.designation, article.prix FROM commande JOIN article ON commande.article = article.id;"

export const getSommeTotalCommand: string ="SELECT commande.id,commande.numero_table,commande.quantite,commande.article,ttable.id as tables,article.prix,SUM(article.prix * commande.quantite) as total_prix FROM commande JOIN ttable ON ttable.id = commande.numero_table JOIN article ON article.id = commande.article WHERE commande.numero_table = $1";