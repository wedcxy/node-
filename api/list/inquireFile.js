//查询文件
var express = require('express');
var router = express.Router();
const dbconfig = require('../../mysql/db.js')

//查询全部一级文件的接口
router.get('/inquire/allFile',(req,res)=>{
	let {userid} = req.query
	
	//判断userid是否为空
	!userid && res.json({ status:201, message:'用户id不能为空！'})
	
	dbconfig.query(`select * from listone where userid = ${userid}`,[],(err,data)=>{
		if(err)
		{
			res.json({ status : 201 , message : '请求全部文件失败！' ,err :err })
		}else{
			//成功
			res.json({ status : 200 , message : '请求全部文件成功！', data : data})
		}

		
	})
})


//查询二级文件列表,根据判断是一级文件id，还是用户id发起不同请求
router.get('/inquire/twoFile',[],(req,res)=>{
	let {fileOne,userid} = req.query

	//判断fileOne是否为空
	// !fileOne && res.json({ status:201, message:'一级文件id不能为空！'})

	// dbconfig.query(`select * from listtwo where fileOne = ${fileOne}`,[],(err,data)=>{
	// 	if(err)
	// 	{
	// 		res.json({ status : 201 , message : '请求二级列表失败！' ,err :err })
	// 	}else{
	// 		//成功
	// 		res.json({ status : 200 , message : '请求二级列表成功！', data : data})
	// 	}
	// })


	//判断fileOne 或者 userid 其中一个参数空白
	if (!fileOne && !userid) {

		!fileOne && res.json({ status:201, message:'一级文件id不能为空！'})
		!userid  && res.json({ status:201, message:'userid不能为空！'})

	}

	//根据一级文件id查询二级文件详情
	if (fileOne) {
		dbconfig.query(`select * from listtwo where fileOne = ${fileOne}`,[],(err,data)=>{
			if(err)
			{
				res.json({ status : 201 , message : '请求二级列表失败！' ,err :err })
			}else{
				//成功
				res.json({ status : 200 , message : '请求二级列表成功！', data : data})
			}
		})
		return
	}

	//根据用户id查询所有二级文件内容
	if (userid) {
		dbconfig.query(`select * from listtwo where userid = ${userid}`,[],(err,data)=>{
			if(err)
			{
				res.json({ status : 201 , message : '请求用户id查询二级列表失败！' ,err :err })
			}else{
				//成功
				res.json({ status : 200 , message : '请求用户id查询二级列表成功！', data : data})
			}
		})
	}
})

module.exports = router;