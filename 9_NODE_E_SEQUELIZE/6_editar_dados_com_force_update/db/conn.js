const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('nodemysql2', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

// try {
    
//     sequelize.authenticate()
//     console.log('Conectado com o sequelize');

// } catch (error) {
//     console.log('Não foi possivel conectar: ', error);
// }

module.exports = sequelize