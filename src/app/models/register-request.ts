import { Role } from "./role";

export interface RegisterRequest {
    firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: Role;
  naissance: Date;
  niveau: string;
  diplome: string;
  
}
