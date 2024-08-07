interface ClientInterface {
    id: string
    nom: string
    password: string
    admin: boolean | string
}

interface FamilleInterface {
    id: string
    code_famille: string
    famille: string
    prix: number
}

interface TableInterface {
    id: string
    nom: string
    disponible: boolean
}

interface ArticleInterface {
    id: string
    code_famille: string
    prix: number
    designation: string
    user: boolean | string
    stock: number
}

interface ArticleUserInterface {
    id: string
    code_famille: string
    prix: number
    designation: string
    nom: string
    stock: number
}

interface CommandeInterface {
    id: number
    numero_table: number
    quantite: number
    article: number
}
interface CommandePrixInterface {
    id: number
    numero_table: number
    quantite: number
    article: number
    designation: string
    prix: number
    facture_id: number
}
interface CommandeArticleInterface {
    id: number
    numero_table: number
    quantite: number
    designation: string
}

interface SommeInterface {
    id: number;
    numero_table: number;
    prix: number;
    quantite: number;
    tables: number;
    total_prix: number;
}

interface FactureInterface {
    id: number
    nom_facture: string
    montant: number
    date_facture: string
}

interface ProduitInterface {
    id: number
    nom_produit: string
    famille_id: number
    famille: string
    stock: number
}

interface EntrepriseInterface {
    id: number
    fond_caisse: number
    montant_caisse: number
}

interface VersementInterface {
    id: number
    montant_recu: number
    dateversement: string | undefined
    nom_donateur: string
    nom_receveur: string
    mode_paiement: string
    montant_caisse: number
}

interface CategorieInterface {
    id: number
    nom_categorie: string
}