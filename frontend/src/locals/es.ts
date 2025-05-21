type GroupTaskTranslation = {
  [k: string]: string;
};
export const STATUS_TRANSLATIONS: GroupTaskTranslation = {
  pending: "Pendiente",
  onHold: "En Espera",
  inProgress: "En Progreso",
  inReview: "En Revision",
  completed: "Completada",
};
export const STATUS_TRANSLATIONS_COLORS: GroupTaskTranslation = {
  pending: "border-t-yellow-500",
  onHold: "border-t-violet-500",
  inProgress: "border-t-cyan-500",
  inReview: "border-t-orange-500",
  completed: "border-t-lime-500",
};
