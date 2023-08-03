const dataPanel = document.querySelector('#data-panel')
const highlightList = JSON.parse(localStorage.getItem('highlightList')) || []
let highlightListObj = {}

const controller = {
  generateMemo() {
    highlightListObj = model.ArrToObj(highlightList)
    view.renderDataPanel(highlightListObj)
  },
  deleteMemo(index) {
    model.deleteData(index)
    highlightListObj = model.ArrToObj(highlightList)
    view.renderDataPanel(highlightListObj)
  }
}

const view = {
  renderDataPanel(data) {
    const entries = Object.entries(data)
    let rawHTML = ''
    for (const [key, value] of entries) {
      rawHTML += `
        <div class="col">
          <div class="card border-light" style="min-height: 150px; background-color: #FDF6C0;" data-index="${key}">
            <div class="card-body">
              <p class="card-text" style="font-size: 20px;">${value}</p>
            </div>
            <div class="card-footer d-flex justify-content-end align-items-center p-3">
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
  deleteData(index) {
    highlightList.splice(index, 1)
    localStorage.setItem('highlightList', JSON.stringify(highlightList))
  }
}

dataPanel.addEventListener('click', function clickDataPanel(event) {
  if (event.target.classList.contains('delete')) {
    controller.deleteMemo(Number(event.target.dataset.index))
  }
})


controller.generateMemo()