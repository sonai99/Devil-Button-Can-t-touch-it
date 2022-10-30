const evilButton = document.getElementById('evil-button')
// Whenever our mouse gets in 100 pixels of our button we want our button to move
const OFFSET = 100
// If you touch it itll close the window 
evilButton.addEventListener('click', () => {
    alert('nice try hehe')
    window.close()
})

// Move the button if we move it take our cursor too close to it 
document.addEventListener('mousemove', (e) => {
    const x = e.pageX
    const y = e.pageY
    
    // Gives us position of the button 
    const buttonBox = evilButton.getBoundingClientRect() 

    // Distance of mouse from the center of our button
    const horizontalDistanceFrom = distanceFromCenter(buttonBox.x, x, buttonBox.width)
    const verticalDistanceFrom = distanceFromCenter(buttonBox.y, y, buttonBox.height)
    
    // Get the offset
    const horizontalOffset = buttonBox.width / 2 + OFFSET
    const verticalOffset = buttonBox.height / 2 + OFFSET

    //Check if already close enough to our button
    if ( Math.abs(horizontalDistanceFrom) <= horizontalOffset && Math.abs(verticalDistanceFrom) <= verticalOffset ){
        setButtonPosition(
            // As we get closer the offset is going to increase and multiply
            buttonBox.x + horizontalOffset / horizontalDistanceFrom * 10,
            buttonBox.y + verticalOffset / verticalDistanceFrom * 10
        )
    }
})

function setButtonPosition(left, top){
    const windowBox = document.body.getBoundingClientRect()
    const buttonBox = evilButton.getBoundingClientRect() 

    //Check if our button is overlapping the edge of our window
    if(distanceFromCenter(left, windowBox.left, buttonBox.width) < 0 ){
        left = windowBox.right - buttonBox.width - OFFSET
    }
    if(distanceFromCenter(left, windowBox.right,buttonBox.width) > 0){
        left = windowBox.left - OFFSET
    }
    if(distanceFromCenter(top, windowBox.top,buttonBox.height) < 0){
        top = windowBox.bottom - buttonBox.height - OFFSET
    }
    if(distanceFromCenter(top, windowBox.bottom,buttonBox.height) > 0){
        top = windowBox.top + OFFSET
    }


    // Set the button position
    evilButton.style.left = `${left}px`
    evilButton.style.top = `${top}px`
}

//Get the position of the mouse from the center of our button
function distanceFromCenter(boxPosition, mousePosition, boxSize) {
    return boxPosition - mousePosition + boxSize / 2
}