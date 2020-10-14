import User from './../models/user.js';
import express from 'express';
import bcrypt from 'bcrypt';

const userRouter = express.Router();

//@desc add new user
//@route POST/api/user/add
userRouter.post('/add', async (req, res) => {
    try{
        const{
            username,
            password
        } = req.body;

        //digit angka mau berapa banyak
        var saltRounds = 10;
        const hashedPw = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            "username":username,
            "password": hashedPw
        });

        const createdUser = await newUser.save();
  
        res.status(201).json(createdUser);

    }
    catch(error){
        res.status(500).json({ error: error})
    }
})

//@desc login
//@route POST/api/user/login
userRouter.post('/login', async (req, res) => {
    try{

        const{
            username,
            password
        } = req.body;
        
        const currentUser = await new Promise((resolve, reject) =>{
            User.find({"username": username}, function(err, user){
                if(err)
                    reject(err)
                resolve(user)
            })
        })
        
        //cek apakah ada user?
       if(currentUser[0]){
            //check password
            bcrypt.compare(password, currentUser[0].password).then(function(result) {
                if(result){
                    //urus token disini
                    
                    res.status(201).json({"status":"logged in!"});
                }
                else
                    res.status(201).json({"status":"wrong password."});
            });
        }
        else{
            res.status(201).json({"status":"username not found"});
        }

    }
    catch(error){
        res.status(500).json({ error: error})
    }
})

//@desc Get all user
//@route GET/api/user/get
userRouter.get('/get', async (req, res) => {
    const users = await User.find({})
  
    if(users) {
      res.json(users)
    } else {
      res.status(404).json({
        message: 'User not found'
      })
    }
  })
  

//@desc Get a user by ID
//@route GET/api/user/get/:id
userRouter.get('/get/:id', async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
      res.json(user)
    } else {
      res.status(404).json({
        message: 'User not found'
      })
    }
  })

//@desc Update a user by ID
//@route PUT/api/user/update/:id
userRouter.put('/update/:id', async(req, res) => {
    const {
        username,
        password,
    } = req.body

    const user = await User.findById(req.params.id)

    if (user) {
        user.username = username
        user.password = password
        const updateUser = await user.save()
        res.json(updateUser)
    } else {
        res.status(404).json({
            message : 'user not found'
        })
    }
})


//@desc Delete a user by ID
//@route DELETE/api/user/delete/:id
userRouter.delete('/delete/:id', async (req, res) => {
   const user = await User.findById(req.params.id)
   
   if(user) {
       await user.remove()
       res.json({
           message: 'user removed'
       })
   } else {
       res.status(404).json({
           message: 'user not found'
       })
   }
})

//@desc Delete all user
//@route DELETE/api/user/delete
userRouter.delete('/delete', async (req, res) => {
    const user = await User.deleteMany()

    if(user) {
        res.json({
            message:'all user removed'
        })
    } else {
        res.status(404).json({
            message: 'user not found'
        })
    }
})


export default userRouter;