const routes = (app) => {

    app.route('/')
    .get((req, res) => {
        res.send('This is the Get method');
    })
    
    .post((req, res) => {
        res.send('This is the Post method');
    })
    
    .put((req, res) => {
        res.send('This is the PUT method');
    })
    
    .delete((req, res) => {
        res.send('This is the Delete method');
    })
}

module.exports = routes;