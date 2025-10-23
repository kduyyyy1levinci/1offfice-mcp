import { config } from "../config";
import { LeaveSummaryResponse, PersonnelProfileResponse } from "../types/oneoffice";
import { HttpClient } from "./httpClient";

export class OneOfficeClient extends HttpClient {
    private readonly personnelToken: string;
    private readonly leaveToken: string;

    constructor() {
        super(config.oneOfficeUrl, {
            "Content-Type": "application/json",
        });

        this.personnelToken = config.oneOfficeAccessTokenPersonnel;
        this.leaveToken = config.oneOfficeAccessTokenLeave;

        if (!this.personnelToken || !this.leaveToken) {
            throw new Error("Missing 1Office access tokens in config");
        }
    }

    private withToken(path: string, tokenType: "personnel" | "leave" = "personnel"): string {
        const token =
            tokenType === "personnel" ? this.personnelToken : this.leaveToken;
        const separator = path.includes("?") ? "&" : "?";
        return `${path}${separator}access_token=${token}`;
    }

    async getPersonnelProfile(personnel_id: string): Promise<PersonnelProfileResponse> {
        if (!personnel_id) throw new Error("Missing personnel_id");
        return this.get(
            this.withToken(`/personnel/profile/item?code=${personnel_id}`, "personnel")
        );
    }

    async getLeaveSummary(personnel_id: string): Promise<LeaveSummaryResponse>  {
        if (!personnel_id) throw new Error("Missing personnel_id");
        const filters = encodeURIComponent(JSON.stringify([{ personnel_id }]));
        return this.get(this.withToken(`/timekeep/furlough/gets?filters=${filters}`, "leave"));
    }

    async getAssets(personnel_id: string) {
        const profile = await this.getPersonnelProfile(personnel_id);
        return profile?.data?.asset ?? [];
    }

    async getPersonalInfo(personnel_id: string) {
        const data = (await this.getPersonnelProfile(personnel_id))?.data;
        if (!data) return null;
        return {
            name: data.name,
            birthday: data.birthday,
            gender: data.gender,
            mobile: data.mobile,
            email: data.email,
            place_home: data.place_home,
            current_address: data.current_address,
            marital_status: data.marital_status,
            nationality: data.nationality,
            people: data.people,
            religious: data.religious,
            origin_state: data.origin_state,
            place_of_birthday: data.place_of_birthday,
        };
    }

    async getJobInfo(personnel_id: string) {
        const data = (await this.getPersonnelProfile(personnel_id))?.data;
        if (!data) return null;
        return {
            position_id: data.position_id,
            position_title: data.position_title,
            job_title: data.job_title,
            job_title_name: data.job_title_name,
            department_id: data.department_id,
            job_date_join: data.job_date_join,
            job_status: data.job_status,
            type_contract: data.type_contract,
            work_place: data.work_place,
        };
    }

    async getHealthInfo(personnel_id: string) {
        const data = (await this.getPersonnelProfile(personnel_id))?.data;
        if (!data) return null;
        return {
            blood_group: data.blood_group,
            height: data.height,
            weight: data.weight,
            blood_pressure: data.blood_pressure,
            heart_beat: data.heart_beat,
        };
    }

    async getDocumentInfo(personnel_id: string) {
        const data = (await this.getPersonnelProfile(personnel_id))?.data;
        if (!data) return null;
        return {
            private_code: data.private_code,
            passport_code: data.passport_code,
            passport_date_expire: data.passport_date_expire,
            photo: data.photo,
        };
    }

    async getManagementInfo(personnel_id: string) {
        const data = (await this.getPersonnelProfile(personnel_id))?.data;
        if (!data) return null;
        return {
            live_manager_id: data.live_manager_id,
            date_created: data.date_created,
            created_by_id: data.created_by_id,
        };
    }
}
