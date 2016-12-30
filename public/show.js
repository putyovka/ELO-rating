

//$(function(){
$(document).ready(function () {
	
	var $link;
    var $form=$('.torol'); 

    $('.modal .modal-ok').on('click', function(){		
        $.ajax({
            url: '/ajax'+$link,
            data: $form.serializeArray(),
            type: 'DELETE',
            dataType: 'html',
        }).done(function(response){
            var data=JSON.parse(response);
            $('.container').html(data.message);
            location.assign('/user/list');
        })
        .fail(function(){
            alert('hiba!')
        });
    });

    $('.torol').click(function(event){		
		$link = $(this).attr('action');
		$('.modal').modal('show');

        event.preventDefault();
    });
});