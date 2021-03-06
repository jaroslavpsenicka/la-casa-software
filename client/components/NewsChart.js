import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const AGGPERIOD = 40;

const NewsChart = ({ data }) => {

  var date = new Date()
  date.setDate(1);
  var aggData = [AGGPERIOD];
  for (var i = 0; i < AGGPERIOD; i++) {
    aggData[AGGPERIOD-i] = { 
      key: date.getMonth() + '/' + date.getFullYear(), 
      label: date.toLocaleString('default', { month: 'long', year: 'numeric' }),
      count: 0 
    }
    date.setMonth(date.getMonth()-1);
  }

  data.forEach(r => { 
    const rdate = new Date(r.Time) 
    const key = rdate.getMonth() + '/' + rdate.getFullYear()
    const aggRec = aggData.find(d => d.key === key)
    if (aggRec) {
      aggRec.count += 1 
    } else console.log('out of range', rdate)
  })
  
  return (
    <Container>
      <Row>
          <div className="w-100 h-100px mt-4">
            <ResponsiveContainer>
              <BarChart width={500} height={100} data={aggData}>
                <Bar dataKey="count" fill="gray" />
                <XAxis dataKey="label" />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>
      </Row>
    </Container>  
  )
}

export default NewsChart