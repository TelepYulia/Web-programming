document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.getElementById("main-content");
  const btnCatalog = document.getElementById("btn-catalog");
  const linkHome = document.getElementById("link-home");

  let categoriesData = [];

  //"Додому" — повне оновлення сторінки
  linkHome.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.reload();
  });

  //"Каталог" — динамічне завантаження списку жанрів
  btnCatalog.addEventListener("click", () => {
    loadCatalog();
  });

  // Завантаження файлу categories.json
  async function loadCatalog() {
    try {
      const response = await fetch("data/categories.json");
      if (!response.ok) throw new Error("Не вдалося завантажити список категорій");

      categoriesData = await response.json();
      renderCatalog(categoriesData);
    } catch (error) {
      mainContent.innerHTML = `<div class="alert alert-danger">Помилка: ${error.message}</div>`;
    }
  }

  // Відображення категорій каталогів та секції "Specials"
  function renderCatalog(categories) {
    let html = `
      <h2 class="mb-4">Жанри книг</h2>
      <div class="row g-4">
    `;

    categories.forEach((cat) => {
      html += `
        <div class="col-md-4">
          <div class="card h-100 shadow-sm border-0">
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 class="card-title text-primary">${cat.name}</h5>
                <p class="card-text text-muted">${cat.notes}</p>
              </div>
              <button class="btn btn-outline-primary mt-3 category-btn" data-shortname="${cat.shortname}">
                Переглянути книги
              </button>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;

    // Секція Specials
    html += `
      <div class="mt-5 p-4 bg-white rounded-3 shadow-sm border text-center">
        <h4 class="fw-bold text-success"> Що почитати? (Specials)</h4>
        <p class="text-muted">Не знаєте, який жанр обрати? Натисніть кнопку та отримайте випадкову добірку!</p>
        <button id="btn-specials" class="btn btn-success btn-lg fw-bold">Мені пощастить!</button>
      </div>
    `;

    mainContent.innerHTML = html;

    //Обробники кліків по кнопках категорій
    document.querySelectorAll(".category-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const shortname = e.target.getAttribute("data-shortname");
        loadCategoryItems(shortname);
      });
    });

    //Обробник для Specials
    document.getElementById("btn-specials").addEventListener("click", () => {
      loadRandomCategory();
    });
  }

  //Завантаження книг вибраної категорії
  async function loadCategoryItems(shortname) {
    try {
      const response = await fetch(`data/${shortname}.json`);
      if (!response.ok) throw new Error("Не вдалося завантажити книги категорії");

      const data = await response.json();
      renderCategoryItems(data);
    } catch (error) {
      mainContent.innerHTML = `<div class="alert alert-danger">Помилка: ${error.message}</div>`;
    }
  }

  //Відображення списку книг у вигляді карток
  function renderCategoryItems(data) {
    let html = `
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Жанр: <span class="text-primary">${data.category_name}</span></h2>
        <button id="btn-back" class="btn btn-outline-secondary">← Назад до категорій</button>
      </div>
      <div class="row g-4">
    `;

    data.items.forEach((item) => {
      // Обкладинка книги 180x200 (до 200x200 відповідно до ТЗ)
      const imgUrl = `https://placehold.co/180x200/2c3e50/ffffff?text=${encodeURIComponent(item.name)}`;

      html += `
        <div class="col-md-3 col-sm-6">
          <div class="card h-100 shadow-sm text-center">
            <img src="${imgUrl}" class="card-img-top mx-auto mt-3 rounded" style="width: 150px; height: 180px; object-fit: cover;" alt="${item.name}">
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 class="card-title fs-6 fw-bold mt-2">${item.name}</h5>
                <p class="card-text small text-muted">${item.description}</p>
              </div>
              <div class="mt-3">
                <span class="badge bg-primary fs-6">${item.price} грн</span>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    mainContent.innerHTML = html;

    document.getElementById("btn-back").addEventListener("click", () => {
      loadCatalog();
    });
  }

  //Розрахунок та вибір випадкової категорії (Math.random())
  function loadRandomCategory() {
    if (!categoriesData || categoriesData.length === 0) return;

    const randomIndex = Math.floor(Math.random() * categoriesData.length);
    const randomCategory = categoriesData[randomIndex];

    loadCategoryItems(randomCategory.shortname);
  }
});
