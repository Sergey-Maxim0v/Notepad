const textInput = document.getElementById('textInput')
const fileNameInput = document.getElementById('fileNameInput')
const txtSaveButton = document.getElementById('saveBtnTxt')
const fileInput = document.getElementById('fileUpload');
const fileUploadLabel = document.getElementById('fileUploadLabel');

const fileValue = {
  value: '',
  setValue(value) {
    this.value = value
  }
}

const fileName = {
  name: 'text',
  setName(name) {
    this.name = name
  }
}

fileInput.addEventListener('change', processingUploadedFile);

txtSaveButton.download = `${fileName.name}.txt`

textInput.oninput = function () {
  fileValue.setValue(textInput.value)
  textInput.value = fileValue.value
}

fileNameInput.oninput = function () {
  fileName.setName(fileNameInput.value);
  fileNameInput.innerHTML = fileName.name
  txtSaveButton.download = `${fileName.name}.txt`
  txtSaveButton.innerHTML = `Download as "${fileName.name}.txt"`
}

function processingUploadedFile() {
  const file = fileInput.files[0]
  const name = file.name.slice(0, file.name.length - 4)
  const reader = new FileReader()

  reader.readAsText(file)
  reader.onload = function () {
    fileValue.setValue(reader.result)
    textInput.value = fileValue.value
  };
  reader.onerror = function () {
    alert(`file read error!!!`);
    console.log(`file read error: ${reader.error}`)
  };

  fileName.setName(name)
  fileUploadLabel.innerHTML = `${fileName.name}.txt`
  fileNameInput.value = fileName.name
  txtSaveButton.innerHTML = `Download as "${fileName.name}.txt"`
}

txtSaveButton.addEventListener('click', () => {
  if (checkValidFileName(fileName.name)) {
    const txtBlob = new Blob([fileValue.value], {type: 'text/plain'})
    txtSaveButton.href = URL.createObjectURL(txtBlob)
  } else {
    return
  }
})

const checkValidFileName = (fileName) => {
  const forbiddenSymbols = ['+', '|', '>', '<', '"', '?', '*', ':', '/', '%', '\\', '!', '@']

  for (let i = 0; i < fileName.length; i++) {
    if (forbiddenSymbols.includes(fileName[i])) {
      alert(`The file name must not contain characters: ${forbiddenSymbols.join('')}`)
      return false
    }
  }

  if (fileName[fileName.length - 1] === ' ') {
    alert('The filename must not end with a space character')
    return false
  }

  if (fileName[fileName.length - 1] === '.') {
    alert('The filename must not end with a dot')
    return false
  }

  return true
}
