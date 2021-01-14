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
  
  console.log(query);
  console.log(parsed_params);
  return parsed_params;
}

console.log('my-utils.js loaded.');