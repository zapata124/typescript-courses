import { apiCall } from '../utils/networking'
import { ITeam } from '../types'
import { isTeam, isTypeArray } from '../type-guards'

let cachedAllTeamsList: Promise<ITeam[]>  

export async function getAllTeams(): Promise<ITeam[]> {
  if (typeof cachedAllTeamsList === 'undefined')
    cachedAllTeamsList = apiCall('teams').then((responseData) => {
  
      if (isTypeArray(responseData, isTeam)) return responseData
      else throw new Error('Invalid response for /teams')
})
  return await cachedAllTeamsList
}

const cachedTeamRecords = {}

export async function getTeamById(id:string): Promise<ITeam> {
  let cached = cachedTeamRecords[id]
  if (typeof cached === 'undefined')
    cached = cachedTeamRecords[id] = apiCall(`teams/${id}`)
  return await cached
}
