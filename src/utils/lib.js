export function modalConfirm(resp) {
    let modalAlert = document.getElementById('modalAlert');
    let modalAlertContent = document.getElementById('modalAlertContent');

    let html = `<img class='w-16 h-16 mb-3' src='../../pblic/img/icons/validate.svg'>`;

    const showModalAndRedirect = (msg, fonction, delay) => {
        modalAlert.classList.remove('hidden');
        modalAlert.classList.add('flex');
        modalAlertContent.innerHTML = html + msg;
        setTimeout(() => {
            modalAlert.classList.remove('flex');
            modalAlert.classList.add('hidden');
            if (fonction) {
                setTimeout(() => {
                    if (fonction == 'addCuve') {
                        this.getStock();
                        let cuve = document.getElementById('selectCuveRemp').value;
                        this.getStockCuve(cuve);
                    } else if (fonction == 'finCuves') {
                        
                    }
                }, 300);
            }
        }, delay);
    };

    switch(resp.fonction) {
        case 'addCuve':
            showModalAndRedirect(resp.msg, 'addCuve', 2000);
            break;

        case 'finCuves':
            showModalAndRedirect(resp.msg, 'finCuves', 2000);
            break;
    }
}