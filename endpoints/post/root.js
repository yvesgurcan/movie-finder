module.exports = app => {
    app.post(`/`, (req, res) => {
        console.log(`POST /`);
        res.status(500);
        res.send(`Hi there!!\n`);
    });
};
