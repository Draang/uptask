import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExist } from "../middleware/project";
import { taskStatus } from "../models/Task";
import { authenticate } from "../middleware/auth";
import { TeamController } from "../controllers/TeamController";
import { hasAuthorization } from "../middleware/task";
const router = Router();
router.use(authenticate);
router.post(
  "/",
  body("projectName")
    .notEmpty()
    .withMessage("El Nombre del Projecto es obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El Nombre del cliente del Projecto es obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Descripcion del Projecto es obligatorio"),
  handleInputErrors,
  ProjectController.createProject
);
router.get("/", handleInputErrors, ProjectController.getAllProjects);
router.get(
  "/:id",
  param("id").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  ProjectController.getProjectById
);
router.put(
  "/:id",
  param("id").isMongoId().withMessage("ID no valido"),
  body("projectName")
    .notEmpty()
    .withMessage("El Nombre del Projecto es obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El Nombre del cliente del Projecto es obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Descripcion del Projecto es obligatorio"),
  handleInputErrors,
  ProjectController.updateProject
);
router.delete(
  "/:id",
  param("id").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  ProjectController.deleteProject
);
/**
 * ROUTES FOR TASKS
 */
router.param("projectId", validateProjectExist);
router.post(
  "/:projectId/tasks",
  hasAuthorization,
  body("name").notEmpty().withMessage("El Nombre de la tarea obligatoria"),
  body("description")
    .notEmpty()
    .withMessage("La Descripcion de la tarea es obligatoria"),
  handleInputErrors,
  TaskController.createTask
);
router.get("/:projectId/tasks", TaskController.getAllProjectTasks);
router.get(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("ID de tarea no valido"),
  handleInputErrors,
  TaskController.getTask
);
router.put(
  "/:projectId/tasks/:taskId",
  hasAuthorization,
  body("name").notEmpty().withMessage("El Nombre de la tarea obligatoria"),
  body("description")
    .notEmpty()
    .withMessage("La Descripcion de la tarea es obligatoria"),
  handleInputErrors,
  TaskController.updateTask
);
router.delete(
  "/:projectId/tasks/:taskId",
  hasAuthorization,
  param("taskId").isMongoId().withMessage("ID de tarea no valido"),
  handleInputErrors,
  TaskController.deleteTask
);
router.patch(
  "/:projectId/tasks/:taskId/status",
  param("taskId").isMongoId().withMessage("ID de tarea no valido"),
  body("status").notEmpty().withMessage("El estado es obligatorio"),
  body("status")
    .isIn(Object.values(taskStatus))
    .withMessage("Estado proporcionado no valido"),
  handleInputErrors,
  TaskController.updateTaskStatus
);

// Routes for teams

router.post(
  "/:projectId/team/find",
  body("email").isEmail().toLowerCase().withMessage("email no valido"),
  handleInputErrors,
  TeamController.findMemberByEmail
);
router.get(
  "/:projectId/team",
  handleInputErrors,
  TeamController.getProjectTeam
);
router.post(
  "/:projectId/team",
  body("id").isMongoId().withMessage("Id no valido"),
  handleInputErrors,
  TeamController.addMemberById
);
router.delete(
  "/:projectId/team/:userId",
  param("userId").isMongoId().withMessage("Id no valido"),
  handleInputErrors,
  TeamController.removeMemberById
);

export default router;
