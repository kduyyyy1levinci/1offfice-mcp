import { ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { server } from '../server';
import { OneOfficeClient } from '../services/oneOffice.service';

const client = new OneOfficeClient();

export function registerPersonnelResource() {
    server.registerResource(
        'oneoffice-personnel-profile',
        new ResourceTemplate('oneoffice://personnel/{id}', { list: undefined }),
        {
            title: 'Personnel Profile',
            description: 'Fetch personnel profile from 1Office by employee ID',
        },
        async (uri, { id }) => {
            const employeeId = Array.isArray(id) ? id[0] : id;
            console.log('[DEBUG] Resource called:', uri.href, id); // ✅
            const response = await client.getPersonnelProfile(employeeId);
            console.log('[DEBUG] Response from 1Office:', response);  // ✅
            return {
                contents: [
                    {
                        uri: uri.href,
                        text: JSON.stringify(response.data, null, 2),
                    },
                ],
            };
        },
    );
}
