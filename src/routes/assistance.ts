import { Request, Response, Application, Router } from "express";
import { AssistanceController } from '../controllers/assistance.controller';
import { authMiddleware } from '../middleware/auth';

export class AssistanceRoutes {
  public AssistanceController: AssistanceController = new AssistanceController();

  public routes(app: Application): void {
    app.route("/assistance/test").get(this.AssistanceController.test)
    app.route("/assistances").get(authMiddleware,this.AssistanceController.getAllAssistance)
    app.route("/assistance/:id").get(this.AssistanceController.getOneAssistance)
    app.route("/assistance").post(this.AssistanceController.createAssistance)
    app.route("/assistance/:id").put(this.AssistanceController.updateAssistance)
    app.route("/assistance/:id").delete(this.AssistanceController.deleteAssistance)
    app.route("/assistance/:id").patch(this.AssistanceController.hideAssistance)
  }
}