import { Router } from "express";
import {
    createPropertyHandler,
    getPropertyByIdHandler,
    getPropertiesHandler,
    getPropertyDisplayHandler,
    updatePropertyHandler
} from "../../controllers/properties";

const propertiesRouter = Router();

propertiesRouter.post( "/", createPropertyHandler );
propertiesRouter.get( "/:id", getPropertyByIdHandler );
propertiesRouter.get( "/", getPropertiesHandler );
propertiesRouter.patch( "/:id", updatePropertyHandler );
propertiesRouter.get( "/:propertyId/display", getPropertyDisplayHandler );

export default propertiesRouter;