import '../components/TableClassic.js';
import '../components/Btn.js';
import '../components/Input.js';
import '../components/InputDouble.js';
import '../components/Select.js';

import { modalConfirm } from '../utils/lib.js';

import { setDynamicSearch, displayDynamicSearch, hideDynamicSearch } from '../components/DynamicSearch.js';

import { Global } from '../models/globalModel.js';

export class HomePage extends HTMLElement {
    constructor() {
        super();
        this.globalModel = new Global();

        this.modalConfirm = modalConfirm.bind(this);

        this.setDynamicSearch = setDynamicSearch.bind(this);
        this.displayDynamicSearch = displayDynamicSearch.bind(this);
        this.hideDynamicSearch = hideDynamicSearch.bind(this);        
    }

    connectedCallback() {
        this.render();
        this.getStock();
        this.getAllCuves();
        this.getEnts();
        this.getArts();

        // Bouton de validation de remplissage de cuve
        document.getElementById('btnRemp').addEventListener('click', () => {
            let alertElt = document.getElementById('alertPoids');

            let cuve = document.getElementById('selectCuveRemp').value;
            let artCod = document.getElementById('inputArticleRemp1').value;
            let artLib = document.getElementById('inputArticleRemp2').value;
            let poin = document.getElementById('poidsRemp').value;
            let poinMax = document.getElementById('poidsRemp').getAttribute('max');
            let lot = document.getElementById('lotRemp').value;

            let lfl = document.getElementById('btnRemp').dataset.lfl;

            alertElt.innerHTML = '';

            if (parseFloat(poin) > parseFloat(poinMax)) {
                alertElt.innerHTML = 'Poids max saisissable : ' + poinMax;
                return;
            }

            this.updateCuveStock(lot, lfl, poin, cuve);
        });

        this.addEventListener('click', (e) => {
            this.hideDynamicSearch(e.target);
        });

        //Suppr Filtres
        document.getElementById('removeFiltre').addEventListener('click', () => {
            document.getElementById('entFiltre').value = '';
            document.getElementById('lotFiltre').value = '';
            document.getElementById('artFiltre1').value = '';
            document.getElementById('artFiltre2').value = '';

            this.getStock();
        });
    }

    async getStock() {
        try {
            this.stock = await this.globalModel.getStock();
            this.querySelector('[idname="stockTheorique"]').setAttribute('data', JSON.stringify(this.formatTableTheo()));

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
        } catch (error) {
            console.log(error);
        }
    }

    async getAllCuves() {
        try {
            this.cuves = await this.globalModel.getAllCuves();
            // html pour afficher les cuves en bas
            let html = '';
            let options = [];

            this.cuves.forEach(cuve => {
                html += `<sg-btn idname=${'cuve-' + cuve.cuve_cod} css='cuve hover:bg-lblueLight bg-white rounded-md border border-inherit px-3 h-9 text-black'>${cuve.cuve_lib}</sg-btn>`;
                options.push({ lib: cuve.cuve_lib, value: cuve.cuve_cod });
            });
            this.querySelector('[idname="selectCuveRemp"]').setAttribute('options', JSON.stringify(options));
            this.querySelector('#cuves').innerHTML = html;

            let cuvesElt = [...document.getElementsByClassName('cuve')];
            // Par défaut on met la premiere cuve en sélectionnée et on affiche son stock
            cuvesElt[0].classList.add('selected');
            this.getStockCuve(cuvesElt[0].id.split('-')[1]);

            cuvesElt.forEach(elt => {
                let cuve_cod = elt.id.split('-')[1];
                elt.addEventListener('click', () => {
                    cuvesElt.forEach(item => item.classList.remove('selected'));
                    elt.classList.add('selected');
                    this.getStockCuve(cuve_cod);
                });
            });

            //console.log(cuvesElt);
        } catch (error) {
            console.log(error);
        }
    }

