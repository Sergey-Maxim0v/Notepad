const textInput = document.getElementById('textInput')
const fileNameInput = document.getElementById('fileNameInput')
const txtSaveButton = document.getElementById('saveBtnTxt')
const fileInput = document.getElementById('fileUpload');

const forbiddenSymbolsArray = ['+', '|', '>', '<', '"', '?', '*', ':', '/', '%', '\\', '!', '@']
const notValidFileNameMessage = [
  `The file name must not contain characters: ${forbiddenSymbolsArray.join('')}`,
  `The filename must not end with a space character`,
  `The filename must not end with a dot`,
].join('\n')

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
  setFileNameInputNotValidStyle(fileName.name, fileNameInput)
  txtSaveButton.download = `${fileName.name}.txt`
  txtSaveButton.innerHTML = `Download as "${fileName.name}.txt"`
}

function processingUploadedFile() {
  if (!fileInput.files.length) return

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
  fileNameInput.value = fileName.name
  txtSaveButton.innerHTML = `Download as "${fileName.name}.txt"`
}

txtSaveButton.addEventListener('click', () => {
  if (checkIsValidFileName(fileName.name)) {
    const txtBlob = new Blob([fileValue.value], {type: 'text/plain'})
    txtSaveButton.href = URL.createObjectURL(txtBlob)
  } else {
    const correctedName = getFilterSymbolsFileName(fileName.name, forbiddenSymbolsArray)
    alert(notValidFileNameMessage)
    fileName.setName(correctedName)
    fileNameInput.value = correctedName
    txtSaveButton.innerHTML = `Download as "${fileName.name}.txt"`
    setFileNameInputNotValidStyle(fileName.name, fileNameInput)
    return
  }
})

const checkIsValidFileName = (fileName) => {
  for (let i = 0; i < fileName.length; i++) {
    if (forbiddenSymbolsArray.includes(fileName[i])) return false
  }
  return !(fileName[fileName.length - 1] === ' ' || fileName[fileName.length - 1] === '.');
}

const getFilterSymbolsFileName = (fileName, arraySymbols) => {
  let correctedName = fileName.slice()
  for (let symbol of arraySymbols) {
    correctedName = correctedName.split('').filter((a) => a !== symbol).join('')
  }
  if (correctedName[correctedName.length - 1] === ' ' || correctedName[correctedName.length - 1] === '.') {
    correctedName = correctedName.slice(0, -1)
  }
  return correctedName
}

const setFileNameInputNotValidStyle = (fileName, input) => {
  if (!checkIsValidFileName(fileName)) {
    input.classList.add('fileNameInputNotValid')
  } else {
    input.classList.remove('fileNameInputNotValid')
  }
}
