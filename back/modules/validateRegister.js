const userSchema = require("../schema/userSchema")

module.exports = async (req, res, next) => {
    const {username, password, repeatPassword} = req.body

    const validateUsername = username.length >= 4 && username.length <= 20;
    const validatePassword =
        password.length >= 4 &&
        password.length <= 20 &&
        /[A-Z]/.test(password) &&
        /[!@#$%^&*_+]/.test(password);

    if (!validateUsername) return res.send({message: "Your username must be between 4 and 20 characters long." })

    if (!validatePassword) return res.send({message: "Your password must be between 4 and 20 characters long, include at least one uppercase letter, and include at least one special symbol (!@#$%^&*_+)."})

    if (password !== repeatPassword) return res.send({message: "Your password do not match" })

    const validateUser = await userSchema.find({username: username})

    if (validateUser.length > 0) return res.send({message: "Username is already in use, try another one"})
    next()

}