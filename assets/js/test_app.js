var firestore = firebase.firestore();
const doc_ref = firestore.doc("certificates");

const output_header = document.querySelector("#heading");
const input_text_field = document.querySelector("#certificate_number");
const send_button = document.querySelector("#send_button");

send_button.addEventListener("click", function() {
  const text_to_send = input_text_field.value;
  console.log("Sending " + text_to_send + " to Firestore.");
  doc_ref.set({
    "certificate number": text_to_send
  }).then(function() {
    console.log("Certificate number saved.");
  }).catch(function(error) {
    console.log("Got an error: ", error);
  });
})
