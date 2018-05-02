$(document).ready(function(){
    validation         = false;
    validationName     = false;
    validationNumber   = false;
    validationJob      = false;
    validationLocation = false;
    validationUsername = false;
    validationPassword = false;
alert();
    //IF user submit insert or edit contact information then Validate it
    $('#form').submit(function(e){
        if(validationName == false || validationNumber == false || validationJob == false
            || validationLocation == false){
            $('#name').blur();
            $('#number').blur();
            $('#job').blur();
            $('#location').blur();
        }else{
            validation = true;
        }
        if(validation == false){
            e.preventDefault();
        }

    });

    //If user submit login information
    $('#loginForm').submit(function(e){
        if(validationUsername == false || validationPassword == false){
            $('#username').blur();
            $('#password').blur();
        }else{
            validation = true;
        }
        if(validation == false){
            e.preventDefault();
        }
    });

    //Validation contact [Name]
    $('#name').blur(function(){
        if($(this).val().length == 0){
            $(this).parent('div').addClass('has-error');
            $(this).nextAll('span').eq(1).text("This field is required");
        }else if($(this).val().length > 100){
            $(this).parent('div').addClass('has-error');
            $(this).nextAll('span').eq(1).text("This value is oversize of field");
        }else{
            $(this).parent('div').removeClass('has-error');
            var text_match = /[\d]|[~]|[!]|[@]|[#]|[$]|[%]|[\^]|[&]|[*]|[(][)]|[{]|[}]|[[]|[]]|[\\]|[\/]|[|]|[.]|[?]|[,]|[:]|[;]|["]|[']|[+]/;
            if(text_match.test( $(this).val()) == true ){
                $(this).parent('div').addClass('has-error');
                $(this).nextAll('span').eq(1).text("The name cannot content number or symbol");
            }else{
               $(this).parent('div').addClass('has-success');
               $(this).nextAll('span').eq(1).text("");
               validationName = true;
            }
        }
    });

    //Validation contact [Number]
    $('#number').blur(function(){
        if($(this).val().length == 0){
            $(this).parent('div').addClass('has-error');
            $(this).nextAll('span').eq(1).text("This field is required");
        }else if($(this).val().length < 18){
            $(this).parent('div').addClass('has-error');
            $(this).nextAll('span').eq(1).text("The number is not completed");
        }else if($(this).val().length > 18){
            $(this).parent('div').addClass('has-error');
            $(this).nextAll('span').eq(1).text("This value is oversize of field");
        }else{
            $(this).parent('div').removeClass('has-error');
            var text_match = /[a-z]|[A-Z]|[~]|[!]|[@]|[#]|[$]|[%]|[\^]|[&]|[*]|[{]|[}]|[[]|[]]|[\\]|[\/]|[|]|[.]|[?]|[,]|[:]|[;]|["]|[']/;
            if(text_match.test( $(this).val()) == true ){
                $(this).parent('div').addClass('has-error');
                $(this).nextAll('span').eq(1).text("The number cannot content characters");
            }else{
                $(this).parent('div').addClass('has-success');
                $(this).nextAll('span').eq(1).text("");
                validationNumber = true;
            }
        }
    });

    //Validation contact [Job]
    $('#job').blur(function(){
        if($(this).val().length == 0){
            $(this).parent('div').addClass('has-error');
            $(this).nextAll('span').eq(1).text("This field is required");
        }else if($(this).val().length > 18){
            $(this).parent('div').addClass('has-error');
            $(this).nextAll('span').eq(1).text("This value is oversize of field");
        }else{
            $(this).parent('div').removeClass('has-error');
            var text_match = /[\d]|[~]|[!]|[@]|[#]|[$]|[%]|[\^]|[&]|[*]|[(][)]|[{]|[}]|[[]|[]]|[\\]|[\/]|[|]|[.]|[?]|[,]|[:]|[;]|["]|[']|[+]/;
            if(text_match.test( $(this).val()) == true ){
                $(this).parent('div').addClass('has-error');
                $(this).nextAll('span').eq(1).text("The job cannot content number or symbol");
            }else{
                $(this).parent('div').addClass('has-success');
                $(this).nextAll('span').eq(1).text("");
                validationJob = true;
            }
        }
    });

    //Validation contact [Location]
    $('#location').blur(function(){
        if($(this).val().length == 0){
            $(this).parent('div').addClass('has-error');
            $(this).nextAll('span').eq(1).text("This field is required");
        }else if($(this).val().length > 500){
            $(this).parent('div').addClass('has-error');
            $(this).nextAll('span').eq(1).text("This value is oversize of field");
        }else{
            $(this).parent('div').removeClass('has-error');
            var text_match = /^[a-z]{1,}|[A-Z]{1,}/;
            if(text_match.test( $(this).val()) == false ){
                $(this).parent('div').addClass('has-error');
                $(this).nextAll('span').eq(1).text("Bad location");
            }else{
                $(this).parent('div').addClass('has-success');
                $(this).nextAll('span').eq(1).text("");
                validationLocation = true;
            }
        }
    });


    //Validation login [username]
    $('#username').blur(function(){
        if($(this).val().length == 0){
            $(this).parent('div').addClass('has-error');
            $(this).nextAll('span').eq(0).text("This field is required");
        }else{
            $(this).parent('div').removeClass('has-error');
            $(this).nextAll('span').eq(0).text("");
            validationUsername = true;
        }
    });

    //Validation login [password]
    $('#password').blur(function(){
        if($(this).val().length == 0){
            $(this).parent('div').addClass('has-error');
            $(this).nextAll('span').eq(0).text("This field is required");
        }else{
            $(this).parent('div').removeClass('has-error');
            $(this).nextAll('span').eq(0).text("");
            validationPassword = true;
        }
    });

});