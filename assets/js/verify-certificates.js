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




console.log("Adding an event listener on:", SEARCH_BY_NAME_BUTTON.innerHTML, SEARCH_BY_NAME_BUTTON);
console.log("Add event listener?", SEARCH_BY_NAME_BUTTON.addEventListener)

SEARCH_BY_NAME_BUTTON.addEventListener("click", button_clicked);

async function button_clicked() {
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
		  let hyperlink = "<p><a id=\"display_certificate_" + certificate_number.replace(/-/g, "") + "\" href=\"javascript:void(0);\">" + certificate_number + "</a></p>"
		  // Add the hyperlink to the HTML
		  LIST_OF_CERTIFICATES.innerHTML += hyperlink
		}
	  });
	})
	.catch(function(error) {
	  console.log("Error getting documents:", error);
	});
}