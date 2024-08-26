
# High Crops

Este projeto consiste em um sistema de irrigação automatizado para residências, desenvolvido utilizando a plataforma Arduino para o controle dos dispositivos de irrigação e um aplicativo móvel Android para monitoramento e controle remoto.

## Características Principais

- **Automatização Inteligente:** O sistema monitora automaticamente as condições do solo e ativa a irrigação conforme necessário, garantindo eficiência no uso da água.
- **Monitoramento em Tempo Real:** Através do aplicativo Android, é possível monitorar em tempo real os dados do sistema, como umidade do solo, temperatura e status da irrigação.
- **Controle Remoto:** O usuário pode ativar ou desativar manualmente a irrigação a qualquer momento, diretamente pelo aplicativo móvel.
- **Interface Amigável:** O aplicativo foi desenvolvido com uma interface intuitiva e de fácil navegação, permitindo que qualquer usuário possa utilizá-lo sem dificuldades.
- **Personalização:** O sistema permite ajustes nas configurações de irrigação, como horários, de acordo com as necessidades específicas de cada jardim ou plantação.

## Componentes do Projeto

- **Hardware:**
  - Placa Wemos R32
  - Sensores de umidade do solo
  - Relés para controle das válvulas de irrigação
  - Módulo Wi-Fi para comunicação com o aplicativo Android (Incluso na Wemos R32)

- **Software:**
  - Código Arduino para controle dos sensores e atuadores
  - Aplicativo Android desenvolvido em REACT NATIVE com o framework EXPO, Firebase para armazenamento e comunicação em Real-Time e Clerk para autenticação
  - Interface de comunicação entre Arduino e o aplicativo via Wi-Fi

## Instalação e Configuração

1. **Configuração do Hardware:**
   - Conecte os sensores de umidade e os relés à placa Arduino conforme o esquema de ligação disponível em [link para o esquema]().
   - Carregue o código Arduino na placa utilizando a IDE Arduino.

2. **Configuração do Aplicativo Android:**
   - Baixe e instale o aplicativo diretamente do [link para o APK ou Google Play Store]().
   - Configure a conexão Bluetooth/Wi-Fi com o Arduino seguindo as instruções dentro do aplicativo.

## Uso do Sistema

- Após a instalação, o sistema começará a monitorar automaticamente o solo. A partir do aplicativo, é possível visualizar os dados em tempo real, além de controlar manualmente o sistema de irrigação.

## Licença

Este projeto está licenciado sob a [Licença MIT](link para a licença). Sinta-se à vontade para contribuir ou modificar conforme necessário.

## Contribuições

Contribuições são bem-vindas! Para relatar problemas ou sugerir melhorias, abra uma issue ou envie um pull request.
