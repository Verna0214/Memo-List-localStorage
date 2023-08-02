const textForm = document.querySelector('#text-form')
const dataPanel = document.querySelector('#data-panel')
const memoList = JSON.parse(localStorage.getItem('memoList')) || []
let memoListObj = {}

const controller = {
  generateMemo() {
    memoListObj = model.ArrToObj(memoList)
    view.renderDataPanel(memoListObj)
  },
  createMemo(data) {
    model.createData(data)
    view.renderNewMemo(data)
  }
}

const view = {
  renderDataPanel(data) {
    const entries = Object.entries(data)
    let rawHTML = ''
    for(const [key, value] of entries) {
      rawHTML += `
        <div class="col">
          <div class="card border-warning" style="min-height: 150px;" data-index="${key}">
            <div class="card-body">
              <p class="card-text">${value}</p>
            </div>
            <div class="card-footer d-flex justify-content-end align-items-center">
              <i class="fa-solid fa-pen me-2"></i>
              <i class="fa-solid fa-bolt fa-lg me-2" style="color: #510ecd;"></i>
              <i class="fa-solid fa-xmark fa-xl" style="color: #ff0000;"></i>
            </div>
          </div>
        </div>
      `
    }
    dataPanel.innerHTML = rawHTML
  },
  renderNewMemo(data) {
    const index = memoList.indexOf(data)
    dataPanel.innerHTML += `
      <div class="col">
        <div class="card border-warning" style="min-height: 150px;" data-index="${index}">
          <div class="card-body">
            <p class="card-text">${data}</p>
          </div>
          <div class="card-footer d-flex justify-content-end align-items-center">
            <i class="fa-solid fa-pen me-2"></i>
            <i class="fa-solid fa-bolt fa-lg me-2" style="color: #510ecd;"></i>
            <i class="fa-solid fa-xmark fa-xl" style="color: #ff0000;"></i>
          </div>
        </div>
      </div>
    `
  }
}

const model = {
  ArrToObj(arr) {
    const resultObj = arr.reduce((obj, currentValue, index) => {
      obj[index] = currentValue
      return obj
    }, {})
    return resultObj
  },
  createData(data) {
    memoList.push(data)
    localStorage.setItem('memoList', JSON.stringify(memoList))
  }
}

textForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const input = event.target[0]
  controller.createMemo(input.value)
  input.value = ''
})

dataPanel.addEventListener('click', function clickDataPanel(event) {
  if (event.target.tagName('I')) {
    console.log(event.target)
  }
})

controller.generateMemo()
console.log(dataPanel)