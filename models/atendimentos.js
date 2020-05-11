const moment = require('moment')
const conexao = require('../infra/conexao')

class Atendimento {

    adiciona(atendimento, resp) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = this.formataData(atendimento.data)
        console.log(dataCriacao)
        console.log(data)
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const nomeEhValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'Cliente',
                valido: nomeEhValido,
                msg: 'Cliente deve ter pelo menos 5 caractéres.'
            }, 
            {
                nome: 'Data',
                valido: dataEhValida,
                msg: 'Data deve ser maior ou igual a data atual.'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const temErros = erros.length

        if (temErros) {
            resp.status(400).json(erros)
        } else {
            const atendimentoDatado = { ...atendimento, data, dataCriacao }

            const sql = 'INSERT INTO Atendimentos SET ?'

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if (erro) {
                    resp.status(400).json(erro)
                } else {
                    resp.status(201).json(atendimentoDatado)
                }
            })
        } // else
    } // adiciona()

    lista(resp) {
        const sql = 'SELECT * from Atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                resp.status(400).json(erro)
            } else {
                resp.status(200).json(resultados)
            }
        })
    } // lista

    buscaPorId(id, resp) {
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`

        conexao.query(sql, (erro, resultado) => {
            if (erro) {
                resp.status(400).json(erro)
            } else {
                resp.status(200).json(resultado[0])
            }
        })
    } // buscaPorId

    altera(id, valores, resp) {
        if (valores.data) {
            valores.data = this.formataData(valores.data)
        }

        const sql = `UPDATE Atendimentos SET ? WHERE id = ${id}`

        conexao.query(sql, valores, (erro, resultado) => {
            if (erro) {
                resp.status(400).json(erro)
            } else {
                resp.status(200).json({...valores, id})
            }
        });
    } // altera

    delete(id, resp) {
        const sql = `DELETE FROM Atendimentos WHERE id = ${id}`

        conexao.query(sql, (erro, resultado) => {
            if (erro) {
                resp.status(400).json(erro)
            } else {
                // resp.status(200).json(resultado)
                resp.status(200).json({id})
            }
        })
    }

    formataData(data) {
        return moment(data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
    }

}



module.exports = new Atendimento;