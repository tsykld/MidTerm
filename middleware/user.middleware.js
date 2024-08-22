

const UserMiddleware = {
    createNewUser: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) throw new Error('Cannot create new user.')

            return next()

        } catch (error) {
            res.status(403).send({
                message: error.message
            })
        }
    }
}

export default UserMiddleware