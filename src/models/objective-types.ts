export type TObjective = 'Cutting' | 'Maintenance' | 'Bulking'

/*
Sintaxe para um tipo de mapeamento indexado. 
Isso significa que as chaves deste tipo são os mesmos valores que o tipo IObjective. 
K é uma variável de tipo que representa cada valor em IObjective. 
*/
export type TObjectiveOptions = {
  [K in TObjective]: string[]
}

export const objectiveOptions: TObjectiveOptions = {
  Cutting: [
    '220 a 250 gramas por semana (recomendado)',
    'Em torno de 500g por semana',
    'Até 1 quilograma por semana (risco de perda de massa magra junto)',
  ],
  Maintenance: ['Comer tanto quanto gasta'],
  Bulking: ['Superávit Limpo (5%)', 'Superávit Tradicional (10%)', 'Superávit Sujo (15%)'],
}
