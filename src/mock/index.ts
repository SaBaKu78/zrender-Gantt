import Mock from 'mockjs'
import resource from './resource'
import task, { assignMockTask, searchMockTasks } from './task'
import shiftDaily from './shiftDaily'
import flight from './flight'


Mock.mock(/\/resource\/resource\/search/, 'post', resource)
Mock.mock(/^\/basedata\/task\/base\/task\/searchTask$/, 'post', task)
Mock.mock(/\/api2\/ips\/task\/manage\/assign/, 'post', function(options) {
  const params = parseBody(options.body)
  return {
    code: 200,
    data: assignMockTask(params),
  }
})
Mock.mock(/\/api2\/ips\/basedata\/task\/base\/task\/searchTask/, 'post', function(options) {
  const params = parseBody(options.body)
  return {
    code: 200,
    data: searchMockTasks(params.taskIds || []),
  }
})
Mock.mock(/\/task\/base\/shiftDaily\/searchShiftDaily/, 'post', shiftDaily)
Mock.mock(/\/flight\/searchFlight/, 'post', flight)

export default Mock

function parseBody(body: any) {
  if (!body) return {}
  if (typeof body === 'string') {
    return JSON.parse(body)
  }
  return body
}
