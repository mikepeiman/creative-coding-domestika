import {fs} from 'fs'

export const saveFile = (dataToSave, fileName) => {
    const data = JSON.stringify(dataToSave)
    fs.writeFile(`${fileName}`, data, err=> {
        if (err) {
            throw err
        }
        console.log(`🚀 ~ file: save-file.js ~ line 11 ~ saveFile ~ ${fileName} is saved.`)
    })
}