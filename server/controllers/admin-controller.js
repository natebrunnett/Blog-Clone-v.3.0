const admins = require('../models/admin.js');
const dotenv = require('dotenv');
dotenv.config();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken")

class AdminClass {

    async sendToken(req, res) {

        const token = jwt.sign(
            { 
                username: 'adminUser', 
                admin: true 
            },
            process.env.JWT_SECRET, 
            { 
                expiresIn: "1h",
            }
            ); //{expiresIn:'365d'}

        res.json({ ok: true, message: "Login success", token });
    }

    async add(req, res){

        const salt = process.env.SALT

		let { 
			username: name,
            password: pass,
            adminKey: key,
		} = req.body;
		try{
            console.log(name)
            if(process.env.ADMIN_KEY === key){
                console.log("key match")
                
                const admin = await admins.findOne({username: name});
                if (admin) return res.json(
                { 
                    ok: false, message: "User already exists!"
                });

                const hash = await argon2.hash(pass, salt);

                await admins.create(
                    {
                        username: name,
                        password: hash,
                    })
                res.send({ok: true, message: "Admin created!"});
            }
            res.send({ok: false, message: "failed to create"})

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
            console.log(name);
            console.log(pass);
            const admin = await admins.findOne({username: name})
            
            if(!admin) return res.json({ok:false, message:"Admin not found!"})
            
            const match = await argon2.verify(admin.password, pass);
            
            if(match){
                const token = jwt.sign({ username: admin.username, admin: true }, process.env.JWT_SECRET, {
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

module.exports = new AdminClass()