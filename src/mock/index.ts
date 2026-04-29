import Mock from 'mockjs'
import resource from './resource'
import task from './task'
import shiftDaily from './shiftDaily'
import flight from './flight'


Mock.mock(/\/resource\/resource\/search/, 'post', resource)
Mock.mock(/\/basedata\/task\/base\/task\/searchTask/, 'post', task)
Mock.mock(/\/task\/base\/shiftDaily\/searchShiftDaily/, 'post', shiftDaily)
Mock.mock(/\/flight\/searchFlight/, 'post', flight)

export default Mock