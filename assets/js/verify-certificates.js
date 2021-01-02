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


SEARCH_BY_CERT_BUTTON.addEventListener("click", function() {
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
    .catch(function(error) {
      console.log("Error getting documents:", error);
    });
})


SEARCH_BY_NAME_BUTTON.addEventListener("click", function() {
  console.log("The search by name button has been pressed.");
})
  .catch(err => console.error("Error adding an event listener to the search by name button:", err));


function link_clicked() {
  console.log("The display certificate hyperlink has been clicked.");
  // console.log("  for:", certificate_number);
}