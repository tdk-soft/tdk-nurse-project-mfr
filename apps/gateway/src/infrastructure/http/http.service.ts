import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import axios, { AxiosInstance } from 'axios'

@Injectable()
export class HttpService {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      timeout: 5000
    })
  }

  async get<T>(url: string): Promise<T> {
    try {
      const res = await this.client.get(url)
      return res.data
    } catch (error: any) {
      throw new HttpException(
        error.response?.data || 'Service unavailable',
        error.response?.status || HttpStatus.BAD_GATEWAY
      )
    }
  }

  async post<T>(url: string, data: any): Promise<T> {
    try {
      const res = await this.client.post(url, data)
      return res.data
    } catch (error: any) {
      throw new HttpException(
        error.response?.data || 'Service unavailable',
        error.response?.status || HttpStatus.BAD_GATEWAY
      )
    }
  }
}