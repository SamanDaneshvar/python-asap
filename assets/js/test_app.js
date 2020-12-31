const firestore = firebase.firestore();
const collection_ref = firestore.collection("certificates/Zo5zllvZevVeq2v8xmvz");

const output_header = document.querySelector("#heading");
const input_text_field = document.querySelector("#certificate_number");
const get_button = document.querySelector("#get_button");

get_button.addEventListener("click", function() {
  console.log("Getting the data from Firestore.");
  collection_ref.get().then(function(doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      output_header.innerText = "Certificate number found: " + doc.get("certificate_number");
    } else {
      console.log("The document does not exist!")
      console.log("doc: ", doc)
      output_header.innerText = "No such certificate number found."
    }
  }).catch(function(error) {
    console.log("Error getting document: ", error);
  });
})
