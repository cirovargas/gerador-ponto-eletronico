new Vue({
    el: '#app',
    data() {
      return {
        entrada1: '',
        entrada2: '',
        saidaAlmoco1: '',
        saidaAlmoco2: '',
        retornoAlmoco1: '',
        retornoAlmoco2: '',
        dias: 0,
        cargaHoraria: 0,
        tabela: []
      };
    },
    methods: {
      submitForm() {
        // Limpa a tabela antes de gerar novos dados
        this.tabela = [];

        // Cria os pontos de acordo com a quantidade de dias
        for (let i = 0; i < this.dias; i++) {
          const cargaHoraria = this.cargaHoraria * 60;
          const entrada = this.obterHorarioAleatorio(this.entrada1, this.entrada2);
          const saidaAlmoco = this.obterHorarioAleatorio(this.saidaAlmoco1, this.saidaAlmoco2);
          const retornoAlmoco = this.obterHorarioAleatorio(this.retornoAlmoco1, this.retornoAlmoco2);
          const saida = this.adicionarMinutos(retornoAlmoco, cargaHoraria - this.calcularDiferencaHorarios(entrada, saidaAlmoco));

          this.tabela.push({
            entrada,
            saidaAlmoco,
            retornoAlmoco,
            saida
          });
        }
      },
      obterHorarioAleatorio(hora1, hora2) {
        // Converter os horários para minutos
        const totalMinutos1 = parseInt(hora1.split(':')[0]) * 60 + parseInt(hora1.split(':')[1]);
        const totalMinutos2 = parseInt(hora2.split(':')[0]) * 60 + parseInt(hora2.split(':')[1]);

        // Calcular um horário aleatório em minutos entre os dois horários
        const horarioAleatorioEmMinutos = Math.floor(Math.random() * (totalMinutos2 - totalMinutos1 + 1)) + totalMinutos1;

        // Converter o horário aleatório de minutos para hora e minuto
        const horaAleatoria = Math.floor(horarioAleatorioEmMinutos / 60);
        const minutoAleatorio = horarioAleatorioEmMinutos % 60;

        // Formatar o horário aleatório com zeros à esquerda, se necessário
        const horaFormatada = horaAleatoria.toString().padStart(2, '0');
        const minutoFormatado = minutoAleatorio.toString().padStart(2, '0');

        return `${horaFormatada}:${minutoFormatado}`;
      },
      calcularDiferencaHorarios(hora1, hora2) {
        // Converter os horários para minutos
        const totalMinutos1 = parseInt(hora1.split(':')[0]) * 60 + parseInt(hora1.split(':')[1]);
        const totalMinutos2 = parseInt(hora2.split(':')[0]) * 60 + parseInt(hora2.split(':')[1]);

        // Calcular a diferença em minutos
        const diferencaMinutos = Math.abs(totalMinutos2 - totalMinutos1);

        return diferencaMinutos;
      },
      adicionarMinutos(hora, minutosAdicionais) {
        // Converter a hora para minutos
        const totalMinutos = parseInt(hora.split(':')[0]) * 60 + parseInt(hora.split(':')[1]);

        // Adicionar os minutos informados
        const novoTotalMinutos = totalMinutos + minutosAdicionais;

        // Calcular a nova hora e minuto
        const novaHora = Math.floor(novoTotalMinutos / 60);
        const novoMinuto = novoTotalMinutos % 60;

        // Formatar a nova hora com zeros à esquerda, se necessário
        const horaFormatada = novaHora.toString().padStart(2, '0');
        const minutoFormatado = novoMinuto.toString().padStart(2, '0');

        return `${horaFormatada}:${minutoFormatado}`;
      }
    }
  });