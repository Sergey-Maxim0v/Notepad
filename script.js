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

fileInput.addEventListener('change', updateImageDisplay);

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

function updateImageDisplay(e) {
    const file = fileInput.files[0]
    const name = file.name.slice(0, file.name.length - 4)
    fileName.setName(name)
    fileUploadLabel.innerHTML = `${fileName.name}.txt`
    fileNameInput.value = fileName.name
    txtSaveButton.innerHTML = `Download as "${fileName.name}.txt"`
}

txtSaveButton.addEventListener('mouseenter', () => {
    const txtBlob = new Blob([fileValue.value], {type: 'text/plain'})
    txtSaveButton.href = URL.createObjectURL(txtBlob)
})


