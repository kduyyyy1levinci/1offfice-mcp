import { server } from '../server';
import { z } from 'zod';
import { OneOfficeClient } from '../services/oneOffice.service';

const client = new OneOfficeClient();

export function registerGetAssetsTool() {
    server.registerTool(
        'getPersonnelAssets',
        {
            title: 'Get Personnel Assets',
            description: 'Fetches the list of assets assigned to a personnel by their ID',
            inputSchema: { personnel_id: z.string() },
            outputSchema: { result: z.string() },
        },
        async ({ personnel_id }) => {
            const assets = await client.getAssets(personnel_id);

            const result = assets.length
                ? assets
                    .map(
                        (a: any) =>
                            `Code: ${a.asset_code}, Title: ${a.asset_title}, Type: ${a.type}, Location: ${a.location}, Status: ${a.use_status_id}`
                    )
                    .join('\n')
                : 'No assets found';

            return {
                content: [{ type: 'text', text: result }],
                structuredContent: { result },
            };
        }
    );
}

export function registerGetPersonalInfoTool() {
    server.registerTool(
        'getPersonnelPersonalInfo',
        {
            title: 'Get Personal Info',
            description: 'Fetches personal information of a personnel',
            inputSchema: { personnel_id: z.string() },
            outputSchema: { result: z.string() },
        },
        async ({ personnel_id }) => {
            const data = await client.getPersonalInfo(personnel_id);

            const result = data
                ? ` Name: ${data.name}
                    Birthday: ${data.birthday}
                    Gender: ${data.gender}
                    Mobile: ${data.mobile}
                    Email: ${data.email}
                    Home Address: ${data.place_home}
                    Current Address: ${data.current_address}
                    Marital Status: ${data.marital_status}
                    Nationality: ${data.nationality}
                    People: ${data.people}
                    Religious: ${data.religious}
                    Origin State: ${data.origin_state}
                    Place of Birthday: ${data.place_of_birthday}`
                : 'No personal info found';

            return { content: [{ type: 'text', text: result }], structuredContent: { result } };
        }
    );
}

export function registerGetJobInfoTool() {
    server.registerTool(
        'getPersonnelJobInfo',
        {
            title: 'Get Job Info',
            description: 'Fetches job details of a personnel',
            inputSchema: { personnel_id: z.string() },
            outputSchema: { result: z.string() },
        },
        async ({ personnel_id }) => {
            const data = await client.getJobInfo(personnel_id);

            const result = data
                ? ` Position ID: ${data.position_id}
                    Position Title: ${data.position_title}
                    Job Title: ${data.job_title}
                    Job Title Name: ${data.job_title_name}
                    Department ID: ${data.department_id}
                    Job Date Join: ${data.job_date_join}
                    Job Status: ${data.job_status}
                    Type Contract: ${data.type_contract}
                    Work Place: ${data.work_place}`
                : 'No job info found';

            return { content: [{ type: 'text', text: result }], structuredContent: { result } };
        }
    );
}

export function registerGetHealthInfoTool() {
    server.registerTool(
        'getPersonnelHealthInfo',
        {
            title: 'Get Health Info',
            description: 'Fetches health-related data of a personnel',
            inputSchema: { personnel_id: z.string() },
            outputSchema: { result: z.string() },
        },
        async ({ personnel_id }) => {
            const data = await client.getHealthInfo(personnel_id);

            const result = data
                ? ` Blood Group: ${data.blood_group}
                    Height: ${data.height}
                    Weight: ${data.weight}
                    Blood Pressure: ${data.blood_pressure}
                    Heart Beat: ${data.heart_beat}`
                : 'No health info found';

            return { content: [{ type: 'text', text: result }], structuredContent: { result } };
        }
    );
}

export function registerGetDocumentInfoTool() {
    server.registerTool(
        'getPersonnelDocumentInfo',
        {
            title: 'Get Document Info',
            description: 'Fetches document and ID information of a personnel',
            inputSchema: { personnel_id: z.string() },
            outputSchema: { result: z.string() },
        },
        async ({ personnel_id }) => {
            const data = await client.getDocumentInfo(personnel_id);

            const result = data
                ? ` Private Code: ${data.private_code}
                    Passport Code: ${data.passport_code}
                    Passport Expiry: ${data.passport_date_expire}
                    Photo: ${data.photo ?? 'No photo'}`
                : 'No document info found';

            return { content: [{ type: 'text', text: result }], structuredContent: { result } };
        }
    );
}

export function registerGetManagementInfoTool() {
    server.registerTool(
        'getPersonnelManagementInfo',
        {
            title: 'Get Management Info',
            description: 'Fetches management and reporting line details of a personnel',
            inputSchema: { personnel_id: z.string() },
            outputSchema: { result: z.string() },
        },
        async ({ personnel_id }) => {
            const data = await client.getManagementInfo(personnel_id);

            const result = data
                ? `Live Manager ID: ${data.live_manager_id}
                    Date Created: ${data.date_created}
                    Created By ID: ${data.created_by_id}`
                : 'No management info found';

            return { content: [{ type: 'text', text: result }], structuredContent: { result } };
        }
    );
}
