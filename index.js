const customExpress = require('./config/customExpress')
const conexao = require('./infra/conexao')
const Tabelas = require('./infra/tabelas')

conexao.connect((erro) => {
    if (erro) {
        console.log("================================================")
        console.log('Erro ao conectar no banco de dados!')
        console.log(erro)
        console.log("================================================")
    } else {
        console.log("================================================")
        console.log('Conectado ao banco de dados com sucesso!')
        console.log("================================================")

        Tabelas.init(conexao)
        const app = customExpress()
        const port = 8000;

        app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))
    }
})



