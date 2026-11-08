
const authSection = document.querySelector("#authSection");
const profileSection = document.querySelector("#profileSection");

const registerForm = document.querySelector("#registerForm");
const loginForm = document.querySelector("#loginForm");

const message = document.querySelector("#message");
const profile = document.querySelector("#profile");
const logoutButton = document.querySelector("#logoutButton");

const API_URL = "http://127.0.0.1:3000";

// РЕГИСТРАЦИЯ
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("#registerName").value;
    const email = document.querySelector("#registerEmail").value;
    const password = document.querySelector("#registerPassword").value;

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        message.textContent = data.message;

    } catch (error) {
        console.error(error);
        message.textContent = "Ошибка регистрации";
    }
});

// ВХОД
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#loginEmail").value;
    const password = document.querySelector("#loginPassword").value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            message.textContent = data.message;
            return;
        }

        message.textContent = data.message;

        // Получаем профиль после входа
        await showProfile();

    } catch (error) {
        console.error(error);
        message.textContent = "Ошибка входа";
    }
});

// ПОЛУЧЕНИЕ ПРОФИЛЯ
async function showProfile() {
    try {
        const response = await fetch(`${API_URL}/profile`, {
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            authSection.classList.remove("hidden");
            profileSection.classList.add("hidden");
            return;
        }

        const user = data.user;

        profile.innerHTML = `
            <p><strong>ID:</strong> ${user.id}</p>
            <p><strong>Имя:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
        `;

        authSection.classList.add("hidden");
        profileSection.classList.remove("hidden");

    } catch (error) {
        console.error(error);
        message.textContent = "Ошибка получения профиля";
    }
}

// ВЫХОД
logoutButton.addEventListener("click", async () => {
    try {
        const response = await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            message.textContent = data.message;
            return;
        }

        profileSection.classList.add("hidden");
        authSection.classList.remove("hidden");

        profile.innerHTML = "";
        message.textContent = data.message;

    } catch (error) {
        console.error(error);
        message.textContent = "Ошибка выхода";
    }
});

// ПРОВЕРКА АВТОРИЗАЦИИ ПРИ ЗАГРУЗКЕ
showProfile();
