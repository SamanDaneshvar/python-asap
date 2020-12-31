var firestore = firebase.firestore();
const coll_ref = firestore.collection("certificates");

const output_header = document.querySelector("#heading");
const input_text_field = document.querySelector("#certificate_number");
const send_button = document.querySelector("#send_button");

send_button.addEventListener("click", function() {
  const text_to_send = input_text_field.value;
  console.log("Sending " + text_to_send + " to Firestore.");
  coll_ref.add({
    "certificate number": text_to_send
  }).then(function() {
    console.log("Certificate number saved.");
  }).catch(function(error) {
    console.log("Got an error: ", error);
  });
})
