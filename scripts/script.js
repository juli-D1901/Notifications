const orderForm = document.querySelector("#orderForm");

const orderStatus = document.querySelector("#orderStatus");

const paidButton = document.querySelector("#paidButton");
const shippedButton = document.querySelector("#shippedButton");
const receivedButton = document.querySelector("#receivedButton");

const notificationContainer = document.querySelector(
    "#notificationContainer"
);

const artworks = {
    created: {
        image:
            "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
        artist: "Salvador Dalí",
        title: "The Persistence of Memory",
        year: "1931"
    },

paid: {
    image:
        "https://upload.wikimedia.org/wikipedia/commons/3/34/Edvard-Munch-The-Scream.jpg",
    artist: "Edvard Munch",
    title: "The Scream",
    year: "1893"
},

    shipped: {
        image:
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Picasso_Three_Musicians_MoMA_2024.jpg",
        artist: "Pablo Picasso",
        title: "Three Musicians",
        year: "1921"
    },
received: {
    cat: true,
    artist: "The Real Artist",
    title: "The Cat",
    year: "2026"
}
};

orderStatus.style.display = "none";

function Notification(title, text, type, artwork) {

    this.title = title;
    this.text = text;
    this.type = type;
    this.artwork = artwork;


    this.show = function () {

        const notification = document.createElement("div");

        notification.classList.add(
            "notification",
            `notification--${this.type}`
        );

        let typeText = "";

        if (this.type === "success") {
            typeText = "SUCCESS";
        }

        if (this.type === "warning") {
            typeText = "WARNING";
        }

        if (this.type === "error") {
            typeText = "ERROR";
        }

        notification.innerHTML = `
            <button
                class="notification__close"
                type="button"
                aria-label="Закрыть уведомление"
            >
                ×
            </button>

            <div class="notification__type">
                ${typeText}
            </div>

            <h2 class="notification__title">
                ${this.title}
            </h2>

            <p class="notification__text">
                ${this.text}
            </p>

            ${this.artwork.cat
    ? `<div class="notification__cat">🐈</div>`
    : `
        <img
            class="notification__image"
            src="${this.artwork.image}"
            alt="${this.artwork.title}"
        >
    `
}

            <div class="notification__artist">
                ${this.artwork.artist} · ${this.artwork.year}
            </div>
        `;

        notificationContainer.append(notification);

        const closeButton = notification.querySelector(
            ".notification__close"
        );


        closeButton.addEventListener("click", () => {

            hideNotification();

        });


        function hideNotification() {

            notification.classList.add(
                "notification--hide"
            );


            setTimeout(() => {

                notification.remove();

            }, 350);
        }

        setTimeout(() => {

            if (notification.isConnected) {

                hideNotification();

            }

        }, 6000);
    };
}


orderForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const notification = new Notification(

        "Заказ создан",

        "Ваш заказ успешно создан. Путешествие произведения начинается!",

        "success",

        artworks.created
    );

    notification.show();

    orderStatus.style.display = "block";


    setTimeout(() => {

        orderStatus.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 300);

});


paidButton.addEventListener("click", () => {

    const notification = new Notification(

        "Заказ оплачен",

        "Оплата прошла успешно. Произведение готовится к отправке.",

        "success",

        artworks.paid
    );


    notification.show();

});


shippedButton.addEventListener("click", () => {

    const notification = new Notification(

        "Заказ отправлен",

        "Шедевр покинул мастерскую и уже отправился к вам.",

        "warning",

        artworks.shipped
    );


    notification.show();

});

receivedButton.addEventListener("click", () => {

    const notification = new Notification(

        "Заказ получен",

        "Произведение прибыло! Теперь оно официально стало частью вашей истории.",

        "success",

        artworks.received
    );


    notification.show();

});