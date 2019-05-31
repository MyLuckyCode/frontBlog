/**
 * Created by Administrator on 2018/12/5.
 */



const local={
    setStorage(name,value){
        localStorage[name]=value;
    },
    getStorage(name){
        return localStorage[name];
    },
    isStorage(name){
        return localStorage[name]==undefined ? false :true;
    }
}

module.exports=local;


















