$('.ui.radio.checkbox').checkbox();
$('.ui.selection.dropdown').dropdown();

//card expansion animation

$('#over-spending-card').on("click", ".ui.button", function (event) {
    // $('#daily-expenditure-container').transition('scale', '500ms');
    // setTimeout(() => $('#utilization-container').transition('scale', '500ms'), 200);
    // setTimeout(() => $('#financial-goal-container').transition({
    //     animation: "scale",
    //     duration: "500ms"
    //     // onComplete: () => {
    //     //     $('#over-spend-container'). removeClass().addClass("thirteen wide column");
    //     // }
    // }), 300);
    $('#daily-expenditure-card').dimmer("toggle");
    $('#utilization-card').dimmer("toggle");
    $('#financial-goal-card').dimmer("toggle");
    ($(this).text() === 'Clapse') ? $(this).text("Exceesive Expenditure") : $(this).text("Clapse");
    $("#drilldown").transition("fade down", 700);
});

$('#daily-expenditure-card').on("click", function (event) {
    $('#over-spend-container').transition('scale', '500ms');
    setTimeout(() => $('#utilization-container').transition('scale', '500ms'), 200);
    setTimeout(() => $('#financial-goal-container').transition({
        animation: "scale",
        duration: "500ms",
        onComplete: () => {
            // $('#daily-expenditure-container').css("display","none");
            // $('#utilization-container').css("display","none");
            // $('#financial-goal-container').css("display","none;");
            // $('#over-spend-container'). removeClass().addClass("thirteen wide column");
        }
    }), 300);
});

$('#utilization-card').on("click", function (event) {
    $('#over-spend-container').transition('scale', '500ms');
    setTimeout(() => $('#daily-expenditure-container').transition('scale', '500ms'), 200);
    setTimeout(() => $('#financial-goal-container').transition({
        animation: "scale",
        duration: "500ms",
        onComplete: () => {
            // $('#daily-expenditure-container').css("display","none");
            // $('#utilization-container').css("display","none");
            // $('#financial-goal-container').css("display","none;");
            // $('#over-spend-container'). removeClass().addClass("thirteen wide column");
        }
    }), 300);
});
$('#financial-goal-card').on("click", function (event) {
    $('#over-spend-container').transition('scale', '500ms');
    setTimeout(() => $('#daily-expenditure-container').transition('scale', '500ms'), 200);
    setTimeout(() => $('#utilization-container').transition({
        animation: "scale",
        duration: "500ms",
        onComplete: () => {
            // $('#daily-expenditure-container').css("display","none");
            // $('#utilization-container').css("display","none");
            // $('#financial-goal-container').css("display","none;");
            // $('#over-spend-container'). removeClass().addClass("thirteen wide column");
        }
    }), 300);
});


$(document).ready(function () {
    console.log("Working connected");
    var billBar = $("#bills");

    // const dataPath = './data/users.json';

    // READ
    // app.get('/users', (req, res) => {
    //     fs.readFile(dataPath, 'utf8', (err, data) => {
    //         if (err) {
    //             throw err;
    //         }

    //         res.send(JSON.parse(data));
    //     });
    // });

    setPercentage();

    function setPercentage(Data) {
        $.get("/api/percentage/:id", Data)
            console.log(Data); //data is returning as empty object
            // break;
            
    }



    $('.ui.dropdown').dropdown();
    $('.sidebar-menu-toggler').on('click', function () {
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

//display percentages on side bar
// $(document).ready(function () {
//     var billBar = $("#bills");

//     setPercentage();


//     function setPercentage(Data) {
//         $.get("/api/percentage/:id", Data)
//             .then(getAuthors);
//             console.log("Working connected");
//     }

// })

$('.ui.accordion')
    .accordion();



