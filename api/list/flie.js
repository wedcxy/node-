//添加1.2级别文件
var express = require('express');
var router = express.Router();
const dbconfig=require('../../mysql/db.js')

//添加一级文件接口
router.post('/fileOne',(req,res)=>{
	let {userId,fileName}=req.body.params
	const type=1   //判断文件级别

	dbconfig.query(`insert into listone (userid,type,fileName) values ('${userId}','${type}','${fileName}')`,[],(err,data)=>{
		if(err)
  		{
  			console.log(err)
	  		res.json({
	  			status:201,
	  			message:'添加一级文件错误!'
	  		})
  		}else{
  			console.log(data)
  			res.json({
  				status:200,
  				message:'添加一级文件成功'
  			})
  		}
	})
})

//添加二级文件接口
//参数：1.用户id
//2.一级文件id
//3.自身的id用于删除文件
//4.存储文件内容
//5.文件名称
router.post('/fileTwo',(req,res)=>{
	let {userid,fileOneId,content,fileName}=req.body.params
	let type=2  //文件级别two
	dbconfig.query(`insert into listtwo (userid,fileOne,content,fileName,type) values ('${userid}','${fileOneId}','${content}','${fileName}','${type}')`,[],(err,data)=>{
		if(err)
  		{
  			console.log(err)
	  		res.json({
	  			status:201,
	  			message:'添加二级文件错误!'
	  		})
  		}else{
  			console.log(data)
  			res.json({
  				status:200,
  				message:'添加二级文件成功'
  			})
  		}
	})
})

//提交二级文件内容接口
router.post('/fileTwo/submitContent',(req,res)=>{
	let {fileOneId,fileTwoId,content} = req.body.params
	console.log(fileOneId)
	console.log(fileTwoId)
	console.log(content)
	//传递参数判断是否空白
	if (!fileOneId || !fileTwoId || !content) {
		res.json({
			status:201,
			message:'提交的参数不能空白'
		})
	}
	
	dbconfig.query(`update listtwo set  content = '${content}' WHERE  id = '${fileTwoId}' and fileOne = '${fileOneId}'`,[],(err,data)=>{
		if(err)
  		{
  			console.log(err)
	  		res.json({
	  			status:201,
	  			message:'编辑二级文件内容错误!',
	  			error:err
	  		})
  		}else{
  			console.log(data)
  			res.json({
  				status:200,
  				message:'编辑二级文件内容成功'
  			})
  		}
	})
})

module.exports = router;

