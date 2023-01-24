const GameController = require('../controllers/game.controller')

module.exports = (app) => {
    app.post('/games', GameController.createOne)
    app.get('/games', GameController.getAll)
    app.get('/games/:id', GameController.getOne)
    app.put('/games/update/:id', GameController.updateOne)
    app.delete('/games/delete/:id', GameController.deleteOne)
}