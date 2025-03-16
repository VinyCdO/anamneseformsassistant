import { IAnamneseForm } from "../interfaces/IAnamneseForm";

declare module './anamneseApi' {
  export function postAnamneseForm(data: any): Promise<any>;
  export function getAnamneseForms(): Promise<IAnamneseForm[]>;
  export function getAnamneseFormById(id: string): Promise<IAnamneseForm[]>; 
  export function getAnamneseFormByName(name: string): Promise<IAnamneseForm[]>;   
}