const form = document.getElementById("form");
const input = document.getElementById("input");
const sect_card = document.getElementById("card");
const trash = document.getElementsByClassName("trash_img");
const erreur = document.getElementById("erreur_message");

form.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${import.meta.env.VITE_APIKEY}&units=metric`)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);

            if (res.cod !== 200) {
                erreur.innerText = res.message + "";
                setTimeout(() => {
                    erreur.innerText = "";
                }, 1000 * 3);
            } else {
                if (document.getElementById(res.name)) {
                    erreur.innerText = " la ville est deja selectionnee";
                    setTimeout(() => {
                        erreur.innerText = "";
                    }, 1000 * 3);
                } else {
                    sect_card.innerHTML += `<div id="${res.name}" class="city_card">
                                            <img class="trash_img" src="/img/trashcan-icon-carbage-can-symbol-flat-shape-delete-sign-trash-container-recycling-bin-logo-vector-illustration-image-isol-196482046.jpg" alt="trash">
                                            <p class="p_city_name">${res.name}<span class="sys_country">${res.sys.country}</span>
                                            <p class="temperature">${parseInt(res.main.temp)}<span>°C</span></p>
                                            <img class="img_card" src="https://openweathermap.org/img/wn/${res.weather[0].icon}@4x.png" alt="image_meteo">
                                            <p class="description">${res.weather[0].description}</p>
                                            </div>`
                    for (let i = 0; i < trash.length; i++) {
                        let elem = trash[i];
                        elem.addEventListener("click", (ev) => {
                            ev.currentTarget.parentElement.remove()
                        })
                    }
                }
            }
        });
})