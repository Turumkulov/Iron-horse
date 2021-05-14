const API = "http://localhost:8000/country";

editedId = null;
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
            $(".cars-block").html("");
            countryData.forEach((item) => {
                $(".cars-block").append(`
                <div class="card">
                <h5 class="country-h">${item.country}</h5>
                <div class="country">
                    <img class="add-img" src="${item.image}" alt="...">
                    <p class="text">${item.description}...</p>
                    </div>
                    </div>
                    <div style="display:none;margin" class="modal">
                    <button id=${item.id} class="delete">удалить</button>
                    <button id=${item.id} class="edit">Редактировать</button>
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
$("body").on("click", ".edit", function () {
    $(".modal.window").css("display", "block");
});
$("body").on("click", ".modal-save", function () {
    let country = {
        country: $(".modal-title").val(),
        image: $(".modal-url").val(),
        description: $(".modal-description"),
    };
    fetch(`${API}/${country}/`, {
        method: "PUT",
        body: JSON.stringify(country),
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        }.then(() => {
            renderCountry();
            $(".modal-window").css("display", "none");
        }),
    });
});
