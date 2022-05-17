

module.exports = {
    current: async (req, res) => {
        if (!req.session) {
            return res.sendStatus(404)
        }
        const userId = req.session.passport.user
        res.send(userId).status(200)
    }
}