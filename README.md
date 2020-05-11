# API Rest Agenda-PetShop
API Rest criada para o curso da [Alura](https://www.alura.com.br/). A ideia principal dessa API seria criar agendamentos simples para um PetShop, para entender os conceitos dos métodos HTTP e a criação de uma API seguindo o padrão REST com os conceitos de NodeJS
Pensando nisso, foi utilizado:

 - NodeJS
 - Express
 - MySQL
 - Body Parser
 - Consign
 - Moment
 - Nodemon (para auxiliar o desenvolvimento)
 - NPM

#### Instalação do Projeto
Ao fazer download ou clone do projeto, serão necessárias algumas configurações.
Primeiramente basta fazer o download das dependências utilizadas rodando o seguinte código no diretório raiz (o mesmo do *package.json*):

    npm install

A segunda coisa é se atentar para o banco de dados, na qual foi utilizado o MySQL, sendo assim você deve ter uma instância rodando localmente na sua máquina. Após certificar de que existe uma instância rodando localmente, altere o arquivo `infra/conexao.js` com suas configurações:

    const conexao = mysql.createConnection({
		host: 'localhost',
		port: '3306',
		user: 'admin',
		password: 'suasenha',
		database: 'agenda-petshop'
	})

#### Rodando o servidor
Os passos acimas estando prontos, para rodar o servidor com a API é só rodar no terminal o seguinte comando (raiz):

	npm start

### Métodos e Respostas

**POST** /atendimentos
		
		{
			"cliente": "Daniel",
			"pet": "Paçoca",
			"servico": "tosa",
			"status": "agendado",
			"observacoes": "Precisa de fucinheira!",
			"data": "25/05/2020"
		}

**GET** /atendimentos
		
		[
		  {
		    "id": 1,
		    "cliente": "Stella",
		    "pet": "Mel",
		    "servico": "banho",
		    "data": "2020-06-16T03:06:00.000Z",
		    "dataCriacao": "2020-05-11T11:05:13.000Z",
		    "status": "agendado",
		    "observacoes": "mansinha"
		  },
		  {
		    "id": 3,
		    "cliente": "Gabriel Silva Soares",
		    "pet": "Luke",
		    "servico": "all_inclsuive",
		    "data": "2020-06-18T03:06:00.000Z",
		    "dataCriacao": "2020-05-11T13:05:08.000Z",
		    "status": "agendado",
		    "observacoes": "Cuidado com a boca dele, pode fechar na sua mão rs"
		  }
	  ]

**PATCH** /atendimentos/:id
*Mandar somente as alterações que for mudar.*

	{
		"observacoes": "É alérgica ao shampoo de ervas"
	}

**DELETE** /atendimentos/:id

byGabriel! 
♥
