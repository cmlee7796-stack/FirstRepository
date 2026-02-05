import express from 'express';
import conn from '../mariadb.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

import {body,param, validationResult} from 'express-validator';
const router = express.Router();

router.use(express.json());

const validate = (req, res,next) => {
    const err = validationResult(req);
    if(err.isEmpty()){
        return next();
    }else{
        return res.status(400).json(err.array());
    }
}


//로그인
router.post('/login',
    [
        body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
        body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
        validate
    ], 
    (req, res) => {
    const {email, password} = req.body;

    let sql = `SELECT * FROM users WHERE email = ?`;
    conn.query(sql, email,
        function(err, results){
            let loginUser = results[0];

            if(loginUser && loginUser.password == password){
                const token = jwt.sign({
                    email : loginUser.email,
                    password : loginUser.password
                }, process.env.PRIVATE_KEY,{
                    expiresIn :'30m',
                    issuer : "cmlee"
                })
                
                res.cookie("token", token,{
                    httpOnly: true
                });
                res.status(200).json({
                    message : `${loginUser.name} 님 로그인 되었습니다.`
                });
            }else{
                res.status(403).json({
                    message : "이메일 또는 비밀번호가 틀렸습니다."
                });
            }
        }
    );
    
});

router.post('/join',
     [
        body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
        body('name').notEmpty().isString().withMessage('이름 확인 필요'),
        body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
        body('contact').notEmpty().isString().withMessage('연락처 확인 필요'),
        validate
    ],
    (req, res) => {
    if(req.body =={}){
         res.status(400).json({
            message : "입력 값을 다시 확인해 주세요."
        });                    
    }else{
        const {email, name, password, contact} = req.body;

        let sql = `INSERT INTO users (email, name, password, contact)
            VALUES (?, ?, ?, ?)`;
        let values =[email, name, password, contact];
        conn.query(sql, values,
            function(err,results){
                if(err){
                    if (err.code === 'ER_DUP_ENTRY') {
                        if (err.sqlMessage.includes('email')) {
                            return res.status(409).json({ message: '이미 사용 중인 이메일입니다' });
                        }
                        return res.status(409).json({ message: '중복된 데이터입니다' });
                    }
                }else{
                    res.status(201).json(results);
                }
           
                
            }
        ) 
    }
});


router
    .route('/users')
    .get(
        [
            body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
            validate
        ],
        (req, res) => {
            let {email} = req.body;
            let sql = `SELECT * FROM users WHERE email = ?`;
            conn.query(sql, [email],
                function(err,results){
                    res.status(200).json(results);
                }
            ) 
    })
    .delete(
        [
            body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
            validate
        ]
        ,(req, res) => {
        let {email} = req.body;
        console.log(email);
        let sql = `DELETE FROM users WHERE email = ?`;
        conn.query(sql, email,
            function(err,results){
                res.status(200).json(results);
            }
        ) 
    });

//module.exports = router;
export default router;

