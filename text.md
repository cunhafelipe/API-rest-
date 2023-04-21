Create (feito) - entregue
Read (feito) - entregue
Update (a fazer) - entregue
Delete (a fazer) - entregue

Validacoes nas controllers

Validar a estrutura de dados que existe no UserModel e criar as validacoes nas rotas coerentes com o Usermodel

- Criar e Deletar
  Se for adm ele deixa cadastrar novo usuario se não ele retorna um status code 401 ( não autorizado ) com json falando que n tem acesso suficiente

-Atualizar
Pode atualizar tudo, menos admin e email ( retornar um erro 400 ) Falando que são dados q nao podem ser atualizados, somente com chamado!

19/04

- Criar um model de cliente (nome, email, senha, cpf)
- Atualizacao do model de User, onde ira existir a propriedade de role (existir um enum das seguintes opcoes: user, admin, mestre)
