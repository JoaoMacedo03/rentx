# Cadastro de carro

**RF** => Requisitos funcionais
[] Deve ser possível cadastrar um carro.
[] Deve ser possível listar todas as categorias.

**RN** => Regra de negócio
[] Não deve ser possível cadastrar um carro com uma placa já existente.
[] Não deve ser possível alterar a placa de um carro já cadastro.
[] O carro deve ser cadastrado com disponibilidade por padrão.
[] Somente um usuário administrador pode cadastrar um carro.

# Listagem de carros

**RF** => Requisitos funcionais
[] Deve ser possível listar todos os carros disponíveis.

**RN** => Regra de negócio
[] O usuário não precisa estar logado no sistema para listar carros.
[] Deve ser possível listar todos os carros disponíveis pela categoria.
[] Deve ser possível listar todos os carros disponíveis pelo nome da marca.

# Cadastro de especificação no carro

**RF** => Requisitos funcionais
[] Deve ser possível cadastrar uma especificação para um carro.
[] Deve ser possível listar todas as especificações.
[] Deve ser possível listar todos os carros.


**RN** => Regra de negócio
[] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
[] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
[] Somente um usuário administrador pode cadastrar uma especificação.

# Cadastro de imagem do carro
**RF** => Requisitos funcionais
[] Deve ser possível cadastrar a imagem do carro
[] Deve ser possível listar todos os carros.

**RNF** => Requisito não funcionais
[] Utilizar o multer para upload dos arquivos.

**RN** => Regra de negócio
[] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
[] Somente um usuário administrador pode cadastrar imagens.

# Aluguel

**RF** => Requisitos funcionais
[] Deve ser possível cadastrar a imagem do carro

**RNF** => Requisito não funcionais
[] Utilizar o multer para upload dos arquivos.

**RN** => Regra de negócio
[] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.