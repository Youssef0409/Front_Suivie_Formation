import { Role } from "./role";

export interface ResponsableRequest {
    firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: Role;
 
  grade: string;
  specialite:string;
  
}
