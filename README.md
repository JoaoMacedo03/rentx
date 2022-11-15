# Cadastro de carro

**RF** => Requisitos funcionais
[X] Deve ser possível cadastrar um carro.

**RN** => Regra de negócio
[X] Não deve ser possível cadastrar um carro com uma placa já existente.
[X] O carro deve ser cadastrado com disponibilidade por padrão.
[X] Somente um usuário administrador pode cadastrar um carro.

# Listagem de carros

**RF** => Requisitos funcionais
[X] Deve ser possível listar todos os carros disponíveis.

**RN** => Regra de negócio
[X] O usuário não precisa estar logado no sistema para listar carros.
[X] Deve ser possível listar todos os carros disponíveis pela categoria.
[X] Deve ser possível listar todos os carros disponíveis pelo nome da marca.

# Cadastro de especificação no carro

**RF** => Requisitos funcionais
[X] Deve ser possível cadastrar uma especificação para um carro.

**RN** => Regra de negócio
[X] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
[] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
[X] Somente um usuário administrador pode cadastrar uma especificação.

# Cadastro de imagem do carro
**RF** => Requisitos funcionais
[X] Deve ser possível cadastrar a imagem do carro

**RNF** => Requisito não funcionais
[X] Utilizar o multer para upload dos arquivos.

**RN** => Regra de negócio
[X] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
[X] Somente um usuário administrador pode cadastrar imagens.

# Aluguel

**RF** => Requisitos funcionais
[X] Deve ser possível cadastrar um aluguel

**RN** => Regra de negócio
[X] Não deve ser possível cadastrar um novo aluguel, caso já exista um aberto para o mesmo usuário.
[X] Não deve ser possível cadastrar um novo aluguel, caso já exista um aberto para o mesmo carro.
[X] O usuáiro deve estar logado na aplicação.
[X] Ao realizar aluguel, carro deverá ser colocado como indisponível.
[X] Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional.
[X] Caso haja multa, deverá ser somado ao total do aluguel.

# Listagem de Alugueis para usuários

**RF** => Requisitos funcionais
[X] Deve ser possível realizar a busca de todos os alugueis para o usuário

**RN** => Regra de negócio
[X] O usuário deve estar logado na aplicação
