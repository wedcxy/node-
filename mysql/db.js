const mysql=require('mysql')

module.exports={
	//数据库配置
	config:{
		host:'localhost',       	//链接地址
  		user:'root',				//数据库名称
  		password:'a18218791044',	//数据库密码
  		database:'xxbk'		//链接数据库名
 				//端口号
	},

	//链接数据库，使用mysql的链接池链接方式
	//链接池对象
	query :function(sql,sqlArr,callBack){
		//链接池
		const pool=mysql.createPool(this.config);

		pool.getConnection((err,conn)=>{
			console.log('123445')

			if(err)
			{
				console.log(err)
				return
			}

			//事件驱动回调
			conn.query(sql,sqlArr,callBack)

			//释放链接
			conn.release()
		})
	}



}
