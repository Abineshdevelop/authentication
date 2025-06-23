const userSchema = require('../model/usermodel');
const bcrypt = require("bcryptjs");

// load reg page
const loadRegister = (req, res) => {
    res.render('user/register');
};

// Reg user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await userSchema.findOne({ email });

        if (existingUser) {
            return res.render('user/register', { message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userSchema({ name, email, password: hashedPassword });

        await newUser.save();
        res.render('user/login', { message: 'User created successfully', type: 'success' });
    } catch (error) {
        console.log(error);
        res.render('user/register', { message: 'Something went wrong' });
    }
};

// load the login page
const loadLogin = (req, res) => {
    res.render('user/login');
};

// login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email });

        if (!user) {
            return res.render('user/login', { message: 'User does not exist' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.render('user/login', { message: 'Incorrect password' });
        }

        //session seting
        req.session.user = { name: user.name, email: user.email };

        res.redirect('/user/home');
    } catch (error) {
        console.log(error);
        res.render('user/login', { message: 'Something went wrong' });
    }
};

// home page show name after login
const fetchHome = (req, res) => {
    const userName = req.session.user?.name || 'User';
    res.render('user/home', { userName });
};

// logout
const signout = (req, res) => {
    try {
        delete req.session.user;
        res.redirect('/user/login');
    } catch (err) {
        console.log("Logout error", err);
    }
};

module.exports = { registerUser, login, loadRegister, loadLogin, fetchHome, signout };
