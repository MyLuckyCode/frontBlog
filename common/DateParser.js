

function DateParser(){
	//周六、周日在这里使用了 昨天和今天代替，
	this.weekArr=['周一','周二','周三','周四','周五'];		
}

DateParser.prototype._padLeftZero=function(str){
    str = String(str);
    return ('00' + str).substr(str.length);
}

DateParser.prototype.getLocalTime = function(nS){   //转化时间格式
//console.log(nS)
	let targetDate
	if(parseInt(nS) != 'number' ){
		targetDate = new Date(nS);
	}else{
		targetDate = new Date(parseInt(nS));
	}

    let str = (targetDate.getFullYear()) + '-' 
				+ this._padLeftZero(targetDate.getMonth() + 1) 
				+ '-' + this._padLeftZero(targetDate.getDate()) 
				+ ' ' + this._padLeftZero(targetDate.getHours()) 
				+ ':' + this._padLeftZero(targetDate.getMinutes() + 1)
  
	let currentDate = new Date();
    let $_time_day = currentDate.getDate();
    let $_time_month = currentDate.getMonth()+1;
    let $_time_year = currentDate.getFullYear();
	let $_time_week = currentDate.getDay();
    let timeText='';
	

	//判断是不是昨天
	if(this.isYesterday(currentDate,targetDate)==1){
		timeText='昨天';
		return timeText;
	}
	
	
	//判断是不是同一个星期，如果是就排除 今天，昨天 这两天
	let isWeekFlag = this.isWeek(currentDate,targetDate)
	if(isWeekFlag.is){		
		// 减2天，排除掉 今天，昨天,如果小于2则代表这两天其中一天
		if((isWeekFlag.cWeek-isWeekFlag.tWeek)>=2){	
			timeText = this.weekArr[isWeekFlag.tWeek-1];
			return timeText;
		}
	}
	if(str.substr(0,4)==$_time_year){	//同一年份
		if (str.substr(5, 2) == $_time_month){	//同一月份
			if (str.substr(8, 2) == $_time_day) {	
			
				//同一天 显示 xx:xx
				timeText = str.substr(11, 5);	
			}else {		
			
				//同月份但不是同一个星期也不是今天、昨天，就显示 xx-xx
				timeText = str.substr(5, 5);
			}

		}else {
			
			//不同月份 显示 xx-xx
			timeText = str.substr(5, 5)
		}

	}else {
		
		//不同年份则显示 xxxx-xx,
		// 如果你要显示  xxxx-xx-xx, 把7改为10即可
		timeText = str.substr(0,10)
	}
    return timeText;
} 

//返回出相隔多少天，如果返回 1 就代表昨天
DateParser.prototype.isYesterday = function(currentDate,targetDate){
	let t = new Date(targetDate.getFullYear()+'/'+(targetDate.getMonth()+1)+'/'+targetDate.getDate())
	let c = new Date(currentDate.getFullYear()+'/'+(currentDate.getMonth()+1)+'/'+currentDate.getDate())
	
	let dateNum = (c.getTime()-t.getTime()) / (24*3600*1000)
	return dateNum;
	console.log(c.getTime(),t.getTime(),dateNum)
}


//判断你传进来的那个时间与当前时间是否为同一个星期
DateParser.prototype.isWeek = function(currentDate,targetDate){
	
	/*
		currentDate 当前日期对象，
		targetDate  目标对象,也就是你传进来的时间，当前时间对象需要大于目标时间对象
	*/
	
	// 重新设置日期但不设置时间，如果有时间去比较可能会有bug，
	// 比如今天13:00到明天12:00获取时间戳是达不到1天的，这时候就有bug
	let t = new Date(targetDate.getFullYear()+'/'+(targetDate.getMonth()+1)+'/'+targetDate.getDate())
	let c = new Date(currentDate.getFullYear()+'/'+(currentDate.getMonth()+1)+'/'+currentDate.getDate())
	
	let tWeek = t.getDay() == 0 ? 7 : t.getDay();	//星期天是0，手动改为 7
	let cWeek = c.getDay() == 0 ? 7 : c.getDay();
	let is=true;
	
	let dateNum = (c.getTime()-t.getTime()) / (24*3600*1000)
	if(dateNum >= 7){	//超出或等于7天就不是在同一个星期内
		is = false;
	}else {
		
		if(tWeek == cWeek){	//同一天，间隔小于7天 且星期相等为同一天
			is = true;
		}else {
			if(cWeek<=tWeek){	// 如果当前是星期2，而目标日期为星期5 则不同星期
				is = false;
			} else {			
				//只有当 目标星期 小于当前日期 才有可能为同个星期
				//就是说 你传进来的时间是星期2，当前是星期5，他们的间隔小于7天就是同一个星期
				is = true;
			}
		}
	}

	return {is,cWeek,tWeek}

}

let dateparser=new DateParser();
export default dateparser


//console.log(DateParser.prototype.getLocalTime((new Date('2019/07/04 19:16')).getTime()))


















