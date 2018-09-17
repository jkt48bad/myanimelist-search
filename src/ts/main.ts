$('document').ready(() => {
    $('#advanced-options').hide();

    // toggles advanced options menu display
    $('#advanced-button').on('click', () => {
        $('#advanced-options').slideToggle({
            duration: 200,
            easing: 'swing',
        });
    });
});
