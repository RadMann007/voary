import {
  Tag,
  Settings,
  Bookmark,
  LayoutGrid,
  Package,
  ShoppingCart,
  Building,
  ReceiptText,
  History,
  ArrowRightLeft,
  Grid2X2,
  User2Icon,
  Euro,
  
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};


type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Tableau de bord",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Services",
      menus: [
        {
          href: "/factures",
          label: "Factures",
          active: pathname.includes("/factures"),
          icon: ReceiptText,
          submenus: []
        },
        {
          href: "/categories",
          label: "Categories",
          active: pathname.includes("/categories"),
          icon: Bookmark,
          submenus: []
        },
        {
          href: "",
          label: "Familles",
          active: pathname.includes("/familles"),
          icon: Tag,
          submenus: [
            {
              href: '/familles',
              label: 'Ajout famille',
              active: pathname.includes("/familles/",0)
            },
            {
              href: '/familles/listes',
              label: 'Liste famille',
              active: pathname.includes("/familles/listes",0)
            }
          ]
        },
        {
          href: "",
          label: "Articles",
          active: pathname.includes("/articles"),
          icon: Package,
          submenus: [
            {
              href: '/articles',
              label: "Ajout article",
              active: pathname.includes("/article/",0)
            },
            {
              href: '/articles/listes',
              label: "Liste article",
              active: pathname.includes("/article/listes",0)
            },
          ]
        },
        {
          href: "/stocks/ajout",
          label: "Stocks",
          active: pathname.includes("/stocks/ajout"),
          icon: ArrowRightLeft,
          submenus: [
            {
              href: "/stocks",
              label: "Entrée",
              active: pathname.includes("/stocks"),
            },
            {
              href: "/stocks/remove",
              label: "Sortie",
              active: pathname.includes("/stocks/remove"),
            },
          ]
        },
        {
          href: "",
          label: "Versement",
          active: pathname.includes("/versement"),
          icon: Euro,
          submenus:[
            {
              href: "/versement",
              label: "Faire un versement",
              active: pathname.includes("/versement")
            },
            {
              href: "/versement/listes",
              label: "Liste versements",
              active: pathname.includes("/versement/listes")
            },
          ]
        },
        {
          href: "/tables",
          label: "Tables",
          active: pathname.includes("/tables"),
          icon: Grid2X2,
          submenus: []
        },
        {
          href: "/commandes",
          label: "Commandes",
          active: pathname.includes("/commandes"),
          icon: ShoppingCart,
          submenus: []
        },
      ]
    },
    {
      groupLabel: "Paramètres",
      menus: [
        {
          href: "/users/ajout",
          label: "Utilisateurs",
          active: pathname.includes("/users/ajout"),
          icon: User2Icon,
          submenus: [
            {
              href: "/users",
              label: "Ajout utilisateurs",
              active: pathname.includes("/users"),
            },
            {
              href: "/users/listes",
              label: "List utilisateurs",
              active: pathname.includes("/users/listes"),
            },
            {
              href: "/users/profil",
              label: "Profil utilisateur",
              active: pathname.includes("/users/profil"),
            }
          ]
        },
        {
          href: "/entreprise",
          label: "Entreprise",
          active: pathname.includes("/entreprise"),
          icon: Building,
          submenus: []
        },
        {
          href: "/recap",
          label: "Recap",
          active: pathname.includes("/recap"),
          icon: History,
          submenus: []
        }
      ]
    }
  ];
}
