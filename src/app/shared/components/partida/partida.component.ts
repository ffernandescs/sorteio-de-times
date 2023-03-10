import { Component, ChangeDetectorRef  } from '@angular/core';
import { TypesJogadores } from '../../../interfaces/TypesJogador/typesjogador';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent {
  $: any
  tempoDecorrido = 0;
  acrescimo: string = ''
  contador: any;
  pausado: boolean = true;
  participantes: TypesJogadores[] = [
    { nome: 'Jogador 1', time: '' },
    { nome: 'Jogador 2', time: '' },
    { nome: 'Jogador 3', time: '' },
    { nome: 'Jogador 4', time: '' },
    { nome: 'Jogador 5', time: '' },
    { nome: 'Jogador 6', time: '' },
    { nome: 'Jogador 7', time: '' },
    { nome: 'Jogador 8', time: '' },
    { nome: 'Jogador 9', time: '' },
    { nome: 'Jogador 10', time: '' },
    { nome: 'Jogador 11', time: '' },
    { nome: 'Jogador 12', time: '' },
    { nome: 'Jogador 13', time: '' },
    { nome: 'Jogador 14', time: '' },
    { nome: 'Jogador 15', time: '' },
    { nome: 'Jogador 16', time: '' },
    { nome: 'Jogador 17', time: '' },
    { nome: 'Jogador 18', time: '' },
    { nome: 'Jogador 19', time: '' },
    { nome: 'Jogador 20', time: '' },
    { nome: 'Jogador 20', time: '' },
    { nome: 'Jogador 22', time: '' },
    { nome: 'Jogador 23', time: '' },
    { nome: 'Jogador 24', time: '' },
    { nome: 'Jogador 25', time: '' },
    { nome: 'Jogador 26', time: '' },
    { nome: 'Jogador 27', time: '' },
    { nome: 'Jogador 28', time: '' },
    { nome: 'Jogador 29', time: '' },
    { nome: 'Jogador 30', time: '' },
  ];


  jogadoresTimeA: TypesJogadores[] = [];
  jogadoresTimeB: TypesJogadores[] = [];

  quantJogadores: string = ''
  timePartida: number  = 0

  campoObrigatorio: string = ''

  btnSortear: boolean = false
  btnPlayPaused: boolean = true

  quantPartidas: number = 0

  placarTimeA: number = 0
  placarTimeB: number = 0

  valorInicialBarraProgresso = 100;
  progresso = 0


  ngOnInit(): void {
    this.carregarDados()
    this.disableCloseModal()

    }

  disableCloseModal() {
    $('#newPlacar').modal({
      backdrop: 'static',
      keyboard: false
    });
    $('#newPartida').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  sortearTimes() {
    const quatPorTim = parseInt(this.quantJogadores)
    const quantMinima = quatPorTim * 2
    if(this.participantes.length < quantMinima) {
      alert('Alerta minimo')
    }

    const participantes = [...this.participantes]

    // Embaralha a lista de jogadores para fazer o sorteio
    for (let i = this.participantes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [participantes[i], participantes[j]] = [participantes[j], participantes[i]];
    }

    this.jogadoresTimeA = participantes.slice(0, quatPorTim);
    this.jogadoresTimeB = participantes.slice(quatPorTim, quantMinima);

    this.jogadoresTimeA.forEach(jogador => jogador.time = 'Time 1');
    this.jogadoresTimeB.forEach(jogador => jogador.time = 'Time 2');

    const jogadoresDisponiveis = participantes.slice(quantMinima);
    localStorage.setItem('jogadoresDisponiveis', JSON.stringify(jogadoresDisponiveis));

    const participantesAtualizados = [...this.jogadoresTimeA, ...this.jogadoresTimeB];
    localStorage.setItem('participantes', JSON.stringify(participantesAtualizados));
    localStorage.setItem('times', JSON.stringify({
      timeA: this.jogadoresTimeA,
      timeB: this.jogadoresTimeB,
    }));
    window.location.reload();

  }

  sortearNovamente() {

    const placarTimeA = JSON.parse(localStorage.getItem('placarTimeA') || '[]');
    const placarTimeB = JSON.parse(localStorage.getItem('placarTimeB') || '[]');

    if (placarTimeA > placarTimeB) {
      const quatPorTim = parseInt(this.quantJogadores)
      const jogadoresDisponiveis = JSON.parse(localStorage.getItem('jogadoresDisponiveis') || '[]');

      for (let i = jogadoresDisponiveis.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [jogadoresDisponiveis[i], jogadoresDisponiveis[j]] = [jogadoresDisponiveis[j], jogadoresDisponiveis[i]];
      }

      const times = JSON.parse(localStorage.getItem('times') || '[]');

      const timePerdedor = placarTimeA < placarTimeB ? 'timeA' : 'timeB';


      const novosJogadores = jogadoresDisponiveis.splice(0, quatPorTim);
      times[timePerdedor] = novosJogadores;

      localStorage.setItem('times', JSON.stringify(times));


      const timesFromLocalStorage = JSON.parse(localStorage.getItem('times') || '[]');
      const jogadoresTimeA = timesFromLocalStorage.timeA.map((jogador: TypesJogadores) => jogador.nome);
      const jogadoresTimeB = timesFromLocalStorage.timeB.map((jogador: TypesJogadores) => jogador.nome);
      const atualizarDiponiveis: TypesJogadores[] = [];

      this.participantes.forEach((jogador: TypesJogadores) => {
        if (!jogadoresTimeA.includes(jogador.nome) && !jogadoresTimeB.includes(jogador.nome)) {
          atualizarDiponiveis.push(jogador);

        }
      });

      localStorage.setItem('jogadoresDisponiveis', JSON.stringify(atualizarDiponiveis));

    } else if (placarTimeB > placarTimeA) {
      const quatPorTim = parseInt(this.quantJogadores)
      const jogadoresDisponiveis = JSON.parse(localStorage.getItem('jogadoresDisponiveis') || '[]');

      for (let i = jogadoresDisponiveis.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [jogadoresDisponiveis[i], jogadoresDisponiveis[j]] = [jogadoresDisponiveis[j], jogadoresDisponiveis[i]];
      }

      const times = JSON.parse(localStorage.getItem('times') || '[]');

      const timePerdedor = placarTimeB < placarTimeA ? 'timeB' : 'timeA';


      const novosJogadores = jogadoresDisponiveis.splice(0, quatPorTim);
      times[timePerdedor] = novosJogadores;

     localStorage.setItem('times', JSON.stringify(times));


      const timesFromLocalStorage = JSON.parse(localStorage.getItem('times') || '[]');
      const jogadoresTimeA = timesFromLocalStorage.timeA.map((jogador: TypesJogadores) => jogador.nome);
      const jogadoresTimeB = timesFromLocalStorage.timeB.map((jogador: TypesJogadores) => jogador.nome);
      const atualizarDiponiveis: TypesJogadores[] = [];

      this.participantes.forEach((jogador: TypesJogadores) => {
        if (!jogadoresTimeA.includes(jogador.nome) && !jogadoresTimeB.includes(jogador.nome)) {
          atualizarDiponiveis.push(jogador);

        }
      });

      localStorage.setItem('jogadoresDisponiveis', JSON.stringify(atualizarDiponiveis));
    } else {
      const jogadoresDisponiveis = JSON.parse(localStorage.getItem('jogadoresDisponiveis') || '[]');
      const quatPorTim = parseInt(this.quantJogadores)
      const quantMinima = quatPorTim * 2

      const participantesDisponiveis = [...jogadoresDisponiveis]
      for (let i = participantesDisponiveis.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [participantesDisponiveis[i], participantesDisponiveis[j]] = [participantesDisponiveis[j], participantesDisponiveis[i]];
      }

      this.jogadoresTimeA = participantesDisponiveis.slice(0, quatPorTim);
      this.jogadoresTimeB = participantesDisponiveis.slice(quatPorTim, quantMinima);

      localStorage.setItem('times', JSON.stringify({
        timeA: this.jogadoresTimeA,
        timeB: this.jogadoresTimeB,
      }));

      const timesFromLocalStorage = JSON.parse(localStorage.getItem('times') || '[]');
      const jogadoresTimeA = timesFromLocalStorage.timeA.map((jogador: TypesJogadores) => jogador.nome);
      const jogadoresTimeB = timesFromLocalStorage.timeB.map((jogador: TypesJogadores) => jogador.nome);
      const atualizarDiponiveis: TypesJogadores[] = [];

      this.participantes.forEach((jogador: TypesJogadores) => {
        if (!jogadoresTimeA.includes(jogador.nome) && !jogadoresTimeB.includes(jogador.nome)) {
          atualizarDiponiveis.push(jogador);

        }
      });

      localStorage.setItem('jogadoresDisponiveis', JSON.stringify(atualizarDiponiveis));


      console.log('Time - 1', this.jogadoresTimeA)
      console.log('Time - 2', this.jogadoresTimeB)

      console.log('Jogadores Filtrados',atualizarDiponiveis);
      this.btnSortear = true
    }
    window.location.reload()

}

  resultPlacar() {
    if(this.placarTimeA > this.placarTimeB) {
      const timePerdedor =this.placarTimeA > this.placarTimeB ? 'timeA' : 'timeA';

      alert(`Time ${timePerdedor}`)

    } else if (this.placarTimeB > this.placarTimeA) {
      const timePerdedor =this.placarTimeB > this.placarTimeA ? 'timeB' : 'timeA';

      alert(`Time ${timePerdedor}`)
     } else {
      alert(`Times empataram:${''}${this.placarTimeA}${''}x${''}${this.placarTimeB}`)
     }
    localStorage.setItem('placarTimeA', this.placarTimeA.toString() )
    localStorage.setItem('placarTimeB', this.placarTimeB.toString())
    $("#newPlacar").modal('hide');
    $("#newPartida").modal('show');


  }

  carregarDados() {
    const configuracoesSalvas = localStorage.getItem('configuracoes');
    if (configuracoesSalvas) {
      this.btnSortear = false
      const configuracoes = JSON.parse(configuracoesSalvas);
      this.quantJogadores = configuracoes.quantidadeJogadores;
      this.timePartida = configuracoes.tempoPartida;
    } else {
      this.btnSortear = true

    }

    this.tempoDecorrido = this.timePartida

    const timesSalvos = localStorage.getItem('times');

    if (timesSalvos) {
      this.btnPlayPaused = false
      const times = JSON.parse(timesSalvos);
      this.jogadoresTimeA = times.timeA;
      this.jogadoresTimeB = times.timeB;

    }
    if (!timesSalvos) {
      return;
    }
    this.btnSortear = true


  }

  addAcrescimo() {
    if(this.acrescimo != '') {
      this.tempoDecorrido += parseInt(this.acrescimo)
      console.log(this.tempoDecorrido)
      $("#myModal").modal('hide');
    } else {
      this.campoObrigatorio = "*Campo Obrigatorio"
    }

  }

  iniciarCronometro() {
    if (this.pausado) {
      this.pausado = false;
      this.contador = setInterval(() => {
        if (this.tempoDecorrido === 0) {
          // Para a contagem
          clearInterval(this.contador);
          this.pausado = true;
          $("#newPlacar").modal('show');
          return;
        }
        this.tempoDecorrido--;
        const barraDeProgresso = document.querySelector('.progress-bar');
        if (barraDeProgresso) {
          const progresso = this.tempoDecorrido / this.timePartida * this.valorInicialBarraProgresso;
          barraDeProgresso.setAttribute('style', `width: ${progresso}%`);
          console.log(progresso)

        }
        if (this.tempoDecorrido < 60 && this.tempoDecorrido >= 10) {


          $('#myModal').modal('show');
        } else if (this.tempoDecorrido < 10) {
          // Fecha o modal
          $('#myModal').modal('hide');

        }
      }, 1000);
    }
  }



  formatarTempo(segundos: number) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;
    const segundosFormatados = segundosRestantes < 10 ? `0${segundosRestantes}` : segundosRestantes;
    return `${minutosFormatados}:${segundosFormatados}`;
  }














}
