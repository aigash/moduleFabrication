export function modalConfirm(resp) {
    let modalAlert = document.getElementById('modalAlert');
    let modalAlertContent = document.getElementById('modalAlertContent');

    let html = `<img class='w-16 h-16 mb-6' src='../../public/img/icons/validate.svg'>`;

    const showModalAndRedirect = (msg, fonction, delay) => {
        modalAlert.classList.remove('hidden');
        modalAlert.classList.add('flex');
        modalAlertContent.innerHTML = html + msg;
        setTimeout(() => {
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


export function setEventClickAddCuve() {
    let btns = [...document.getElementsByClassName('addCuve')];
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.parentElement.parentElement.parentElement.classList.remove('!bg-lblueBase'));
            let tr = btn.parentElement.parentElement.parentElement;
            let lfl = tr.dataset.id;
            let code = tr.querySelector('.code').innerHTML;
            let article = tr.querySelector('.article').innerHTML;
            let lot = tr.querySelector('.lot').innerHTML;
            let poin = tr.querySelector('.poin').innerHTML;

            tr.classList.add('!bg-lblueBase');
            this.activateAddCuve(lot, code, article, poin, lfl);
        });
    });
}