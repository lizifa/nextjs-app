import { Environment, Paddle } from '@paddle/paddle-node-sdk'

const paddle = new Paddle('API_KEY', {
  environment: Environment.sandbox, // or Environment.sandbox for accessing sandbox API
})