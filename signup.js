const isNameValid = (name) =>
{
    if (name === null || name === "" || typeof name !== "string")
        return false;

    var regex = /^[a-zA-Z\-\ ]{1,40}$/;
    return regex.test(name);
}

const isEmailValid = (email) =>
{
    if (email === null || email === "" || typeof email !== "string")
        return false;

    var regex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    return regex.test(email);
}

const isInputValid = (name, email) =>
{
    if (!isNameValid(name))
    {
        document.getElementById("status-txt").setAttribute("class", "error");
        document.getElementById("status-txt").innerHTML = "The name you've entered is invalid!";
    }
    else
    {
        if (!isEmailValid(email))
        {
            document.getElementById("status-txt").setAttribute("class", "error");
            document.getElementById("status-txt").innerHTML = "The email you've entered is invalid!";
        }
        else
        {
            return true;
        }
    }

    return false;
}

const sendInputData = (name, email) =>
{
    
}

window.onload = () =>
{
    document.getElementById("signup-btn").addEventListener("click", (e) =>
    {
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;

        if (isInputValid(name, email))
        {
            const url = "http://mudfoot.doc.stu.mmu.ac.uk/node/api/mailinglist";
            const data = 
            {
                "name": name,
                "email": email
            };

            fetch(url, {
                method: "post",
                headers: 
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then((response) => {
                if (response.status === 200)
                {
                    return response.json();
                }
                else if (response.status === 400)
                {
                    throw "Bad input data was sent to the server";
                }
                else if (response.status === 500)
                {
                    throw "An error occurred from the server side";
                }
                else
                {
                    throw "An unexpected error occurred";
                }
            })
            .then((responseJSON) => {
                document.getElementById("status-txt").setAttribute("class", "success");
                document.getElementById("status-txt").innerHTML = responseJSON["message"];
            })
            .catch((error) => {
                document.getElementById("status-txt").setAttribute("class", "error");
                document.getElementById("status-txt").innerHTML = error;
            });
        }
    });
}