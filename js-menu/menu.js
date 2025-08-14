$(document).ready(function() {
    // Manejo de clicks en los enlaces del menú
    $(document).on('click', '.menu-link-js', function(e) {
        e.preventDefault();
        var $self = $(this);
        $('.menu-link-js').removeClass('color-primary');
        $self.addClass('color-primary');
        var target = $(this).attr('href');
        $('.menu-tab-js:not(.menu-tab-static)').hide();
        $(target).fadeIn();
    });

    // Carga datos de Google Sheets
    fetch('https://sheetdb.io/api/v1/9c1zjw7nci6sj')
        .then(response => response.json())
        .then(data => {
            // Agrupar items por categoría (menu)
            const groupedData = {};
            data.forEach(item => {
                if (!groupedData[item.menu]) {
                    groupedData[item.menu] = [];
                }
                groupedData[item.menu].push(item);
            });

            // Para cada categoría, agrega los items al <ul> correspondiente
            for (const [category, items] of Object.entries(groupedData)) {
                // Busca el <ul> dentro del div con id igual a la categoría
                const menuTab = document.getElementById(category);
                if (!menuTab) continue; // Si no existe, salta

                const ul = menuTab.querySelector('ul.menu-list');
                if (!ul) continue;

                items.forEach(item => {
                    const li = document.createElement('li');
                    li.className = 'menu-list-item';
                    li.innerHTML = `
                    <h4 class="menu-list-item__title">${item.title}</h4>
                    <div class="content">
                        <span class="menu-list-item__desc">${item.desc || ''}</span>
                        <span class="menu-list-item__dots"></span>
                        <span class="menu-list-item__price">${item.price ? item.price + ' CUP' : ''}</span>
                    </div>
                `;
                    ul.appendChild(li);
                });
            }
        })
        .catch(error => console.error("Error:", error));
});