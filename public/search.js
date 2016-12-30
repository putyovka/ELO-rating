$(function(){	
    $('#search [name=name]').on('input', function(){
        $.get('/ajax/search',{
            name:$(this).val()
			
        }).done(function(result){            
            let html='';
            for(let i=0;i<result.length;i++){
                const community = result[i];
                html+='<a class="list-group-item" href="/community/'+community.id+'">'+community.name+'</a>';
            }
            

            $('.suggestions').html(html);

        });
    });
})