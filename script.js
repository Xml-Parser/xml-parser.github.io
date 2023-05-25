const generateBtn = document.querySelector(".generateBtn");
const fileInput = document.getElementById("fileInput");
const fileNameDisplay = document.querySelector(".fileNameDisplay");

fileInput.addEventListener("change", function () {
  const fileName = fileInput.files[0].name;
  fileNameDisplay.innerText = "Uploaded : " + fileName;
});
generateBtn.addEventListener("click", (e) => {
  console.log("clicked");
  e.preventDefault();
  postData();
});
function postData() {
  const form = document.querySelector(".form");
  var url = "https://xmlparser.pythonanywhere.com/parse_xml";
  var formData = new FormData(form);

  axios
    .post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(function (response) {
      // Display the result on the page
      // document.getElementById('result').textContent = JSON.stringify(response.data);
      console.log(response.data);
      displayJson(response.data);
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}
function displayJson(jsonData) {
  var container = document.getElementById("jsonEditor");
  var options = {
    mode: "tree",
    modes: ["tree", "code", "text"],
  };
  var jsonEditor = new JSONEditor(container, options);

  jsonEditor.set(jsonData);
}
