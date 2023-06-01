const generateBtn = document.querySelector(".generateBtn");
const fileInput = document.getElementById("fileInput");
const fileNameDisplay = document.querySelector(".form p");
const loader = document.querySelector("#js-preloader");
const jsonEditorBtnContainer = document.querySelector(".jsonEditorBtnCont");
let fileName = "";
fileInput.addEventListener("change", function () {
  fileName = fileInput.files[0].name;
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
      displayJson(response.data);
    })
    .catch(function (error) {
      loader.classList.add("loaded");
      jsonEditorBtnContainer.style.display = "none";
      alert("Error occured, please try again");
      console.error("Error:", error);
    });
}

function downloadJSON(jsonData) {
  var data = JSON.stringify(jsonData);
  var file = new Blob([data], { type: "application/json" });
  var a = document.createElement("a");
  var url = URL.createObjectURL(file);
  a.href = url;
  a.download = `${fileName.split(".xml")[0]}.json`;
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}

function displayJson(jsonData) {
  loader.classList.add("loaded");
  jsonEditorBtnContainer.style.display = "flex";
  let downloadBtn = document.querySelector(".jsonEditorDownBtn");
  downloadBtn.addEventListener("click", () => {
    downloadJSON(jsonData);
  });
  var container = document.getElementById("jsonEditor");
  var options = {
    mode: "code",
    modes: ["tree", "code", "text"],
  };
  var jsonEditor = new JSONEditor(container, options);
  jsonEditor.set(jsonData);
}
