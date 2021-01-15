function parse_query_string() {
  // Parse the query string of the page into an object (a series of key-value pairs). Each key is a query parameter and its value is the value of that parameter.

  // The *.substring(1)* drops the '?' at the beginning of the query string.
  let query = window.location.search.substring(1);
  // Split the query parameter-value pairs into an array of substrings.
  let param_value_pairs = query.split('&');
  // Create an empty object
  let parsed_params = {};
  // Parse the query parameters and values into an object.
  for (let pair_str of param_value_pairs) {
    // Split the parameter-value string into an array of two substrings.
	let pair = pair_str.split('=');
    // Add the parameter and its value to the *parsed_params* object.
	parsed_params[pair[0]] = pair[1];
  }
  
  // For debugging:
  // console.log('Query string:', query);
  // console.log(parsed_params);
  return parsed_params;
}


function google_lucky(query) {
  // Resolve a query into the URL of the first Google search result (the “I'm feeling lucky” feature).
  // Uses a proxy to work around the cross-origin resource sharing (CORS) restrictions.
  //
  // Args:
  //   query: Any search query.
  //
  // Reutrns:
  //   A URL. This is the first Google search result for the query.
  
  const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
  let url = CORS_PROXY + 'https://www.google.com/search?btnI=I&q=' + query;
  
  let result_url = "before the response callback";
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = response_callback;  // The callback function
  xhttp.open("GET", url, true);
  xhttp.send();
  
  function response_callback() {
    if (this.readyState == 4 && this.status == 200) {
	  // The X-Final-URL response header provides the final URL, after following all redirects.
      let final_url = this.getResponseHeader('X-Final-URL');
      result_url = final_url.replace("https://www.google.com/url?q=", "");
	  
	  alert('Beep!');
	  alert(result_url);
    }
  };
  
  return result_url;
}
