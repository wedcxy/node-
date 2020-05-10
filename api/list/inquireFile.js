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
	let {fileOne,userid,index} = req.query

	//判断fileOne 或者 userid 其中一个参数空白
	if (!fileOne && !userid) {

		!fileOne && res.json({ status:201, message:'一级文件id不能为空！'})
		!userid  && res.json({ status:201, message:'userid不能为空！'})
		return
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

				//进行分页数进行计算
				let pageArray = setarray(data,4);
				//根据传递的数字页面进行选择
				let newPageArray = pageArray[index]
				console.log("根据页面数请求的数组"+newPageArray);
				res.json({ status : 200 , message : '请求用户id查询二级列表成功！', data : newPageArray , pageNumber : pageArray.length ,})
			}
		})
	}

	//进行分页
	setarray=(array,finish)=>{
		let index = 0;
		let newArray = [];
		while(index < array.length){
			newArray.push(array.slice(index,index+=finish))
		}
		return newArray
	}
})

module.exports = router;
