module.exports = {
    current: async (req, res) => {
        if (!req.session) {
            return res.sendStatus(404)
        }
        const user = req.session.passport.user
        res.send(user).status(200)
    }
}