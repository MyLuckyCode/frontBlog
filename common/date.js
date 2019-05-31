/**
 * Created by Administrator on 2018/11/4.
 */

export function formatDate(date,fmt){
    if(/(Y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length))
    }
    let o={
        'm+':date.getMonth()+1,
        'd+':date.getDate(),
        'h+':date.getHours(),
        'i+':date.getMinutes(),
        's+':date.getSeconds()
    }
    for(let i in o){
        if(new RegExp(`(${i})`).test(fmt)){
            let str = o[i]+'';
            fmt=fmt.replace(RegExp.$1,(RegExp.$1.length===1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

function padLeftZero(str){
    return ('00'+str).substr(str.length);
}













