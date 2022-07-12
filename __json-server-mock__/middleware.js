module.exports = (req, res, next) => {
    if (req.method === "POST" && req.path === "/login") {
        if (req.body.username === 'admin' && req.body.password === '123') {
            return res.status(200).json({
                user: {
                    token: "123456"
                },
                code: 0
            })
        } else {
            return res.status(200).json({errorMessage: "用户名或密码错误", code: -1})
        }
    }
    next()
}