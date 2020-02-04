const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

async function signup(req, res) {
    const user = new User(req.body);
    try {
        await user.save();
        const token = createJWT(user);
        res.status(200).json({token});
    } catch(error) {
        res.status(400).json({error});
        throw new Error('User Exists');
    }
}


async function login(req, res) {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(401).json({err: 'bad credentials---'});
        
        user.comparePasswords(req.body.password, (err, isMatch) => {
        if (isMatch) {
            const token = createJWT(user);
            res.json({token});
        } else {
            return res.status(401).json({err: 'bad credentials****'});
        }
    });
    } catch (err) {
        return res.status(401).json(err);
    }
}

// we want to return a token instead of a user doc so we create token.

// helper function for cleaner code

function createJWT(user) {
    return jwt.sign(
        {user},
        SECRET,
        {expiresIn: '24h'}
    );
}



module.exports = {
    signup,
    login,
};