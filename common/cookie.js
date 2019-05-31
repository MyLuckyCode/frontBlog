/**
 * Created by Administrator on 2018/12/4.
 */

    function getExpireTime() {
        let date = new Date();
        let hour = 23 - date.getHours();
        let min = 59 - date.getMinutes();
        let second = 59 - date.getSeconds();
        let ms = (hour * 60 * 60) + (min * 60) + second;
        return ms;
    }

    function Cookie() {
    }

    Cookie.prototype.set = function ( name, value, expires ) {
        if (process.client) {
            var cookieName = encodeURIComponent( name ) + '=' + encodeURIComponent( value );
            if ( expires ) {
                let exp = new Date();
                if ( expires == 'current' ) {
                    exp.setTime( exp.getTime() + getExpireTime() * 1000 );
                } else {
                    exp.setTime( exp.getTime() + expires * 1000 );
                }
                cookieName += ';expires=' + exp.toGMTString();
            }
            document.cookie = cookieName;
        }
    }

    Cookie.prototype.get = function ( name ) {
        if (process.client) {
            let cookieName = encodeURIComponent( name ) + '=';
            let cookieStart = document.cookie.indexOf( cookieName );
            let cookieValue = undefined;
            if ( cookieStart > -1 ) {
                let cookieEnd = document.cookie.indexOf( ';', cookieStart );
                if ( cookieEnd == -1 ) {
                    cookieEnd = document.cookie.length;
                }
                cookieValue = document.cookie.substring( cookieStart + cookieName.length, cookieEnd );
            }
            return decodeURIComponent( cookieValue );
        }
    }

    Cookie.prototype.is = function ( name ) {
        var flag = false;
        if ( this.get( name ) != 'undefined' ) {
            flag = true;
        }
        return flag;
    }


//exports.cookie=new Cookie();
    let cookie = new Cookie();
//exports.cookie=cookie;


    module.exports = cookie;




