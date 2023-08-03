const textForm = document.querySelector('#text-form')
const dataPanel = document.querySelector('#data-panel')
const memoList = JSON.parse(localStorage.getItem('memoList')) || []
const highlightList = JSON.parse(localStorage.getItem('highlightList')) || []
let memoListObj = {}

const controller = {
  generateMemo() {
    memoListObj = model.ArrToObj(memoList)
    view.renderDataPanel(memoListObj)
  },
  createMemo(data) {
    model.createData(data)
    memoListObj = model.ArrToObj(memoList)
    view.renderDataPanel(memoListObj)
  },
  deleteMemo(index) {
    model.deleteData(index)
    memoListObj = model.ArrToObj(memoList)
    view.renderDataPanel(memoListObj)
  },
  addMemo(index) {
    model.highlightData(index)
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
            <div class="card-footer d-flex justify-content-end align-items-center p-3">
              <button type="button" class="btn btn-warning btn-sm highlight me-2" data-index="${key}">Highlight</button>
              <button type="button" class="btn btn-danger btn-sm delete" data-index="${key}">Delete</button>
            </div>
          </div>
        </div>
      `
    }
    dataPanel.innerHTML = rawHTML
  },
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
    if (!data.length) {
      alert('Please enter something!')
      return
    }
    memoList.push(data)
    localStorage.setItem('memoList', JSON.stringify(memoList))
  },
  deleteData(index) {
    memoList.splice(index, 1)
    localStorage.setItem('memoList', JSON.stringify(memoList))
  },
  highlightData(index) {
    if (highlightList.includes(memoList[index])) {
      alert('The memo is already in highlight!')
    } else {
      highlightList.push(memoList[index])
    }
    localStorage.setItem('highlightList', JSON.stringify(highlightList))
  }
}

textForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const input = event.target[0]
  controller.createMemo(input.value)
  input.value = ''
})

dataPanel.addEventListener('click', function clickDataPanel(event) {
  if (event.target.classList.contains('delete')) {
    controller.deleteMemo(Number(event.target.dataset.index))
  } else if (event.target.classList.contains('highlight')) {
    controller.addMemo(Number(event.target.dataset.index))
  }
})

controller.generateMemo()