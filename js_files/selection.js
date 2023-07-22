async function selection() {
  console.log('In selection()')
  const ele = document.querySelectorAll('.bar')
  for (let i = 0; i < ele.length; i++) {
    if (isSortingPaused) {
      await new Promise((resolve) => {
        const intervalId = setInterval(() => {
          if (!isSortingPaused) {
            clearInterval(intervalId)
            resolve()
          }
        }, 100)
      })
    }
    console.log('In ith loop')
    let min_index = i
    ele[i].style.background = 'blue'
    for (let j = i + 1; j < ele.length; j++) {
      console.log('In jth loop')
      ele[j].style.background = 'red'
      await waitforme(delay)
      if (
        parseInt(ele[j].style.height) < parseInt(ele[min_index].style.height)
      ) {
        console.log('In if condition height comparison')
        if (min_index !== i) {
          ele[min_index].style.background = 'cyan'
        }
        min_index = j
      } else {
        ele[j].style.background = 'cyan'
      }
    }
    await waitforme(delay)
    swap(ele[min_index], ele[i])
    ele[min_index].style.background = 'cyan'
    ele[i].style.background = 'green'
  }
}

const selectionSortbtn = document.querySelector('.selectionSort')
selectionSortbtn.addEventListener('click', async function () {
  isSortingPaused = false // Ensure sorting is not paused at the beginning
  disableSortingBtn()
  disableSizeSlider()
  disableNewArrayBtn()
  await selection()
  enableSortingBtn()
  enableSizeSlider()
  enableNewArrayBtn()
})
