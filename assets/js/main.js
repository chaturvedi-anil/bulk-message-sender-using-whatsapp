document.addEventListener("DOMContentLoaded", function () {
    const numberForm = document.getElementById("numberForm");

    numberForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Get the input value as a comma-separated string
        const inputField = document.getElementById("numbers");
        const message = document.getElementById('message').value;
        const inputString = inputField.value;

        // Split the input string into an array of numbers
        const numberArray = inputString.split(",").map((numStr) => parseFloat(numStr.trim()));

        // Create an object to send as a POST request
        const data = { numbers: numberArray , message: message};
        console.log(data);
        // Make a POST request to your server
        try {
            const response = await fetch("/send-message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Data sent successfully");
            } else {
                console.error("Failed to send data");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
});