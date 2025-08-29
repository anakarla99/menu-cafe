$(document).ready(function() {
    // Manejo de clicks en los enlaces del menú
    //$(document).on('click', '.menu-link-js', function(e) {
    //    e.preventDefault();
    //    var $self = $(this);
    //    $('.menu-link-js').removeClass('color-primary');
    //    $self.addClass('color-primary');
    //    var target = $(this).attr('href');
    //    $('.menu-tab-js:not(.menu-tab-static)').hide();
    //    $(target).fadeIn();
    //});

    window.groupedData = {};

    // Carga datos de Google Sheets
    fetch('https://sheet2api.com/v1/0jFw5uLYRFqW/menu-cafe-enlace-db')
        .then(response => response.json())
        .then(data => {

            groupedData = {};
            data.forEach(item => {
                if (!groupedData[item.menu]) {
                    groupedData[item.menu] = [];
                }
                groupedData[item.menu].push(item);
            });

            //const menuNames = [...new Set(data.map(item => item.menu))];

            const $menuNav = $('.menu-nav');
            //const $menuSection = $('.menu');
            $menuNav.empty();
            Object.keys(groupedData).forEach((menu, idx) => {
                $menuNav.append(
                    `<li><a href="#${menu}" class="menu-nav__link menu-link-js" data-menu="${menu}">${menu}</a></li>`
                );
                //$menuSection.append(
                //    `<div class="menu-tab menu-tab-js" id="${menuId}">
                //    <div><ul class="menu-list"></ul></div>
                //    </div>`
                //);
            });

            if (Object.keys(groupedData).length > 0) {
                showMenu(Object.keys(groupedData)[0]);
                $('.menu-nav__link').first().addClass('color-primary');
            }
        })
        .catch(error => console.error("Error:", error));

    $(document).on('click', '.menu-link-js', function(e) {
        e.preventDefault();
        $('.menu-link-js').removeClass('color-primary');
        $(this).addClass('color-primary');
        const menu = $(this).data('menu');
        showMenu(menu);
    });

    function showMenu(menu) {
        $('.menu-title').text(menu);
        const items = groupedData[menu] || [];
        const $menuItems = $('.menu-items');
        $menuItems.empty();
        items.forEach(item => {
            $menuItems.append(`
                <div class="menu-list-item">
                    <h4 class="menu-list-item__title">${item.title}</h4>
                    <div class="content">
                        <span class="menu-list-item__desc">${item.desc || ''}</span>
                        <span class="menu-list-item__dots"></span>
                        <span class="menu-list-item__price">${item.price ? item.price + ' CUP' : ''}</span>
                    </div>
                </div>
            `);
        });
    }

    // Botón hamburguesa para abrir/cerrar menú lateral en móvil
    $('.menu-toggle').on('click', function() {
        $('.menu-sidebar').toggleClass('open');
    });
    // Opcional: cerrar el menú al hacer clic fuera en móvil
    $(document).on('click', function(e) {
        if (
            $('.menu-sidebar').hasClass('open') &&
            !$(e.target).closest('.menu-sidebar, .menu-toggle').length
        ) {
            $('.menu-sidebar').removeClass('open');
        }
    });
    // === NUEVO CÓDIGO ===
    // Exponer los datos para que el script de impresión pueda acceder a ellos
    window.getMenuDataForPrint = function() {
        return groupedData;
    };
    
    // Notificar que los datos están cargados
    window.menuDataLoaded = true;
    // ====================
});
