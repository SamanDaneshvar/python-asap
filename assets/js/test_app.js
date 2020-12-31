const firestore = firebase.firestore();
const certificates_ref = firestore.collection("certificates");

const output_header = document.querySelector("#heading");
const input_certificate_number = document.querySelector("#query_certificate");
const get_button = document.querySelector("#get_button");

const display_first_name = document.querySelector("#first_name");
const display_last_name = document.querySelector("#last_name");
const display_certificate_number = document.querySelector("#certificate_number");
// ...

get_button.addEventListener("click", function() {
  console.log("Getting the data from Firestore.");
  certificates_ref.where("certificate_number", "==", input_certificate_number.value)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.data())
        console.log("Certificate number in the database:", doc.get("certificate_number"))
      });
    })
    .catch(function(error) {
      console.log("Error getting documents:", error);
    });
})

display_first_name.innerHTML = doc.get("first_name")
display_last_name.innerHTML = doc.get("last_name")
display_certificate_number.innerHTML = doc.get("certificate_number")
