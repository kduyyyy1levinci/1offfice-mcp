import { registerLeaveTool } from "./leave.tool";
import {
    registerGetAssetsTool,
    registerGetDocumentInfoTool,
    registerGetHealthInfoTool,
    registerGetJobInfoTool,
    registerGetManagementInfoTool,
    registerGetPersonalInfoTool
} from "./personnel.tool";

export function registerAllTool() {
    registerLeaveTool()
    registerGetAssetsTool()
    registerGetDocumentInfoTool()
    registerGetHealthInfoTool()
    registerGetJobInfoTool()
    registerGetManagementInfoTool()
    registerGetPersonalInfoTool()
}