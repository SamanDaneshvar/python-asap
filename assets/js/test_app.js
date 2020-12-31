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


const db = firebase.firestore();
const certificates_ref = db.collection("certificates");
const students_ref = db.collection("students");

// For search by certificate number
const query_certificate_number = document.querySelector("#query_cert");
const search_by_cert_button = document.querySelector("#search_by_cert_button");
// For search by name and date of birth
const query_first_name = document.querySelector("#query_first_name");
const query_last_name = document.querySelector("#query_last_name");
const query_dob_text = document.querySelector("#query_date_of_birth");
const search_by_name_button = document.querySelector("#search_by_name_button");
// For displaying the retrieved student and certificate info
const display_first_name = document.querySelector("#first_name");
const display_last_name = document.querySelector("#last_name");
const display_certificate_number = document.querySelector("#certificate_number");

const display_status = document.querySelector("#status");
// ...


function populate_certificate_info(document) {
  // Populate the HTML document with the certificate information retrieved from the Firebase database.
  // Args:
  //   document: A Firebase document in the *certificates* collection. This is the returned result of the query.
  // Returns:
  //   None
  
  display_first_name.innerHTML = document.get("first_name");
  display_last_name.innerHTML = document.get("last_name");
  display_certificate_number.innerHTML = document.get("certificate_number");
}


search_by_cert_button.addEventListener("click", function() {
  console.log("Getting the data from Firestore.");
  certificates_ref.where("certificate_number", "==", query_certificate_number.value)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(certificate) {
        console.log(certificate.data());
        console.log("Certificate number in the database:", certificate.get("certificate_number"));
        
        populate_certificate_info(certificate);
      });
    })
    .catch(function(error) {
      console.log("Error getting documents:", error);
    });
})


search_by_name_button.addEventListener("click", function() {
  // Convert the query date of birth to a Firestore timestamp object
  var query_dob_date = new Date(query_dob_text.value + "T00:00:00-05:00");
  var query_dob_timestamp = firebase.firestore.Timestamp.fromDate(query_dob_date);
  console.log("Query date of birth as JS Date:", query_dob_date);
  console.log("Query date of birth as Firebase timestamp:", query_dob_timestamp);
  
  // Query the *students* collection
  console.log("Getting the data from Firestore.");
  students_ref.where("first_name", "==", query_first_name.value).where("last_name", "==", query_last_name.value)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(student) {
        console.log("Student data:", student.data());
        
        var date_of_birth = student.get("date_of_birth")
        console.log("Date of birth:", date_of_birth);
        console.log("Query === Date of birth?", date_of_birth.isEqual(query_dob_timestamp));
        console.log("Certificates:", student.get("certificates"));
        console.log("Certificates 0:", student.get("certificates")[0]);
        console.log("Get certificate 0:", student.get("certificates")[0].get());
        
        
        for (certificate of student.get("certificates")) {
          console.log("Certificate number in the database:", certificate.get("certificate_number"));
        }
        
        // %%% Create links that would display a certificate upon clicking.
      });
    })
    .catch(function(error) {
      console.log("Error getting documents:", error);
    });
})
