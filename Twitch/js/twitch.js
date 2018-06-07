// 

// Pseudocode:
// Loop through the array of streams and request each stream one by one to the API
// Build user interface for each stream
// Render in the browser

// Document Ready API: 

$(document).ready(function(){
    
    var channels = ["esl_sc2", "ogamingsc2", "cretetion", "freecodecamp", "habathcx", "codingrainbow", "noobs2ninjas"];
    // Loop through channels
    $.each(channels, function(index, user){
        // Call API for each channel
        var userStatus;
        // Check if a stream is online or not
        $.ajax({
            url:'https://wind-bow.glitch.me/twitch-api/streams/' + user + '?callback=?',
            type: 'GET',
            dataType: 'json',
            success: function(status){
                if(status.stream === null || status.stream === undefined){
                    userStatus = "offline";
                } else {
                    userStatus = "online";
                }
            }

        });
        // Get users:
        $.ajax({
            url:'https://wind-bow.glitch.me/twitch-api/channels/' + user + '?callback=?',
            type: 'GET',
            dataType: 'json',
            success: function(data){
                renderInAPP(data, userStatus);
            }

        });

        // Some streams appear to be offline when they are live... May be due to the fact the user doesn't want to share stream information or to a bug in wind-bow API.
        
    });

    function renderInAPP(user, user_status){
           // Builds up the elements to display each result
           var html = '<a class="stream-user-link" href="https://www.twitch.tv/' + user.name + '"target="_blank">';
           if(user_status === "offline"){
                html += '<div class="stream-user offline">';
           } else {
                html += '<div class="stream-user online">';
           }
                html += '<div class="stream-user-photo">';
                html += '<img class="stream-user-photo-id" src="' + user.logo + '" alt="Photo">'; 
                html += '</div>';
                html += '<div class="stream-user-stream">'; 
                html += '<div class="stream-user-name">' + user.name + '</div>';
                html += '<div class="stream-user-description">' + user.status + '</div>';
                html += '</div>';
                html += '</div>';
                html += '</a>';
           
           // Append to stream
           $('.stream').append(html);
    }
    // Search / Button function
    function searchAPP(){
        $('.navbar-form-search').on('keyup', function() {
            // Get value from the input
            var value = $(this).val().toLowerCase();
            // Loop through each div with the class .stream-user-link
            // To check if there are any values that match the value 
            // in the input field
            $('.stream-user-link').filter(function(){
                // Hides any content that doesn't match the input field
                $(this).toggle(
                $(this).text().toLowerCase().indexOf(value) > -1);
            });
        });
        $('.navbar-nav .on').on('click', function() {
            // On click, hide the offline divs and show the online ones if they are hidden
            $(".offline").hide();
            $(".online").show();
            // Remove class active from all li elements and add the class to the current one
            $(".navbar-nav li").removeClass("active");
            $(this).addClass("active");

        });
        $('.navbar-nav .off').on('click', function() {
            // On click, hide the online divs and show the offline ones if they are hidden
            $(".online").hide();
            $(".offline").show();
            // Remove class active from all li elements and add the class to the current one
            $(".navbar-nav li").removeClass("active");
            $(this).addClass("active");
        });
        $('.navbar-nav .all').on('click', function() {
            // On click show all divs
            $(".stream-user").show();
            // Remove class active from all li elements and add the class to the current one
            $(".navbar-nav li").removeClass("active");
            $(this).addClass("active");
        });

    }
    // Run the program
    searchAPP(); 

}); 