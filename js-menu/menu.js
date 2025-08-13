$(document).on('click', '.menu-link-js', function(e) {
    e.preventDefault();

    var $self = $(this);
    $('.menu-link-js').removeClass('color-primary');
    $self.addClass('color-primary');
    var target = $(this).attr('href');

    $('.menu-tab-js').hide();
    $(target).fadeIn();
});