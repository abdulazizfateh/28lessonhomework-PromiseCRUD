// const x = (callback) => {
//     let data;
//     setTimeout(() => {
//         data = 'Odilaka';
//         callback(data);
//     }, 1000);
// };
// x((data) => {
//     console.log(data);
// });


// const promise = new Promise((resolve, reject) => {
//     let data;
//     setTimeout(() => {
//         data = "Odil";
//         resolve(data);
//     }, 1000);
// });
// console.log(promise);

// promise.then((data) => {
//    return data += " Aka";
// }).then((data) => {
//     console.log(data);
// }).catch((error) => {
//     console.log(error);
// });




// Fetch serverlarga so'rov yuboradi, va o'zidan promise qaytaradi ushbu fetch funksiyasiga 2 ta argument beriladi. 
// 1) Backend manzilini string ko'rinishida beramiz
// 2) uning optionlari 
// Faqat 1 ta argument berilsa, ya'ni faqatgina Backend manzili berilsa u GET methodi bo'ladi. Ya'ni berilgan manzildan
//  ma'lumotni olib keladi

const wrapper = document.querySelector(".wrapper");
const errorWrapper = document.querySelector(".error-wrapper");
const form = document.querySelector(".form");
const inputs = document.querySelectorAll(".inputs");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let obj = {}
    for (let i of inputs) {
        obj[i.name] = i.value;
        i.value = "";
    }
    console.log(obj)
    fetch("http://localhost:3600/todos", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(obj)
    }).then((response) => {
        console.log(response);
        return response.json();
    }).then((backendData) => {
        console.log(backendData);
    })
    getData();
})

const render = (backendData) => {
    console.log(backendData);
    wrapper.innerHTML = backendData.map((item) =>
        `<h1>${item.title}</h1> 
        <h3>${item.description}</h3>
        <button data-id="${item.id}" >Delete</button>
        `
    );
};

const renderError = (error) => {
    errorWrapper.innerHTML = `
    <div class="error-message">
    <h1>OOOPS, Something went wrong</h1>
    <p>${error}</p>
    </div>
    `;
};



wrapper.addEventListener("click", (event) => {
    const deleteBtnId = event.target.dataset.id;
    if (deleteBtnId) {
        fetch(`http://localhost:3600/todos/${deleteBtnId}`,
            { method: "DELETE" })
            .then((response) => {
                console.log(response)
                return response.json();
            }).then((backendData) => {
                console.log(backendData);
                getData(backendData);
            });
    }
});


const getData = () => {
    const data = fetch("http://localhost:3600/todos").then((response) => {
        return response.json();
    }).then((backendData) => {
        render(backendData); // backendData = to'liq backenddan ma'lumot yechildi
    }).catch((error) => {
        console.log(error)
        renderError(error);
    })
};
getData();

