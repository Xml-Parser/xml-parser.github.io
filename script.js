const generateBtn = document.querySelector(".generateBtn");
const fileInput = document.getElementById("fileInput");
const fileNameDisplay = document.querySelector(".form p");
const loader = document.querySelector("#js-preloader");
fileInput.addEventListener("change", function () {
  const fileName = fileInput.files[0].name;
  fileNameDisplay.innerText = "Uploaded : " + fileName;
});
generateBtn.addEventListener("click", (e) => {
  console.log("clicked");
  loader.classList.remove("loaded");
  e.preventDefault();
  postData();
});
function postData() {
  const form = document.querySelector(".form");
  var url = "https://xmlparser.pythonanywhere.com/parse_xml";
  var formData = new FormData(form);
  if (fileInput.value === "") {
    fileNameDisplay.innerText = "Please upload a file";
    loader.classList.add("loaded");
    return;
  }
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
      loader.classList.add("loaded");
      alert("Error occured, please try again");
      console.error("Error:", error);
    });
}
function displayJson(jsonData) {
  loader.classList.add("loaded");
  var container = document.getElementById("jsonEditor");
  var options = {
    mode: "code",
    modes: ["tree", "code", "text"],
  };
  var jsonEditor = new JSONEditor(container, options);

  jsonEditor.set(jsonData);
}
