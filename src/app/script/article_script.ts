export const insertArticleSql: string = "INSERT INTO article (code_famille, prix, designation, user) VALUES ($1, $2, $3, $4)";
export const getAllArticleSql: string = "SELECT * FROM article ORDER BY id DESC";

export const getArticleByIdSql: string = "SELECT * FROM article WHERE id = $1";
export const getArticleByFamilleIdSql: string = "SELECT * FROM article WHERE code_famille = $1";

export const updateArticleSql: string = "UPDATE article SET code_famille = $1, prix = $2, designation = $3, user = $4 WHERE id = $5";
export const deleteArticleSql: string = "DELETE FROM article WHERE id = $1";
export const articleJoinUserSql: string ="SELECT article.id, article.code_famille, article.prix, article.designation, article.stock, users.nom FROM article JOIN users ON article.user = users.id";