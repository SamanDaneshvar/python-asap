var firestore = firebase.firestore();
const coll_ref = firestore.collection("certificates");

const output_header = document.querySelector("#heading");
const input_text_field = document.querySelector("#certificate_number");
const add_button = document.querySelector("#add_button");
const get_button = document.querySelector("#get_button");

add_button.addEventListener("click", function() {
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

get_button.addEventListener("click", function() {
  coll_ref.get().then(function(doc) {
    if (doc && doc.exists) {
      const my_data = doc.data();
      output_header.innerText = "The certificate number: " + my_data.get("certificate number")
    }
  }).catch(function(error) {
    console.log("Got an error: ", error);
  });
})
