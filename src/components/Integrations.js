import { Divider, Grid } from '@mui/material'
import React from 'react'
import IntegrationCard from './IntegrationCard';

const integrations = [
    {
      id: 'dropbox',
      title: 'Dropbox',
      description: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
      logo: '/assets/logo-dropbox.png',
      installs: 594,
    //   updatedAt: dayjs().subtract(12, 'minute').toDate(),
    },
    // {
    //   id: 'corporation',
    //   title: 'Medium Corporation',
    //   description: 'Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.',
    //   logo: '/assets/logo-medium.png',
    //   installs: 625,
      // },
   
  ] 
function Integrations() {
  return (
    <div className='flex flex-col'>
        <div>

        </div>
        <Grid container spacing={3} className='gap-5'>
        {integrations.map((integration) => (
          <Grid key={integration.id} lg={4} md={6} xs={12} >
            <IntegrationCard integration={integration} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Integrations