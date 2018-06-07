
// Document Ready API: 

$(document).ready(function(){
    // function to get the API
    function getAPI(topic){
        $.ajax({
            url: 'https://en.wikipedia.org/w/api.php?',
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: 'query',
                list: 'search',
                srsearch: topic,
                srlimit: 10,
                format: 'json'
            },
            headers: {
                'Api-User-Agent': 'Example/1.0'
            },
            success: function(data) {
                // Get search result                               
                let result = data.query.search;
                // Render in HTML
                renderInAPP(result);
            }
        });
    }
    function renderInAPP(info){
        // Clear any previous search results to allow for new ones (otherwise they will stack up), thanks jQuery Docs
        // Clear the previous search result title as well for the same reason
        $( '.header-result').remove();
        $('.result-search').remove();
        // Pretends text to the search result
        $('.form-result-group').prepend($('<h2 class="header header-result"> Your search results: </h2>'));
        $.each(info, function(index, value){
            // Builds up the elements to display each result
            $('.form-result-group')
            .append($('<a>', {class: "result-search-read-more", target: "_blank"}) // Took me a hour to think about the solution for this
            .attr("href", "https://en.wikipedia.org/?curid=" + value.pageid) // Calling it a night
            .append($('<div>', {class: "result-search"}) // Append result-search div
            .append($('<div>', {class: "result-search-title"}) // Append result-search-title
            .append(value.title) // Append title
            .append($('<hr>')) // Append horizontal line rule
            .append($('<div>', {class: "result-search-description"}) // Append result-search-description
            .append(value.snippet) // Append description
            .append('...') // Append missing ellipsis to the description
            )))); // Wrap it up and tags
        });
        // Animation
        $('.result-search').delay(1000).fadeIn(1000);
    }
    // Search / Button function
    function searchAPI(){
        // Get value from the input when the key ENTER is pressed
        $('.input-u-topic').keypress(function(e){
            const key = e.which;
            if(key === 13){
                // Save getter value in an variable
                let topic = $('.input-u-topic').val();
                // Run ajax request:
                getAPI(topic);
                // Clears input
                $('.input-u-topic').val('');
            }
        });
        // Just need to work on the button functionality for random search
        $('.btn-search').on('click', function(){
            // Save getter value in an variable
            let topic = $('.input-u-topic').val();
            // Run ajax request:
            getAPI(topic);
            // Clears input
            $('.input-u-topic').val('');
        });
        $('.btn-random').on('click', function(){
            // Open a new window when random button is clicked
            window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');
        });
    }
    // Run the program
    searchAPI();
}); 