// $("#signup").on("submit",function(event){
//     event.preventDefault();
//     console.log("post");
//     const data = {
//         email: $(".signup [id=email-input]").val().trim(),
//         password: $(".signup [id=password-input]").val().trim()
//     }
//     $.ajax("/api/signup",{
//         type: "POST",
//         data: data
//     }).then(()=>{
//         window.location.replace("/login");
//     })
// })

// $(".login").on("submit", function(event){
//     event.preventDefault();
//     $.post("/api/login", {
//         email: $(".login [id=email-input]").val().trim(),
//         password: $(".login [id=password-input]").val().trim(),
//     }).then(function(result){
//         console.log(result);
//     })
// })


$('.ui.radio.checkbox').checkbox();
$('.ui.selection.dropdown').dropdown();
$(document).ready(function() {
    $('.ui.dropdown').dropdown();
    $('.sidebar-menu-toggler').on('click', function() {
      var target = $(this).data('target');
      $(target)
        .sidebar({
          dinPage: true,
          transition: 'overlay',
          mobileTransition: 'overlay'
        })
        .sidebar('toggle');
    });
  });
