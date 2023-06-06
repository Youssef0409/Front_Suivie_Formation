import { Role } from "./role";

export interface Utilisateur {
    id_user: number;
    nom: string;
    prenom: string;
    age: number;
    date_naissance: Date;
    email: string;
    telephone: number;
    pays: string;
    pseudo: string;
    password: string;
    role: Role;
    
  }