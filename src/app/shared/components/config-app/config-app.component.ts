import { Component } from '@angular/core';


@Component({
  selector: 'app-config-app',
  templateUrl: './config-app.component.html',
  styleUrls: ['./config-app.component.css']
})
export class ConfigAppComponent {

  quantJogadores: string = ''
  timePartida: string = ''

  selectPartida: boolean = true
  selectTime: boolean = false
  btnSalvar: boolean = false


  ngOnInit(){
    this.configSalva()
  }

  configSalva() {
    const configuracoesSalvas = localStorage.getItem('configuracoes');
    if (configuracoesSalvas) {
      const configuracoes = JSON.parse(configuracoesSalvas);

      this.quantJogadores = configuracoes.quantidadeJogadores;
      this.timePartida = configuracoes.tempoPartida;
      const dataExpiracao = configuracoes.dataExpiracao;
      if (new Date().getTime() < dataExpiracao) {
        this.btnSalvar = false;
        this.selectPartida = false;
        this.selectTime = false;
      } else {
        localStorage.removeItem('configuracoes');
      }
    }
  }



  onSelectPartidaChange() {
    if(this.quantJogadores != '') {
      this.selectTime = true
    }
  }

  onSelectTimeChange() {
    if(this.timePartida != '') {
      this.selectPartida = false
      this.btnSalvar = true;
      console.log('tempo correto')
    }
  }

  configPartida() {
    this.selectTime = false
    this.btnSalvar = false;
    localStorage.setItem('configuracoes', JSON.stringify({
      quantidadeJogadores: this.quantJogadores,
      tempoPartida: this.timePartida,
      dataExpiracao: new Date().getTime() + 12 * 60 * 60 * 1000 // 12 horas em milissegundos
    }));
    window.location.reload();

  }

  zerarPartida() {
    localStorage.clear();
    this.quantJogadores = ''
    this.timePartida = ''
    this.selectPartida = true
    window.location.reload();
  }





}


