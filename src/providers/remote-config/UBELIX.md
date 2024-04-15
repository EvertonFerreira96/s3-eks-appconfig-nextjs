


- Como obter uma previsão de entrega, baseado em geolocalização?
  R: Utilizamos pontos cadastrados ao decorrer de uma viagem e utilizamos uma analise de obter o ponto mais próximo da referência e projetamos o calculo de entrega

- Como estimar a projeção de entrega?
  R: Utilizamos a geolocalização do ponto, e calculamos a distancia entre os pontos, e com base na velocidade média do veículo, calculamos o tempo de entrega (5KM/H)

- Como obter a geolocalização de um ponto?
  R: Utilizamos a API do Google Maps, que nos retorna a latitude e longitude do ponto

- Como evitar que um ponto fora da rota seja considerado na projeção de entrega?
  R: Analisamos a ordem de execucação através dos index, usando como base para considera-lo ou não

- Como calcular a projeção em tempo real, ao decorrer da viagem do motorista? 
  R: 
  A: Atualizar o ponto com a estimatiza considerando a soma dos horários de entrega e o decremento da soma dos horários de estimativa até o index do ponto mais próximo
    P: Problema somatório dos pontos
    V: Evita recalculos
  A: Calcular dinamicamente a estimatiza considerando a soma dos horários de entrega e o decremento da soma dos horários de estimativa até o index do ponto mais próximo
    P: Problema somatório dos pontos e É recalculado a cada requisção 
  A: Programação dinâmica, multi processamento, dividindo para conquistar
    P: Complexidade na implementação 
    V: Desempenho e Economia de processos
  A: Iremos obter o ponto de ultima entrega e subtrair do ponto mais próximo de forma dinamica. Exemplo
     PontoAtual(EstimatedCurrentToInitial) - UltimoPontoEntregue(EstimatedCurrentToInitial) 

* Considerar a diferença de tempo entre os pontos no cadastro da Rota do Caminhoneiro, futuramente considerar a projeção de 3 meses. 
  

- Como sanitizar os dados e considera-los como passados ou não e acordo com a viagem?
  R:

- Como determinar se um ponto é de coleta ou não?
  R: 

- Como iremos tratar atrasos no trajeto? 
  R:

- Como iremos afimar que o motorista passou ou não em um ponto?
  R:
