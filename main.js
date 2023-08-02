const textForm = document.querySelector('#text-form')
const dataPanel = document.querySelector('#data-panel')
const memoList = JSON.parse(localStorage.getItem('memoList')) || []

const controller = {
  createMemo(data) {
    model.createData(data)
    view.renderDataPanel(data)
  }
}

const view = {
  renderDataPanel(data) {
    dataPanel.innerHTML += `
      <div class="col">
        <div class="card border-warning" style="min-height: 150px;">
          <div class="card-body">
            <p class="card-text">${data}</p>
            <div>
              <i class="fa-solid fa-pen me-2"></i>
              <i class="fa-solid fa-bolt fa-lg me-2" style="color: #510ecd;"></i>
              <i class="fa-solid fa-xmark fa-xl" style="color: #ff0000;"></i>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

const model = {
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