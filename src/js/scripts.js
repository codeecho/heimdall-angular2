function openTerminal(){
    $('#terminal').modal();
    $('#terminal .commandLine').focus();
    $('#terminal').draggable({
        cursor: 'move',
        handle: '.modal-header'
    });
    $('#terminal .modal-dialog>.modal-content>.modal-header').css('cursor', 'move');
}