// src/resources/leave.resource.ts
import { ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { server } from '../server';
import { OneOfficeClient } from '../services/oneOffice.service';

const client = new OneOfficeClient();

export function registerLeaveResource() {
  server.registerResource(
    'oneoffice-leave-summary',
    new ResourceTemplate('oneoffice://leave/{personnel_id}', { list: undefined }),
    {
      title: 'Leave Summary',
      description: 'Returns leave summary of a personnel from 1Office',
    },
    async (uri, { personnel_id }) => {
            const personnelId = Array.isArray(personnel_id) ? personnel_id[0] : personnel_id;
      const response = await client.getLeaveSummary(personnelId);
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
