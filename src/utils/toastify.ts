import { toast } from 'react-toastify'

export const notify = (mensagem: any) =>
  toast(mensagem, { position: 'top-center' })

export const notifyInfo = (mensagem: any) =>
  toast.info(mensagem, { position: 'top-center' })

export const notifyWarn = (mensagem: any) =>
  toast.warn(mensagem, { position: 'top-center' })

export const notifySuccess = (mensagem: any) =>
  toast.success(mensagem, { position: 'top-center' })

export const notifyError = (mensagem: any) =>
  toast.error(mensagem, { position: 'top-center' })
