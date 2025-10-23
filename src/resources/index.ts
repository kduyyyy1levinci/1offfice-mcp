import { registerPersonnelResource } from './personnel.resource';
import { registerLeaveResource } from './leave.resource';

export function registerAllResources() {
  registerPersonnelResource();
  registerLeaveResource();
}