import { Router } from "express";
import {
    createPropertyHandler,
    getPropertyByIdHandler,
    getPropertiesHandler,
    updatePropertyHandler
} from "../../controllers/properties/properties.ctrl";

const propertiesRouter = Router();

propertiesRouter.post( "/", createPropertyHandler );
propertiesRouter.get( "/:id", getPropertyByIdHandler );
propertiesRouter.get( "/", getPropertiesHandler );
propertiesRouter.patch( "/:id", updatePropertyHandler );

export default propertiesRouter;