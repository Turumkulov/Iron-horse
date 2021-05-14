const API = "http://localhost:8000/cars-usa";

renderCountry();

$(".create").on("click", function () {
    let newCountry = {
        country: $("#country").val(),
        image: $("#url").val(),
        description: $("#description").val(),
    };
    fetch(API, {
        method: "POST",
        body: JSON.stringify(newCountry),
        headers: {
            "Content-Type": "application/json",
        },
    }).then(() => renderCountry());
});

function renderCountry() {
    fetch(API)
        .then((res) => res.json())
        .then((countryData) => {
            $(".add-cars").html("");
            countryData.forEach((item) => {
                $(".add-cars").append(`
                <div class="card">
                <h5 class="country-h">${item.country}</h5>
                <div class="country">
                    <img class="add-img" src="${item.image}" alt="...">
                    <p class="text">${item.description}...</p>
                    </div>
                    </div>
                    <div style="display:none;margin" class="modal">
                    <button id=${item.id} class="delete">удалить</button>
                    <button class="edit">Редактировать</button>
                    </div>
                `);
            });
        });
}
$("body").on("click", ".add-img", function () {
    $(".modal").css("display", "block");
});

$("body").on("click", ".delete", function (e) {
    let id = e.target.id;
    fetch(`${API}/${id}/`, {
        method: "DELETE",
    }).then((countryData) => renderCountry());
});
