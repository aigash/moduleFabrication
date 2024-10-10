let service = {
    getMac: function() {
        return $.ajax(ajaxBuildSettings( "/beCal/getMac"));
    }
};

function getMac(){
    var xhr = service.getMac();
    xhr.done(function (data) {
        let result = data.response?.dsCal?.dsCal?.ttMac || [];
        console.log(result);
    });
};