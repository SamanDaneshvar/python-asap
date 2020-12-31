const firestore = firebase.firestore();
const certificates_ref = firestore.collection("certificates");

const output_header = document.querySelector("#heading");
const input_certificate_number = document.querySelector("#certificate_number");
const get_button = document.querySelector("#get_button");

get_button.addEventListener("click", function() {
  console.log("Getting the data from Firestore.");
  certificates_ref.where("certificate_number", "==", input_certificate_number)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc)
        console.log(doc.data())
        console.log("Certificate number in the database:", doc.get("certificate_number"))
      });
    })
    .catch(function(error) {
      console.log("Error getting documents:", error);
    });
})
