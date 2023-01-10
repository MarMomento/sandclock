import { createSimpleFunctional } from "../../utils/createSimpleFunctional";
import VCard from "./VCard";

const VCardHeader = createSimpleFunctional("card-header");
const VCardBody = createSimpleFunctional("card-body");
const VCardFooter = createSimpleFunctional("card-footer");
const VCardTitle = createSimpleFunctional("card-title");
const VCardSubtitle = createSimpleFunctional("card-subtitle");
const VCardText = createSimpleFunctional("card-text");
const VCardActions = createSimpleFunctional("card-actions");

export {
  VCard,
  VCardHeader,
  VCardBody,
  VCardFooter,
  VCardTitle,
  VCardSubtitle,
  VCardText,
  VCardActions,
};
