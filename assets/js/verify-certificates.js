// The app's Firebase project configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZ_QSTi7a41zQa4wtO-c53tpK1PVnFxYM",
  authDomain: "python-certificates.firebaseapp.com",
  projectId: "python-certificates",
  storageBucket: "python-certificates.appspot.com",
  messagingSenderId: "337313845571",
  appId: "1:337313845571:web:c84ee85fa623a098f81ff6",
  measurementId: "G-Z6WM0SCQ0T"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const DB = firebase.firestore();
const CERTIFICATES_REF = DB.collection("certificates");
const STUDENTS_REF = DB.collection("students");

// For search by certificate number
const QUERY_CERTIFICATE_NUMBER = document.querySelector("#query_cert");
const SEARCH_BY_CERT_BUTTON = document.querySelector("#search_by_cert_button");
// For search by name and date of birth
const QUERY_FIRST_NAME = document.querySelector("#query_first_name");
const QUERY_LAST_NAME = document.querySelector("#query_last_name");
const QUERY_DOB_TEXT = document.querySelector("#query_date_of_birth");
const SEARCH_BY_NAME_BUTTON = document.querySelector("#search_by_name_button");
// For displaying the list of student's certificate numbers
const LIST_OF_CERTIFICATES = document.querySelector("#list_of_certificates");
// For displaying the retrieved certificate info
const DISPLAY_FIRST_NAME = document.querySelector("#first_name");
const DISPLAY_LAST_NAME = document.querySelector("#last_name");
const DISPLAY_CERTIFICATE_NUMBER = document.querySelector("#certificate_number");

const DISPLAY_STATUS = document.querySelector("#status");
// ...


function click_handler(event) {
  MATCHES = ["search_by_cert_button", "search_by_name_button"];
  PARTIAL_MATCHES = ["display_certificate_"];
  
  console.log("Click Handler: A click was made on", event.target.id, event.target);
  
  // Short circuit on any target that is not a match (not to be handled).
  if ( !MATCHES.includes(event.target.id) && !includes(event.target.id, PARTIAL_MATCHES) ) {
	return;
  }
  
  // Disable the default action of the event (don't open the URL).
  event.preventDefault();
  
  console.log("The target is a match.");
  
  if (event.target.id == "search_by_cert_button") {
    cert_button_clicked();
  }
  
  if (event.target.id == "search_by_name_button")
    name_button_clicked();
  
  if (event.target.id.startsWith("display_certificate_")) {
    const certificate_number = event.target.id.replace("display_certificate_", "");
	link_clicked(certificate_number);
  }
}

document.addEventListener("click", function() {click_handler(event);});







function cert_button_clicked() {
  console.log("Getting the data from Firestore.");
  CERTIFICATES_REF.where("certificate_number", "==", QUERY_CERTIFICATE_NUMBER.value)
    .get()
    .then(function(query_snapshot) {
      query_snapshot.forEach(function(certificate) {
        console.log(certificate.data());
        console.log("Certificate number in the database:", certificate.get("certificate_number"));
        
        populate_certificate_info(certificate);
      });
    })
    .catch(function(err) {
      console.error("Error getting documents:", err);
    });
}


async function name_button_clicked() {
  console.log("The search by name button has been pressed.");
  
  // Convert the query date of birth to a Firestore timestamp object
  let query_dob_date = new Date(QUERY_DOB_TEXT.value + "T00:00:00-05:00");
  let query_dob_timestamp = firebase.firestore.Timestamp.fromDate(query_dob_date);
  console.log("Query date of birth as JS Date and Firebase timestamp:", query_dob_date, query_dob_timestamp);
  
  // Query the *students* collection
  console.log("Getting the student data from Firestore.");
  await STUDENTS_REF.where("first_name", "==", QUERY_FIRST_NAME.value).where("last_name", "==", QUERY_LAST_NAME.value).where("date_of_birth", "==", query_dob_timestamp)
    .get()
    .then(function(query_snapshot) {
      query_snapshot.forEach(function(student) {
        console.log("Student document snapshot:", student);
        console.log("Student data:", student.data());
        console.log("Certificate numbers:", student.get("certificate_numbers"));
        
        // Create a hyperlink to display each certificate.
        for (const certificate_number of student.get("certificate_numbers")) {
          console.log("Creating a hyperlink for certificate number:", certificate_number)
          // Build a hyperlink
          let hyperlink = "<p><a id=\"display_certificate_" + certificate_number + "\" href=\"\">" + certificate_number + "</a></p>"
          // Add the hyperlink to the HTML
          LIST_OF_CERTIFICATES.innerHTML += hyperlink
        }
      });
    })
    .catch(function(err) {
      console.error("Error getting documents:", err);
    });
}


function link_clicked(certificate_number) {
  console.log("The display certificate hyperlink has been clicked.");
  console.log(certificate_number);
  // console.log("  for:", certificate_number);
}


function populate_certificate_info(cert_doc) {
  // Populate the HTML document with the certificate information retrieved from the Firebase database.
  // Args:
  //   cert_doc: A Firebase document in the *certificates* collection. This is the returned result of the query.
  // Returns:
  //   None
  
  DISPLAY_FIRST_NAME.innerHTML = cert_doc.get("first_name");
  DISPLAY_LAST_NAME.innerHTML = cert_doc.get("last_name");
  DISPLAY_CERTIFICATE_NUMBER.innerHTML = cert_doc.get("certificate_number");
}


function includes(test_string, target_array, match_type="starts_with") {
  // Checks whether any string in the *target_array* is a substring to *test_string*.
  // Example:  includes("welcome home!", ["234", "welcome", "abc"], "starts_with")  yields true.
  //
  // Args:
  //   test_string: The string to test. If a match, this string contains one of the strings in the target array.
  //   target_array: The target array. If a match, of the strings in this array is a substring of the test string.
  //   match_type: One of the three strings: "starts_with", "includes", "ends_with"
  // Returns:
  //   true if a partial match is found
  //   false if the test string is not a partial match to any of the strings in the target array.
  
  if (match_type == "starts_with") {
    for (target of target_array) {
      if (test_string.startsWith(target))
        return true;
    }
    // If you reach here, it means none of the strings in the array were a match.
    return false;
  } else if (match_type == "includes") {
      for (target of target_array) {
        if (test_string.includes(target))
          return true;
      }
	  // If you reach here, it means none of the strings in the array were a match.
	  return false;
  } else if (match_type == "ends_with") {
      for (target of target_array) {
        if (test_string.endsWith(target))
          return true;
      }
	  // If you reach here, it means none of the strings in the array were a match.
	  return false;
  }
}