    async getStockCuve(cuve_cod) {
        try {
            this.stockCuve = await this.globalModel.getCuveStock(cuve_cod);
            //console.log(this.stockCuve);
            this.querySelector('[idname="stockCuve"]').setAttribute('data', JSON.stringify(this.formatTableCuve()));
        } catch (error) {
            console.log(error);
        }
    }

    async getEnts() {
        this.entrepots = await this.globalModel.getEnt();

        this.querySelector('#dynamicEntSearch').setAttribute('data', JSON.stringify(this.entrepots));

        document.getElementById('entFiltre').addEventListener('input', (e) => {
            this.setDynamicSearch(e.target);
        });
        document.getElementById('entFiltre').addEventListener('click', (e) => {
            this.displayDynamicSearch(e.target);
        });
    }

    async getArts() {
        this.articles = await this.globalModel.getArt();

        this.querySelector('#dynamicArtSearch').setAttribute('data', JSON.stringify(this.articles));

        document.getElementById('artFiltre1').addEventListener('input', (e) => {
            this.setDynamicSearch(e.target);
        });
        document.getElementById('artFiltre1').addEventListener('click', (e) => {
            console.log(e.target);
            this.displayDynamicSearch(e.target);
        });
    }

    formatTableTheo() {
        let button = document.createElement('sg-btn');
        button.setAttribute('css', 'bg-dblueBase text-white rounded flex items-center addCuve');
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>';

        return {
            thead: [
                { lib: 'Ent' },
                { lib: 'Code', css: 'number' },
                { lib: 'Article' },
                { lib: 'Lot', css: 'number' },
                { lib: 'Stock en kg', css: 'number' },
                { lib: 'Actions' },
            ],
            tbody: 
                this.stock && this.stock.map((stock) => ({
                    id: stock.lfl_lig,
                    trData: [
                        { tdData: stock.ent_cod, css: 'ent', type: '' },
                        { tdData: stock.art_cod, css: 'code text-right', type: '' },
                        { tdData: stock.art_lib, css: 'article', type: '' },                        
                        { tdData: stock.lot_cod, css: 'lot text-right', type: ''},
                        { tdData: stock.poin, css: 'poin text-right', type: '' },
                        { tdData: button.outerHTML, css: '', type: 'button' },
                    ]
                }))
        }
    }

    formatTableCuve() {
        return {
            thead: [
                { lib: 'Lot'},
                { lib: 'Article'},
                { lib: 'Stock en kg', css: 'number'}
            ],
            tbody:
                this.stockCuve && this.stockCuve.map(stock => ({
                    id: stock.lfl_lig,
                    trData: [
                        { tdData: stock.lot_cod, css: '', type: '' },
                        { tdData: stock.art_lib, css: '', type: '' },
                        { tdData: stock.poin, css: 'number', type: '' },
                    ]
                }))
        }
    }

    activateAddCuve(lot, code, article, poin, lfl) {
        //console.log(code, article, lot);
        let selectElt = document.getElementById('selectCuveRemp');
        let lotElt = document.getElementById('lotRemp');
        let inputElt1 = document.getElementById('inputArticleRemp1');
        let inputElt2 = document.getElementById('inputArticleRemp2');
        let poidsElt = document.getElementById('poidsRemp');

        document.getElementById('btnRemp').setAttribute('data-lfl', lfl);

        selectElt.classList.remove('disabled');
        poidsElt.classList.remove('disabled');

        lotElt.value = lot;
        inputElt1.value = code;
        inputElt2.value = article;
        poidsElt.setAttribute('max', poin);
    }

