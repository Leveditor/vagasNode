const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Vagas = require('./database/vagas');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const app = express();

// database
connection
    .authenticate()
    // fazendo verificação de conexão
    .then(() => {
        console.log('Conexão feita com o banco de dados!');
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Criando rota Home
app.get('/', (req, res) => {
    let search = req.query.job;
    let query = '%'+search+'%';
    

    if(!search) {
        Vagas.findAll({
            raw: true, order: [
                // Colocando em ordem decrecente
                ['id', 'DESC']
            ]
        }).then((vagas, search) => {
            // renderizando index.ejs
            res.render('index', {
                // recebendo as variaveis do banco de dados
                vagas: vagas,
                search: search,
                
            });
        })
        .catch(err => console.log(err))
    }else {
        Vagas.findAll({
            raw: true, 
            where: {titulo: {[Op.like]: query}},
            order: [
                // Colocando em ordem decrecente
                ['id', 'DESC']
            ]
        }).then((vagas, search) => {
            // renderizando index.ejs
            res.render('index', {
                // recebendo as variaveis do banco de dados
                vagas: vagas,
                search: search,
                
                
            });
        })
        .catch(err => console.log(err))
    }
    
});

// Criando rota para abrir novas vagas
app.get('/openjob', (req, res) => {
        res.render('openjob');
});

// recebe dados do formulario
app.post('/salvarvaga', (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var salario = req.body.salario;
    var empresa = req.body.empresa;
    var email = req.body.email;

    // preenchendo a tabela
    Vagas.create({
        titulo: titulo,
        descricao: descricao,
        salario: salario,
        empresa: empresa,
        email: email
    }).then(() => {
        // quando for salvo no banco de dados voltar para tela home
        res.redirect('/');
    })
});


app.get('/descricaovaga/:id', (req, res) => {
    
    // Pegando o id da URL
    var id = req.params.id;

    Vagas.findOne({
        where: { id: id }
    }).then(vaga => {
        if(vaga != undefined) { // Se a vaga for encontrada
            res.render('descricao', {
                vaga: vaga
            });
        }else {
            res.redirect('/');
        }
    })
});

app.post('/descricao', (req, res) => {
    var corpo = req.body.corpo;
    var vagaId = req.body.vaga;

    Descricao.create({
        corpo: corpo,
        vagaId: vagaId
    }).then(() => {
        res.require(`/descricao/${vagaId}`)
    })
})

app.listen(8080, () => {
    console.log('App funcionando')
})