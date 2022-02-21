const textInput = document.getElementById('textInput')
const fileNameInput = document.getElementById('fileNameInput')
const txtSaveButton = document.getElementById('saveBtnTxt')

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

txtSaveButton.addEventListener('mouseenter', () => {
    const txtBlob = new Blob([fileValue.value], {type: 'text/plain'})
    txtSaveButton.href = URL.createObjectURL(txtBlob)
})


