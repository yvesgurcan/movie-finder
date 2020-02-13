module.exports = app => {
    app.get(`/`, (req, res) => {
        console.log(`GET /`);
        res.send(`Hi!\n`);
    });
};
