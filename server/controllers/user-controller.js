const dotenv = require('dotenv');
dotenv.config();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const users = require('../models/user.js')

class UserClass {
    async Register(req, res){

        const salt = process.env.SALT

		let { 
			username: name,
            password: pass,
            email: mail
		} = req.body.loginPayload;
		try{
            
            const user = await users.findOne({username: name});
            if (user) return res.json(
            { 
                ok: false, message: "User already exists!"
            });

            if (!validator.isEmail(mail)) return res.json({ ok: false, message: "Invalid email provided!" });

            const hash = await argon2.hash(pass, salt);

            await users.create(
                {
                    username: name,
                    password: hash,
                    email: mail,
                    dateCreated: new Date()
                })
            const token = jwt.sign({ username: name, admin: false }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            }); //{expiresIn:'365d'}
                  
            res.json({ ok: true, message: "Register success", token });

	    }
	    catch(error){
	        console.log(error)
	    };
	}
    
    async login(req, res){

        let {
                username: name, 
                password: pass
            } = req.body.loginPayload;
        
        try{
            const user = await users.findOne({username: name})
            
            if(!user) return res.json({ok:false, message:"User not found!"})
            
            const match = await argon2.verify(user.password, pass);
            
            if(match){
                const token = jwt.sign({ username: user.username, admin: false }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            }); //{expiresIn:'365d'}
                  
            res.json({ ok: true, message: "Login success", token });
        
        }else{
            res.json({ok:false, message:"incorrect password"})}
        }catch(e){
        console.log(e)
        }        
    }

    
    async verifyToken(req, res){
		const token = req.headers.authorization;
        console.log("verifyTokenServer");
		jwt.verify(token, process.env.JWT_SECRET, (err, succ) => {
			err
	  		  ? res.json({ ok: false, message: "Token is corrupted" })
	  		  : res.json({ ok: true, succ });
	    });
    }
}

module.exports = new UserClass()