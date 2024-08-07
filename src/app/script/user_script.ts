// Requête SQL pour insérer un utilisateur
export const insertUserSql: string = "INSERT INTO users (nom, admin, password) VALUES ($1, $2, $3)";

export const selectOneUsersSql: string = "SELECT * FROM users WHERE nom = $1 AND password = $2";

// Requête SQL pour récupérer tous les utilisateurs
export const selectAllUsersSql:string = "SELECT * FROM users";

// Requête SQL pour récupérer un utilisateur par son ID
export const selectUserByIdSql:string = "SELECT * FROM users WHERE id = $1";

// Requête SQL pour mettre à jour les informations d'un utilisateur
export const updateUserSql:string = "UPDATE users SET nom = $1, email = $2 WHERE id = $3";

// Requête SQL pour supprimer un utilisateur par son ID
export const deleteUserSql:string = "DELETE FROM users WHERE id = $1";