    async updateCuveStock(lot, lfl, poin, cuve) {
        try {
            this.stockCuve = await this.globalModel.updateCuveStock(lot, lfl, poin, cuve);
            // On met ent_cod mais en réalité, il s'agit du code de la cuve 
            //this.getStockCuve(this.stockCuve.dsStock.dsStock.ttStock.ent_cod);
            console.log(this.stockCuve);
            console.log(this.stockCuve.cOutput);

            if (this.stockCuve.cOutput == "ok") {
                let data = {
                    msg: `L'article ${this.stockCuve.dsStock.dsStock.ttStock.art_lib} a bien été ajouté à la cuve ${cuve}`,
                    fonction: 'addCuve'
                }

                this.modalConfirm(data);
            } else {
                $.alert({
                    title: 'Attention !',
                    content: "L'article à mettre en cuve doit être différent de celui déjà présent.",
                    useBootstrap: false,
                    boxWidth: '30%'
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        this.innerHTML = `
            <main id='main' role='main' class='h-full flex flex-col'>
                <div class='entete bg-white rounded-lg p-3.5 flex gap-3 items-end mb-3'>
                    <div class='flex relative'>
                        <sg-input idname='entFiltre' label='Entrepôt' input='text' inputCss='w-full' attr='{"lib":"data-search-element", "value":"dynamicEntSearch"}'></sg-input>
                        <sg-dynamic-search id="dynamicEntSearch" css="sg-dynamic-search" class="dynamic-search" data="" parentInputId="entFiltre" parentInputValue=""></sg-dynamic-search>
                    </div>

                    <sg-input idname='lotFiltre' label='Lot' input='text' inputCss='w-24'></sg-input>

                    <div class='flex relative'>
                        <sg-input-double idname='artFiltre' label='Article' input='text' input2='text' inputCss='w-24' inputCss2='w-96' attr='{"lib":"data-search-element", "value":"dynamicArtSearch"}'></sg-input-double>
                        <sg-dynamic-search id='dynamicArtSearch' css='sg-dynamic-search' class='dynamic-search' double=1 data='' parentInputId='artFiltre1' parentInputValue=""></sg-dynamic-search>
                    </div>

                    <sg-btn idname='removeFiltre' css='h-9 border border-dblueBase rounded w-20 flex justify-center items-center'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0b489d" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></sg-btn>
                </div>

                <div class='overflow-y-scroll grow flex flex-col'>
                    <sg-table idname="stockTheorique" css="table sgTableColor" title="Stock Théorique" class='bg-white h-full rounded-t-2xl'></sg-table>
                </div>

                <div class='p-3.5 bg-white rounded-b-lg border-t border-t-dblueBase mb-3'>
                    <div class='flex justify-between'>
                        <div class='flex gap-3 items-end'>
                            <sg-select idname='selectCuveRemp' label='Choix de cuve' selectCss='w-32 disabled'></sg-select>
                            <sg-input idname='lotRemp' label='N° de lot' input='text' inputCss='w-24 disabled'></sg-input>
                            <sg-input-double idname='inputArticleRemp' label='Article' input='text' input2='text' inputCss='w-24 disabled' inputCss2='w-96 disabled'></sg-input-double>
                            <sg-input idname='poidsRemp' label='Poids' input='number' inputCss='w-32 disabled'></sg-input>
                            <p id='alertPoids' class='text-red-500 font-semibold'></p>
                        </div>
                        <div class='flex items-end'>
                            <sg-btn idname='btnRemp' css='bg-lblueBase text-white h-9 rounded w-24'>Valider</sg-btn>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg p-3.5">
                    <div class='flex justify-between mb-3.5'>
                        <div>
                            <div id='cuves' class="flex gap-3">
                                
                            </div>
                        </div>
                        <div class='flex items-end'>
                            <sg-btn idname='cuveFinie' css='h-9 bg-dblueBase w-24 rounded text-white'>Cuve finie</sg-btn>
                        </div>
                    </div>
                    <div>
                        <sg-table idname="stockCuve" css="table sgTableBorder" title="Stock Cuve"></sg-table>
                    </div>
                </div>
            </main>
        `;
    }
}
customElements.define('home-page', HomePage);