
/* util.js */

export function file2DataURI(file) {
  return new Promise((resolve, _reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(file)
  })
}
