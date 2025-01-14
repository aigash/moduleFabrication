import { ApiService } from "../services/apiService.js";
import { ErrorsHandler } from "../utils/errorsHandler.js";

export class Global {
    constructor() {
        // Initialisation de l'instance ApiService
        this.apiService = new ApiService();
        // Suffixe pour les requêtes API, pas besoin ici
        this.apiServiceSuffix = "";
    }
    // Méthode pour récupérer tous les produits ici en l'occurence
    getAllCuves() {
        // Appel à l'API pour obtenir les produits
        return this.apiService.get(`${this.apiServiceSuffix}/getAllCuves`, {})
            .then((resp) => {
            //console.log(response);
            // Vérification des erreurs dans la réponse
                if (resp._errors) {
                    throw resp;
                } else {
                    return resp?.response?.dsCuve?.dsCuve?.ttCuve || [];
                }
            }).catch((error) => {
            // Appel au gestionnaire d'erreurs
                ErrorsHandler.handleError(error);
                throw error;
            });
    }

    getCuveStock(cuve_cod) {
        let data = {
            'cuve_cod': cuve_cod
        };

        return this.apiService.get(`${this.apiServiceSuffix}/getCuveStock`, data)
            .then((resp) => {
                if (resp._errors) {
                    throw resp;
                } else {
                    return resp?.response?.dsStock?.dsStock?.ttStock || [];
                }
            }).catch((error) => {
                ErrorsHandler.handleError(error);
                throw error;
            });
    }

    updateCuveStock(lot_cod, lfl_lig, poin, cuve_cod) {
        let data = {
            "request": {
                "IOjson": {
                    "lot_cod": parseInt(lot_cod),
                    "lfl_lig": parseInt(lfl_lig),
                    "poin": parseFloat(poin),
                    "cuve_cod": cuve_cod
                }
            }
        }

        return this.apiService.put(`${this.apiServiceSuffix}/updateCuveStock`, data)
            .then((resp) => {
            //console.log(response);
                if (resp._errors) {
                    throw response;
                } else {
                    return resp?.response || [];
                }
            }).catch((error) => {
                ErrorsHandler.handleError(error);
                throw error;
            });
    }

    getStock() {
        return this.apiService.get(`${this.apiServiceSuffix}/getStock`, {})
            .then((resp) => {
                //console.log(resp);
                if (resp._errors) {
                    throw response;
                } else {
                    return resp?.response?.dsStock?.dsStock?.ttStock || [];
                }
            }).catch((error) => {
                ErrorsHandler.handleError(error);
                throw error;
            });
    }

    getEnt() {
        return this.apiService.get(`${this.apiServiceSuffix}/getEnt`, {})
            .then((resp) => {
            //console.log(response);
                if (response._errors) {
                    throw response;
                } else {
                    return response?.dsEnt?.dsEnt?.ttEnt || [];
                }
            }).catch((error) => {
                ErrorsHandler.handleError(error);
                throw error;
            });
    }

    getArt() {
        return this.apiService.get(`${this.apiServiceSuffix}/getArt`, {})
            .then((resp) => {
            //console.log(response);
                if (response._errors) {
                    throw response;
                } else {
                    return response?.dsArt?.dsArt?.ttArt || [];
                }
            }).catch((error) => {
                ErrorsHandler.handleError(error);
                throw error;
            });
    }
}