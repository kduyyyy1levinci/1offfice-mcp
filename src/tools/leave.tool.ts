import { z } from 'zod';
import { server } from '../server';
import { OneOfficeClient } from '../services/oneOffice.service';

const client = new OneOfficeClient();

export function registerLeaveTool() {
    server.registerTool(
        'getPersonnelLeaveSummary',
        {
            title: 'Get Leave Summary',
            description: 'Fetch leave summary for a personnel from 1Office',
            inputSchema: {
                personnel_id: z.string().describe('Personnel ID to fetch leave summary'),
            },
            outputSchema: {
                result: z.string(),
            },
        },
        async ({ personnel_id }) => {
            try {
                console.log('[TOOL] Called getPersonnelLeaveSummary with:', personnel_id);

                const response = await client.getLeaveSummary(personnel_id);
                const leaveData = response?.data ?? [];

                const result = leaveData.length
                    ? leaveData
                        .map(
                            (item: any) =>
                                `Leave Type: ${item.type || item.leave_type || 'N/A'}, From: ${item.start_date}, To: ${item.end_date}, Days: ${item.days}`
                        )
                        .join('\n')
                    : 'No leave records found';

                return {
                    content: [{ type: 'text', text: result }],
                    structuredContent: { result },
                };
            } catch (error: any) {
                console.error('[TOOL ERROR] getPersonnelLeaveSummary:', error.message);

                const result = `Error fetching leave summary: ${error.message || 'Internal server error'}`;

                return {
                    content: [{ type: 'text', text: result }],
                    structuredContent: { result },
                };
            }
        }
    );
}
