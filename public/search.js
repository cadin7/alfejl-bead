$(function(){
    $('#search [name=q]').on('input', function(){
        $.get('/ajax/search',{
            q:$(this).val()
        }).done(function(result){
            let html='';
            for(let i=0;i<result.length;i++){
                const telekocsi = result[i];
                html+='<a class="list-group-item" href="/telekocsi/'+telekocsi.id+'">'+telekocsi.fromm+'</a>';
            }
            $('.suggestions').html(html);

        });
    });
})