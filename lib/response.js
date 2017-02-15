/**
 * Created by samparsky
 */

var response = {
    response_ok : function(data){
        return  {
            status : true,
            data : data
        };

    },
    response_bad : function(code,message ,error){
        return {
            status : false,
            message : message,
            code : code,
            error : error
        };

    }
};

module.exports = response;