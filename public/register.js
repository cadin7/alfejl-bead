$(function(){
    var $registerLink=$('#register-link');

    var $registerDialog = $(`
        <div class="modal fade confirm-modal" tabindex="-1" role="dialog" id="registerModal">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
            <div class="modal-header">Regisztráció</div>
            <div class="modal-body">
                <div class="alert alert-danger">A megadott adatok hibásak!</div>
                <div class="form-area"></div>
            </div>
            </div>
        </div>
        </div>`);


    var $registerAlert = $registerDialog.find('.alert');
    $registerAlert.hide();

    $registerDialog.find('.form-area').load('/register .register-form', function(){
        $registerForm=$registerDialog.find('.register-form');
        $registerForm.on('submit', function(e){
            e.preventDefault();

            $.ajax({
                url: '/ajax/register',
                data: $registerForm.serializeArray(),
                type: 'POST',
                dataType: 'json',
            }).done(function(resp){
                if(resp.success){
                    $registerDialog.modal('hide');
                    $('.navbar-collapse').load('/ .navbar-collapse');
                }else{
                    $registerAlert.show();
                }
            })
            .fail(function(){
                alert('hiba!')
            });
        });
    });

    $registerLink.on('click', function(e){
        e.preventDefault();

        $registerDialog.modal('show');
    });
})