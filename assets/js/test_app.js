const firestore = firebase.firestore();
const certificates_ref = firestore.collection("certificates");
const students_ref = firestore.collection("students");

// For search by certificate number
const query_certificate_number = document.querySelector("#query_cert");
const search_by_cert_button = document.querySelector("#search_by_cert_button");
// For search by name and date of birth
const query_first_name = document.querySelector("#query_first_name");
const query_last_name = document.querySelector("#query_last_name");
const query_date_of_birth = document.querySelector("#query_date_of_birth");
const search_by_name_button = document.querySelector("#search_by_name_button");
// For displaying the retrieved certificate info
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
      querySnapshot.forEach(function(doc) {
        console.log(doc.data());
        console.log("Certificate number in the database:", doc.get("certificate_number"));
        
        populate_certificate_info(doc);
      });
    })
    .catch(function(error) {
      console.log("Error getting documents:", error);
    });
})


search_by_name_button.addEventListener("click", function() {
  console.log("Getting the data from Firestore.");
  students_ref.where("first_name", "==", query_first_name.value).where("last_name", "==", query_last_name.value)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(student) {
        console.log("Student data:", student.data());
        console.log("Date of birth:", student.get("date_of_birth").toDate());
        console.log("Query date of birth:", query_date_of_birth.value);
        console.log("Query date converted to timestamp:", firebase.firestore.Timestamp.fromDate(query_date_of_birth.value));
        
        for (certificate of student.get("certificates")) {
          console.log("Certificate number in the database:", certificate.get("certificate_number"));
        }
        
        // %%% Create links that would display a certificate upon click.
      });
    })
    .catch(function(error) {
      console.log("Error getting documents:", error);
    });
})
