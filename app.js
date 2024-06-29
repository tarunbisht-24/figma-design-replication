// Function to create and show the modal
function showModal() {
    // Check if modal already exists
    let modal = document.getElementById('demoModal');
    if (!modal) {
        // Create modal structure
        modal = document.createElement('div');
        modal.id = 'demoModal';
        modal.style.position = 'fixed';
        modal.style.left = '50%';
        modal.style.top = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.zIndex = '1000';
        modal.style.display = 'none'; // Initially hidden
        modal.style.backgroundColor = 'white'; // Example background
        document.body.appendChild(modal);

        // Close button
        const closeButton = document.createElement('img');
        closeButton.src = 'public/cross.svg';
        closeButton.style.cursor = 'pointer';
        closeButton.style.position = 'absolute';
        closeButton.style.right = '10px';
        closeButton.style.top = '10px';
        closeButton.onclick = function() {
            modal.style.display = 'none';
            location.reload();
        };
        modal.appendChild(closeButton);
    }

    // Fetch and display demo-form.html content
    fetch('demo-form.html')
        .then(response => response.text())
        .then(html => {
            modal.innerHTML += html; // Append HTML content
            // Update the src attribute of the icon-stroke-cross image and add click event to close the modal
            const crossIcon = modal.querySelector('.icon-stroke-cross');
            if (crossIcon) {
                crossIcon.src = 'public/cross.svg'; // Ensure the path is correct
                crossIcon.onclick = function() { // Add click event to close the modal
                    modal.style.display = 'none';
                    location.reload();
                };
            }
            modal.style.display = 'block'; // Show modal
        });

    // Optionally, fetch and apply demo-form.css styles
}

// Attach showModal function to the "Book a Free Demo" button click event
document.querySelector('.book-a-free').addEventListener('click', showModal);