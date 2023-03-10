export interface TypesJogadores {
  nome: string,
  time: string
}

export interface PartidaComponent {
  timeA: TypesJogadores[];
  timeB: TypesJogadores[];
}
