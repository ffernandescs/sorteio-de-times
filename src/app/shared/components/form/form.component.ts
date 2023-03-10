import { Component } from '@angular/core';
import { TypesJogadores } from '../../../interfaces/TypesJogador/typesjogador';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  jogadores: TypesJogadores[] = [
    {nome: 'João', time: ''},
    {nome: 'Maria', time: ''},
    {nome: 'Pedro', time: ''},
    {nome: 'Ana', time: ''},
    {nome: 'Carlos', time: ''},
    {nome: 'Fernanda', time: ''},
    {nome: 'Lucas', time: ''},
    {nome: 'Julia', time: ''},
    {nome: 'Marcos', time: ''},
    {nome: 'Mariana', time: ''},
    {nome: 'Rafael', time: ''},
    {nome: 'Paula', time: ''},
    {nome: 'Renato', time: ''},
    {nome: 'Letícia', time: ''},
    {nome: 'Thiago', time: ''},
    {nome: 'Amanda', time: ''},
    {nome: 'Gustavo', time: ''},
    {nome: 'Marina', time: ''},
    {nome: 'Rodrigo', time: ''},
    {nome: 'Isabela', time: ''}
  ];


  time1: TypesJogadores[] = [];
  time2: TypesJogadores[] = [];
  novoTime: TypesJogadores[] = [];
  disponiveis: TypesJogadores[] = [];

  resultTime1: number = 5
  resultTime2: number = 5


  alert: boolean = false

  constructor() { }

  ngOnInit(): void {
    this.verficarListaJogador()
  }

  verficarListaJogador() {
    if( this.jogadores.length < 10 ) {
       this.alert = true
       console.log(this.alert, 'Jogador insuficiente')

    } else {
      this.alert = true
      console.log(this.alert,'Jogador Suficiente')
    }
  }

  iniciarPartida() {
    const jogadores = this.jogadores.slice(); // Faz uma cópia da lista de jogadores
    const time1 = [];
    const time2 = [];

    if(this.alert = true) {
      for (let i = 0; i < 5; i++) {
        const jogador1 = jogadores.splice(Math.floor(Math.random() * jogadores.length), 1)[0];
        jogador1.time = 'time1';
        time1.push(jogador1);

        const jogador2 = jogadores.splice(Math.floor(Math.random() * jogadores.length), 1)[0];
        jogador2.time = 'time2';
        time2.push(jogador2);
      }

      this.time1 = time1;
      this.time2 = time2;

      this.disponiveis = jogadores;

      localStorage.setItem('jogadores', JSON.stringify(this.jogadores));
      localStorage.setItem('disponiveis', JSON.stringify(this.disponiveis));
      localStorage.setItem('time1', JSON.stringify(this.time1));
      localStorage.setItem('time2', JSON.stringify(this.time2));

      console.log('pode iniciar a partida')
    } else {
      console.log('Jogador insuficiente')

    }
  }

  encerrarPartida() {
    if(this.time1 > this.time2) {
      console.log('Time1 Venceu')
    } else if(this.time2 > this.time1) {
      console.log('Time2 Venceu')
    } else {
      console.log('ambos empataram')
    }
  }

  continuarPartida() {
    const storedList = localStorage.getItem('disponiveis');
    if (storedList !== null) {
      this.disponiveis = JSON.parse(storedList);
      console.log(this.disponiveis = JSON.parse(storedList));
    }

  }








}



