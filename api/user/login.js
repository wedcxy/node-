var express = require('express');
var router = express.Router();
const jwt=require('jsonwebtoken')
const dbconfig=require('../../mysql/db.js')


/*登录接口*/
router.post('/login', function(req, res, next) {
  const {username,password}=req.body.params
  //查询字段
  dbconfig.query('select id,username,password from user',[],(err,data)=>{
  	if(err)
  	{
  		res.json({
  			status:201,
  			message:'链接出错'
  		})
  	}else{
  		let information=data  //存储数据库遍历的数据
  		//遍历数据库数据判断是否存在
  		let storage = information => information.find(information => information.username == username && information.password == password)

  		//判断是否存在用户
  		if(storage(information) == null){
  			//不存在
  			res.json({
  				status:404,
  				message:'账号或密码错误'
  			})
  		}else{
  			//存在

  			//1.产生token
  			let rule={username:username,password:password}

  			jwt.sign(rule, 'Bearer ',{ expiresIn: 3600 }, function(err, token) {
			if(err) throw err;
		        res.json({
		        	id:storage(information).id,
					status:200,
					token:'Bearer '+token,
					message:'登录成功'
        		})
    		})
  		}
  	}
  })

});

module.exports = router;