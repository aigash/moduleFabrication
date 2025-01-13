import '../components/TableClassic.js';
import '../components/Btn.js';
import '../components/Input.js';
import '../components/InputDouble.js';
import '../components/Select.js';

import { Global } from '../models/globalModel.js';

export class HomePage extends HTMLElement {
    constructor() {
        super();
        this.globalModel = new Global();
    }

    connectedCallback() {
        this.render();

        this.getStock();
        this.getAllCuves();
    }

    async getStock() {
        try {
            this.stock = await this.globalModel.getStock();
            this.querySelector('[idname="stockTheorique"]').setAttribute('data', JSON.stringify(this.formatTableTheo()));
        } catch (error) {
            console.log(error);
        }
    }

    async getAllCuves() {
        try {
            this.cuves = await this.globalModel.getAllCuves();
            let html = '';
            this.cuves.forEach(cuve => {
                html += `<sg-btn idname=${'cuve-' + cuve.cuve_cod} css='cuve hover:bg-lblueLight bg-white rounded-md border border-inherit px-3 h-9 text-black'>${cuve.cuve_lib}</sg-btn>`;
            });
            //console.log(this.cuves);
            this.querySelector('#cuves').innerHTML = html;

            //let cuvesElt = this.querySelectorAll('.cuve');
            let cuvesElt = [...document.getElementsByClassName('cuve')];
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

    formatTableTheo() {
        let button = document.createElement('sg-btn');
        button.setAttribute('css', 'bg-dblueBase text-white rounded flex items-center addCuve');
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>';

        return {
            thead: [
                { lib: 'Ent'},
                { lib: 'Article'},
                { lib: 'Lot'},
                { lib: 'Stock en kg', css: 'number'},
                { lib: 'Actions'},
            ],
            tbody: 
                this.stock && this.stock.map((stock) => ({
                    id: stock.id,
                    trData: [
                        { tdData: stock.ent_cod, css: '', type: '' },
                        { tdData: stock.art_lib, css: '', type: '' },
                        { tdData: stock.lot_cod, css: 'text-right', type: ''},
                        { tdData: stock.poin, css: 'text-right', type: '' },
                        { tdData: button.outerHTML, css: '', type: 'button' },
                    ]
                }))
        }
    }

    formatTableCuve() {
        console.log(this.stockCuve);

        return {
            thead: [
                { lib: 'Lot'},
                { lib: 'Article'},
                { lib: 'Stock en kg', css: 'number'}
            ],
            tbody:
                this.stockCuve && this.stockCuve.map(stock => ({
                    id: stock.lot_cod,
                    trData: [
                        { tdData: stock.lot_cod, css: '', type: '' },
                        { tdData: stock.art_lib, css: '', type: '' },
                        { tdData: stock.poin, css: 'number', type: '' },
                    ]
                }))
        }
    }

    displayAllCuves() {
        
    }



    render() {
        this.innerHTML = `
            <main id='main' role='main' class='h-full flex flex-col'>
                <div class='entete bg-white rounded-lg p-3.5 flex gap-3 items-end mb-3'>
                    <sg-input idname='entFiltre' label='Entrepôt' input='text' inputCss='w-full'></sg-input>
                    <sg-input-double idname='artFiltre' label='Article' input='text' input2='text' inputCss='w-24' inputCss2='w-96'></sg-input-double>
                    <sg-btn idname='removeFiltre' css='h-9 border border-dblueBase rounded w-20 flex justify-center items-center'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0b489d" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></sg-btn>
                </div>

                <div class='overflow-y-scroll grow flex flex-col'>
                    <sg-table idname="stockTheorique" css="table sgTableColor" title="Stock Théorique" class='bg-white h-full rounded-t-2xl'></sg-table>
                </div>

                <div class='p-3.5 bg-white rounded-b-lg border-t border-t-dblueBase mb-3'>
                    <div class='flex justify-between'>
                        <div class='flex gap-3 items-center'>
                            <sg-select idname='selectCuveRemp' label='Choix de cuve' selectCss='w-32 disabled' options='[{"lib":"1","value":"1"},{"lib":"2","value":"2"},{"lib":"3","value":"3"}]'></sg-select>
                            <sg-input-double idname='inputArticleRemp' label='Article' input='text' input2='text' inputCss='w-24 disabled' inputCss2='w-96 disabled'></sg-input-double>
                            <sg-input idname='poidsRemp' label='Poids' input='number' inputCss='w-32 disabled'></sg-input>
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