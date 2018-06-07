// Weather in my current locaiton
// Different icon or background image ( snowy mountain, hot desert)
// Button to toggle between Fahrenheit and Celsius
// API key
// 519078cb98ea4189911193547171912
// HTTPS: https://api.apixu.com/v1/current.json?key=9519078cb98ea4189911193547171912


$(document).ready(function(){
    
    // Get current Location:
    function currentLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(getWeather);
        }
            
        
    }
    // Request data from API:
    function getWeather(position){
        var apiKey = "519078cb98ea4189911193547171912";
        var currentLatitude = position.coords.latitude.toFixed(2);
        var currentLongitude = position.coords.longitude.toFixed(2);

            $.ajax({
                cache: false,
                url: 'http://api.apixu.com/v1/current.json?key=' + apiKey + '&q=' + currentLatitude + ', ' + currentLongitude,
                    success: function(data) {
                        resultAPI(data);
                    }
            });
           
    }
        

    // Write to HTML
    function resultAPI(data){
        var tempInC = data.current.temp_c;
        var tempInF = 0;
        var weatherCondition = data.current.condition.text;
        var weatherIcon = weatherType(weatherCondition);
        var weatherUnit = "C";

        var html = '';
        html += '<ul class="local-weather-nav" role="navigation">';
        html += '<li class="local-weather-mode"><span class="night">Night Mode</span> <span class="day">Day Mode</span> </li>';
        html += '</ul>';
        html += '<div class="local-weather-location">';
        html += '<span class="local-weather-location-region">' + data.location.region + '</span>';
        html += '<span class="local-weather-location-city">' + data.location.name + '</span>';
        html += '<span class="local-weather-location-condition">' + data.current.condition.text + '<img class="local-weather-location-condition-icon" src="' + weatherIcon + '" alt="' + data.current.condition.text + '">' + '</span>';
        html += '<span class="local-weather-location-temp">'  + data.current.temp_c + ' &#176;' + weatherUnit +  '</span>';
        html += '</div>';
        html += '</div>';
        $('.local-weather-app').append(html);

        // Choose to use imperial units or not
        $(".local-weather-location-temp").click(function(){
            if(weatherUnit === "C"){
                // Initialize variable as an imperial unit
                weatherUnit = "F";
                // Convert Celsius to Fahrenheit
                tempInF = (tempInC * 9 / 5) + 32;
                // Display temperature
                $('.local-weather-location-temp').html(tempInF + " &#176;" + weatherUnit);

            } else {
                // Reset weather unit back to Celsius
                weatherUnit = "C";
                // Display temperature
                $('.local-weather-location-temp').html(tempInC + " &#176;" + weatherUnit);
            }
        });
        // Choose day or night mode
        $(".local-weather-nav").click(function(){
            $('.local-weather-app').toggleClass('night-mode');
            $('.local-weather-nav').toggleClass('night-mode-nav');
            if($('.night').text() === "Night Mode"){
                $('.night').text('Day Mode');
            } else {
                $('.night').text('Night Mode');
            }
        });

        
    }

    // Choose the weather icon based in what kind of weather we have today
    function weatherType(type){
        switch (type) {
            case "Overcast":
            case "Cloudy":
            case "Partly cloudy":
            case "Fog":
            case "Haze":
            case "Windy":
              $('.local-weather-bg').css("background-image", "url('http://res.cloudinary.com/dzzkw3jto/image/upload/v1515618436/cloudy_pwwx1m.jpg')");
              return "https://image.flaticon.com/icons/svg/495/495651.svg";
              break;
            case "Light Rain":
            case "Moderate rain":
            case "Heavy rain":
                $('.local-weather-bg').css("background-image", "url('http://res.cloudinary.com/dzzkw3jto/image/upload/v1515618436/raining_iv9nyg.jpg')");
              return "https://image.flaticon.com/icons/svg/136/136737.svg";
              break;
            case "Thunder":
              $('.local-weather-bg').css("background-image", "url('http://res.cloudinary.com/dzzkw3jto/image/upload/v1515618436/thunder_klodmg.jpg')");
              return "https://image.flaticon.com/icons/svg/222/222506.svg";
              break;
            case "Snowing":
              $('.local-weather-bg').css("background-image", "url('http://res.cloudinary.com/dzzkw3jto/image/upload/v1515618436/snowing_aasx4h.jpg')");
              return "https://image.flaticon.com/icons/svg/143/143774.svg";
              break;
            default:
              $('.local-weather-bg').css("background-image", "url('http://res.cloudinary.com/dzzkw3jto/image/upload/v1515618436/sunny_rye3fh.jpg')");
              return "https://image.flaticon.com/icons/svg/136/136723.svg";
              break;
          }
    }
    
    // Call function.. and run the program
    currentLocation();

});

