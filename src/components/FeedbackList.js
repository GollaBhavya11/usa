import { Person } from '@mui/icons-material'
import { Card, CardContent, CardHeader, Divider, Rating } from '@mui/material'
import React from 'react'

function FeedbackList({feedbackList}) {
  return (
    <div className='grid md:grid-cols-3 gap-2'>
        {feedbackList?.map(data=>{
            return(
              <Card className='rounded-2xl border shadow '>
        <CardHeader  title={data?.Summary} />
        <Divider/>
        <CardContent>
          <div className='text-2xl'>
         <Rating
           name="simple-controlled"
           size='large'
           value={data?.Rating}
           readOnly
           />
          </div>
         
          <div className='text-md pb-3 overflow-hidden'>{data.AreasOfImprovement}</div>
          <Divider/>
          <div className='flex justify-end pt-4 text-xs items-center'>
            <Person/>{data?.email}</div>
            </CardContent>
        </Card>
            
      )})}
    </div>
  )
}

export default FeedbackList