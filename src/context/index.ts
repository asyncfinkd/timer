import React from 'react'

export interface TContext {
  minutes: string
  minutesToSecond: number
  notification: string
  timer: number
}

export interface TAppContext {
  setting: TContext
  setSetting: React.Dispatch<React.SetStateAction<TContext>>
}

export const ApplicationContext = React.createContext<TAppContext | null>(null)
