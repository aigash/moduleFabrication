import { ApiService } from "../services/apiService.js";
import { ErrorsHandler } from "../utils/errorsHandler.js";

export class Products {
    constructor() {
        // Initialisation de l'instance ApiService
        this.apiService = new ApiService();
        // Suffixe pour les requêtes API
        this.apiServiceSuffix = "/beTar";
    }
    // Méthode pour récupérer tous les produits ici en l'occurence
    getAllProducts() {
        // Appel à l'API pour obtenir les produits
        return this.apiService.get(`${this.apiServiceSuffix}/products`, {})
            .then((response) => {
            //console.log(response);
            // Vérification des erreurs dans la réponse
            if (response._errors) {
                throw response;
            }
            else {
                // Retourner la liste des produits
                return response.products;
            }
        })
        // Gestion des erreurs
            .catch((error) => {
            // Appel au gestionnaire d'erreurs
            ErrorsHandler.handleError(error);
            throw error;
        });
    }
}