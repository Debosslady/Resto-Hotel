$(".save_data").on('click', function(event){
    
    event.preventDefault();
    var _This = $(this);
    var submitBtn = $(this);
    var actionMethod = $(this).attr('data-url');
    var btnHTML = submitBtn.html();

    submitBtn.html('<span class="text" style="color:gold"><i class="fas fa-sync-alt " style="color:gold"></i> processing...</span>').attr('disable', 'true');

    var form = $(this).closest('form')[0];                            
    var formData = new FormData(form)

    for(var pair of formData.entries()){
        console.log(pair[0]+ ', '+ pair[1]);
    }

    var settings = {
        url : actionMethod,
        type : 'POST',
        enctype: 'multipart/form-data',
        processData : false,
        contentType : false,
        cache : false,
        data : formData
    };

    $.ajax(settings).done(function(response){
        console.log(response);
        submitBtn.removeAttr('disable');
        submitBtn.html(btnHTML);
        if(response){
            var responseData = response;
            if(responseData.status == 'Failure'){
                swal({
                    title: "An error occured!",
                    text: responseData.message,
                    icon: "warning",
                    button: "OK"
                });
            }else{
                swal({
                    title: "Request Processed Successfully!",
                    text: responseData.message,
                    icon: "success",
                    button: "OK"
                }).then(function(result){
                    if(result){
                        setTimeout(window.location.reload.bind(window.location), 300)
                    }else{
                        setTimeout(window.location.reload.bind(window.location), 300);
                    }
                });
            }
        }else{
            console.log('An error occured');
        }
    });
});